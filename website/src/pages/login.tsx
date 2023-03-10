import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { Session } from "next-auth";

export default function Login() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <Layout pageTitle="Login" pageDescription="Login">
      <div className="flex items-center justify-center bg-gray-100 h-content">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center max-w-sm gap-4 p-6 border-2 border-gray-300 rounded shadow-md"
        >
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Sign In
            </button>
            <Link href="/register">
              <span className="px-4 py-2 text-sm text-gray-700 bg-gray-200 border-none rounded-md cursor-pointer hover:bg-gray-300 focus:bg-gray-300 focus:outline-none">
                Register
              </span>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
