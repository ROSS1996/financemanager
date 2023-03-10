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
  const [amount, setAmount] = useState<number>();
  const [duedate, setDueDate] = useState<Date>();
  const [received, setReceived] = useState(false);
  const [receivedat, setReceivedAt] = useState<Date | null>(null);
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
      setReceivedAt(revenue.received_at ? new Date(revenue.received_at) : null);
      setAccountId(parseInt(revenue.account_id));
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

  return (
    <Layout pageTitle="Edit Account" pageDescription="Edit Account">
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
              defaultValue={revenue?.description}
              placeholder={revenue?.description}
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
              defaultValue={revenue?.amount}
              placeholder={revenue?.amount.toString()}
              onChange={(event) => setAmount(parseFloat(event.target.value))}
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
              defaultValue={new Date(revenue.due_date)
                .toISOString()
                .slice(0, 10)}
              onChange={(event) => setDueDate(new Date(event.target.value))}
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
                  defaultChecked={revenue.received === true}
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
                    setReceivedAt(null);
                  }}
                  className="mr-1"
                  defaultChecked={revenue.received === false}
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
                defaultValue={
                  revenue.received_at
                    ? new Date(revenue.received_at).toISOString().slice(0, 10)
                    : new Date(revenue.due_date).toISOString().slice(0, 10)
                }
                onChange={(event) =>
                  setReceivedAt(new Date(event.target.value))
                }
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
              defaultValue={revenue?.category}
              required
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
              required
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
