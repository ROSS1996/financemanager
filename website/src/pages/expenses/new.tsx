import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import useAccounts from "../hooks/accounts/useAccounts";
import Link from "next/link";

export default function Index() {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    } else {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status, router]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [duedate, setDueDate] = useState("");
  const [paid, setPaid] = useState("");
  const [category, setCategory] = useState("");
  const [accountId, setAccountId] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = sessionState?.user.id;
    try {
      const { data } = await axios.post("/api/expenses/new", {
        id,
        description,
        amount,
        due_date: duedate,
        paid,
        category,
        account_id: accountId,
      });
      if (data) {
        router.push("/expenses");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const accounts = useAccounts(sessionState?.user.id);

  if (accounts.length === 0) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          In order to start adding expenses, you need at least one account
          setup.{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            Add your first one.
          </Link>
        </p>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="New Expense" pageDescription="New Expense">
      <div className="flex items-center justify-center h-content">
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
              required
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
              required
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
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="paid"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Paid
            </label>
            <div className="flex items-center">
              <label htmlFor="paid-yes" className="mr-2">
                <input
                  type="radio"
                  id="paid-yes"
                  name="paid"
                  value="true"
                  onChange={(event) => setPaid(event.target.value)}
                  className="mr-1"
                  required
                />
                Yes
              </label>
              <label htmlFor="paid-no">
                <input
                  type="radio"
                  id="paid-no"
                  name="paid"
                  value="false"
                  onChange={(event) => setPaid(event.target.value)}
                  className="mr-1"
                  required
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange={(event) => setCategory(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              <optgroup label="Essentials">
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
              </optgroup>
              <optgroup label="Financial">
                <option value="Taxes">Taxes</option>
                <option value="Interest Rates">Interest Rates</option>
              </optgroup>
              <optgroup label="Entertainment">
                <option value="Movies">Movies</option>
                <option value="Music">Music</option>
                <option value="Books">Books</option>
                <option value="Games">Games</option>
              </optgroup>
              <optgroup label="Other">
                <option value="Other">Other</option>
              </optgroup>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="accountId"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Account
            </label>
            <select
              id="accountId"
              name="accountId"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled hidden>
                Select an account
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
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
