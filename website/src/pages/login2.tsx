import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-600 rounded w-min"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="text-sm font-medium cursor-pointer">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="px-2 py-1 border border-gray-400 rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="password"
            className="text-sm font-medium cursor-pointer"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="px-2 py-1 border border-gray-400 rounded-sm"
          />
        </div>
        <div className="flex flex-row items-center justify-around w-full">
          <button
            type="submit"
            className="px-2 py-1 text-white bg-blue-600 rounded cursor-pointer active:bg-blue-700"
          >
            Sign In
          </button>
          <Link href="/register">
            <span className="px-4 py-1 text-sm text-gray-700 border cursor-pointer bg-gray-50">
              Register
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
