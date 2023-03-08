import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export default function Index() {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [duedate, setDueDate] = useState("");
  const [done, setDone] = useState("");
  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = sessionState?.user.id;
    try {
      const { data } = await axios.post("/api/transfers/new", {
        id,
        description,
        amount,
        due_date: duedate,
        done,
        origin_account_id: originAccount,
        destination_account_id: destinationAccount,
      });
      if (data) {
        router.push("/transfers");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center mt-6">
        <form
          className="flex flex-col gap-4 px-8 pt-6 pb-8 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg w-96"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(event) => setDescription(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              onChange={(event) => setAmount(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="duedate"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="duedate"
              name="duedate"
              onChange={(event) => setDueDate(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="done"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Done
            </label>
            <div className="flex items-center">
              <label htmlFor="paid-yes" className="mr-2">
                <input
                  type="radio"
                  id="paid-yes"
                  name="done"
                  value="true"
                  onChange={(event) => setDone(event.target.value)}
                  className="mr-1"
                />
                Yes
              </label>
              <label htmlFor="paid-no">
                <input
                  type="radio"
                  id="paid-no"
                  name="done"
                  value="false"
                  onChange={(event) => setDone(event.target.value)}
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="accountId"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Origin Account
            </label>
            <input
              type="number"
              id="accountId"
              name="accountId"
              onChange={(event) => setOriginAccount(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="accountId"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Destination Account
            </label>
            <input
              type="number"
              id="accountId"
              name="accountId"
              onChange={(event) => setDestinationAccount(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
}
