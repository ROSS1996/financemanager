import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./components/layout";
import { useSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function Index() {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete("/api/user/delete", {
        headers: { Authorization: sessionState?.user.backend },
      });
      if (data) {
        signOut();
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
        "/api/user/update",
        {
          email,
          username,
          password,
          firstname,
          lastname,
          birthdate,
          country,
          phone,
          address,
        },
        {
          headers: { Authorization: sessionState?.user.backend },
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
          className="flex flex-col gap-3 px-8 pt-6 pb-8 mb-4 bg-white border rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start">
            <label
              htmlFor="username"
              className="text-sm font-medium cursor-pointer"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="email"
              className="text-sm font-medium cursor-pointer"
            >
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
              htmlFor="firstname"
              className="text-sm font-medium cursor-pointer"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={(event) => setFirstName(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="lastname"
              className="text-sm font-medium cursor-pointer"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={(event) => setLastName(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="birthdate"
              className="text-sm font-medium cursor-pointer"
            >
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              onChange={(event) => setBirthdate(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="country"
              className="text-sm font-medium cursor-pointer"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              onChange={(event) => setCountry(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="phone"
              className="text-sm font-medium cursor-pointer"
            >
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              onChange={(event) => setPhone(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="address"
              className="text-sm font-medium cursor-pointer"
            >
              Address
            </label>
            <input
              type="address"
              id="address"
              name="address"
              onChange={(event) => setAddress(event.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-sm"
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
