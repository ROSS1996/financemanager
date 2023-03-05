import { useState } from "react";
import Layout from "./components/layout";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";

type UserData = {
  name: string;
  nickname: string;
  email: string;
};

export default function Edit() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = parseCookies();
  const token = cookies.token;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete("/api/deleteUser", {
        headers: { Authorization: token },
      });
      if (data) {
        destroyCookie(null, "token", { path: "/" });
        destroyCookie(null, "userId", { path: "/" });
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.patch(
        "/api/editUser",
        { name, nickname, email, password },
        {
          headers: { Authorization: token },
        }
      );
      if (data) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center mt-6">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white border rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="nickname"
            >
              Nickname
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
