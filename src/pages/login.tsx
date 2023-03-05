import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "nookies";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<{ token: string; userId: string }>(
        "/api/login",
        { email, password }
      );
      setCookie(null, "token", response.data.token, { path: "/" });
      setCookie(null, "userId", response.data.userId, { path: "/" });
      router.push("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }
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
        <button
          type="submit"
          className="px-2 py-1 text-white bg-blue-600 rounded cursor-pointer active:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
