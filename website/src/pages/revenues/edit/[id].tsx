import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import useRevenue from "@/pages/hooks/revenues/useRevenue";
import useAccounts from "@/pages/hooks/accounts/useAccounts";

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [duedate, setDueDate] = useState("");
  const [received, setReceived] = useState(false);
  const [category, setCategory] = useState("");
  const [accountId, setAccountId] = useState(0);

  const revenueId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;
  const revenue = useRevenue(revenueId);

  const accounts = useAccounts(revenue?.user_id);

  useEffect(() => {
    if (revenue) {
      setDescription(revenue.description);
      setAmount(revenue.amount);
      setCategory(revenue.category);
      setDueDate(revenue.due_date);
      setReceived(revenue.received);
      setAccountId(revenue.account_id as unknown as number);
    }
  }, [revenue]);

  if (!revenue) {
    return <p>Revenue data not found</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/revenues/update", {
        id,
        description,
        amount,
        category,
        due_date: duedate,
        received,
        account_id: accountId,
      });
      if (data) {
        router.push("/revenues");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle="Edit Account" pageDescription="Edit Account">
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
              defaultValue={revenue?.description}
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
              defaultValue={revenue?.amount}
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
              defaultValue={revenue.due_date.slice(0, 10)}
              onChange={(event) => setDueDate(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="paid"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Received
            </label>
            <div className="flex items-center">
              <label htmlFor="paid-yes" className="mr-2">
                <input
                  type="radio"
                  id="paid-yes"
                  name="paid"
                  value="true"
                  onChange={(event) => setReceived(true)}
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
                  onChange={(event) => setReceived(false)}
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
              defaultValue={revenue?.category}
            >
              <option value="" disabled hidden>
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
              onChange={(event) => setAccountId(Number(event.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled hidden>
                Select an account
              </option>
              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                  selected={account.id === revenue.account_id}
                >
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
