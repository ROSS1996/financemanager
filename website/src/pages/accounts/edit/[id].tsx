import useAccount from "@/pages/hooks/accounts/useAccount";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [category, setCategory] = useState("");

  const accountId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;
  const account = useAccount(accountId);

  useEffect(() => {
    if (account) {
      setName(account.name);
      setBalance(account.starting_balance);
      setCategory(account.category);
    }
  }, [account]);

  if (!account) {
    return <p>Account data not found</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/accounts/update", {
        id,
        name,
        balance,
        category,
      });
      if (data) {
        router.push("/accounts");
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
              Account Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={account?.name}
              onChange={(event) => setName(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="balance"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Starting Balance
            </label>
            <input
              type="number"
              id="balance"
              name="balance"
              defaultValue={account?.starting_balance}
              onChange={(event) => setBalance(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              defaultValue={account?.category}
              onChange={(event) => setCategory(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              <option value="Cash">Cash Wallet</option>
              <option value="Bank Account">Bank Account</option>
              <option value="Digital Platform">Digital Platform</option>
              <option value="Other">Other</option>
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
