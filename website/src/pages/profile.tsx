import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function Index() {
  const router = useRouter();

  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    } else {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
    <Layout pageTitle="Profile" pageDescription="Profile">
      <div className="flex items-center justify-center bg-gray-100 h-content">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center max-w-sm gap-4 p-6 border-2 border-gray-300 rounded shadow-md"
        >
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                htmlFor="lastname"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(event) => setLastName(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <label
                htmlFor="birthdate"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={(event) => setBirthdate(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                onChange={(event) => setPhone(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-start">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Address
              </label>
              <input
                type="address"
                id="address"
                name="address"
                onChange={(event) => setAddress(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={(event) => setCountry(event.target.value)}
                className="w-full px-3 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-around w-full">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your account? This decision will not be reverted"
                  )
                ) {
                  handleDelete();
                }
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
