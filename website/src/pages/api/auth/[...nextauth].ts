import { NextApiHandler, NextApiRequest } from "next";
import { RequestInternal } from "next-auth";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) => {
        try {
          const { data, headers } = await axios.post(
            `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const user = {
            id: data.id,
            email: data.email,
            name: data.name,
            username: data.username,
            backend: headers.authorization,
          };

          if (user) {
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name,
              username: user.username,
              backend: user.backend,
            };
            return Promise.resolve(payload);
          } else {
            return Promise.reject(new Error("Invalid email and/or password"));
          }
        } catch (error) {
          return Promise.reject(new Error("Unable to authenticate"));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.backend = user.backend;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.backend = token.backend;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // in seconds
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    // modify the token to include id and username fields
  },
};

const authHandler: NextApiHandler = (req: NextApiRequest, res) =>
  NextAuth(req, res, options);

export default authHandler;
