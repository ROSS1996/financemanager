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

  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [duedate, setDueDate] = useState<string>();
  const [received, setReceived] = useState<boolean>(false);
  const [receivedat, setReceivedat] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [accountId, setAccountId] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = sessionState?.user.id;
    try {
      const { data } = await axios.post("/api/revenues/new", {
        id,
        description,
        amount,
        due_date: duedate,
        received,
        category,
        received_at: receivedat,
        account_id: accountId,
      });
      if (data) {
        router.push("/revenues");
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
          In order to start adding revenues, you need at least one account
          setup.{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            Add your first one.
          </Link>
        </p>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="New Revenue" pageDescription="New Revenue">
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
              onChange={(event) =>
                setAmount(event.target.value as unknown as number)
              }
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
              htmlFor="received"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Received
            </label>
            <div className="flex items-center">
              <label htmlFor="received-yes" className="mr-2">
                <input
                  type="radio"
                  id="received-yes"
                  name="received"
                  value="true"
                  onChange={(event) => setReceived(true)}
                  className="mr-1"
                  required
                />
                Yes
              </label>
              <label htmlFor="received-no">
                <input
                  type="radio"
                  id="received-no"
                  name="received"
                  value="false"
                  onChange={(event) => {
                    setReceived(false);
                    setReceivedat(undefined);
                  }}
                  className="mr-1"
                  defaultChecked
                  required
                />
                No
              </label>
            </div>
          </div>
          {received === true ? (
            <div className="flex flex-col">
              <label
                htmlFor="receivedat"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Date Received
              </label>
              <input
                type="date"
                id="receivedat"
                name="receivedat"
                defaultValue={duedate}
                onChange={(event) => setReceivedat(event.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          ) : (
            false
          )}
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
              <option value="" disabled hidden selected>
                Select a category
              </option>
              <optgroup label=" Employment">
                <option value="Salary">Salary</option>
                <option value="Wages">Wages</option>
                <option value="Bonuses">Bonuses</option>
                <option value="Commissions">Commissions</option>
              </optgroup>
              <optgroup label="Investments">
                <option value="Stocks">Stocks</option>
                <option value="Bonds">Bonds</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Dividends">Dividends</option>
                <option value="Interest">Interest</option>
              </optgroup>
              <optgroup label="Business">
                <option value="Sales">Sales</option>
                <option value="Services">Services</option>
                <option value="Rent">Rent</option>
                <option value="Royalties">Royalties</option>
              </optgroup>
              <optgroup label="Income">
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
              onChange={(event) => setAccountId(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled hidden selected>
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
