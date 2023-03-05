import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    event.preventDefault();
    try {
      const { data } = await axios.post("/api/register", {
        name,
        nickname,
        email,
        password,
        confirm,
      });
      if (data) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
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
            onChange={(event) => setEmail(event.target.value)}
            className="px-2 py-1 border border-gray-400 rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="nickname"
            className="text-sm font-medium cursor-pointer"
          >
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            onChange={(event) => setNickname(event.target.value)}
            className="px-2 py-1 border border-gray-400 rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="name" className="text-sm font-medium cursor-pointer">
            Full Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            className="px-2 py-1 border border-gray-400 rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="confirm"
            className="text-sm font-medium cursor-pointer"
          >
            Confirm Password
          </label>
          <input
            type="confirm"
            id="confirm"
            name="confirm"
            onChange={(event) => setConfirm(event.target.value)}
            className="px-2 py-1 border border-gray-400 rounded-sm"
          />
        </div>
        <div className="flex flex-row items-center justify-around w-full">
          <button
            type="submit"
            className="px-2 py-1 text-white bg-blue-600 rounded cursor-pointer active:bg-blue-700"
          >
            Submit
          </button>
          <Link href="/login">
            <span className="px-4 py-1 text-sm text-gray-700 border cursor-pointer bg-gray-50">
              Login
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
