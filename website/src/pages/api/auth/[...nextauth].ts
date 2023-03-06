import { NextApiHandler, NextApiRequest } from "next";
import { RequestInternal } from "next-auth";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { SessionOptions } from "next-auth";
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
            "http://localhost:3000/login",
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
            token: headers.authorization, // add token as a property of the user object
          };

          const token = headers.authorization;
          if (user && token) {
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name,
              username: user.username,
              token: user.token, // include token in the payload
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
  session: {
    jwt: true,
    maxAge: 60 * 60, // in seconds
  } as unknown as SessionOptions,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

const authHandler: NextApiHandler = (req: NextApiRequest, res) =>
  NextAuth(req, res, options);

export default authHandler;
