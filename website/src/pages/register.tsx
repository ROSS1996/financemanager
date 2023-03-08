import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import Layout from "./components/layout";

export default function Register() {
  const router = useRouter();

  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/register", {
        email,
        username,
        password,
        confirm,
        firstname,
        lastname,
        birthdate,
        country,
        phone,
        address,
      });
      if (data) {
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle="Register" pageDescription="Register">
      <div className="flex items-center justify-center w-screen h-screen">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-600 rounded w-min"
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
              htmlFor="confirm"
              className="text-sm font-medium cursor-pointer"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              onChange={(event) => setConfirm(event.target.value)}
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
    </Layout>
  );
}
