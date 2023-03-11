import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import useAccounts from "@/pages/hooks/accounts/useAccounts";
import useTransfer from "@/pages/hooks/transfers/useTransfer";

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>();
  const [duedate, setDueDate] = useState<Date>();
  const [done, setDone] = useState<boolean>(false);
  const [originAccount, setOriginAccount] = useState<string | null>(null);
  const [destinationAccount, setDestinationAccount] = useState<string | null>(
    null
  );

  const transferId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;
  const transfer = useTransfer(transferId);

  const accounts = useAccounts(transfer?.user_id);

  useEffect(() => {
    if (transfer) {
      setDescription(transfer.description);
      setAmount(transfer.amount);
      setDueDate(transfer.due_date);
      setDone(transfer.done);
      setOriginAccount(String(transfer.origin_account_id));
      setDestinationAccount(String(transfer.destination_account_id));
    }
  }, [transfer]);

  if (!transfer) {
    return <p>transfer data not found</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/transfers/update", {
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
              defaultValue={transfer.description}
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
              defaultValue={transfer.amount}
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
              defaultValue={transfer.due_date.toISOString().slice(0, 10)}
              onChange={(event) => setDueDate(new Date(event.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
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
              <div className="flex items-center gap-2">
                <label htmlFor="paid-yes">Yes</label>
                <input
                  type="radio"
                  id="paid-yes"
                  name="done"
                  value="true"
                  onChange={() => setDone(true)}
                  className="mr-1"
                  required
                  defaultChecked={transfer.done === true}
                />
                <label htmlFor="paid-no">No</label>
                <input
                  type="radio"
                  id="paid-no"
                  name="done"
                  value="false"
                  onChange={() => setDone(false)}
                  className="mr-1"
                  required
                  defaultChecked={transfer.done === false}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="originAccount"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Origin Account
            </label>
            <select
              id="originAccount"
              name="originAccount"
              value={originAccount ?? ""}
              onChange={(event) => {
                setOriginAccount(event.target.value || null);
                if (event.target.value === destinationAccount) {
                  setDestinationAccount("");
                }
              }}
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
          <div className="flex flex-col">
            <label
              htmlFor="destinationAccount"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Destination Account
            </label>
            <select
              id="destinationAccount"
              name="destinationAccount"
              value={destinationAccount ?? ""}
              onChange={(event) => {
                setDestinationAccount(event.target.value);
                if (event.target.value === originAccount) {
                  setOriginAccount("");
                }
              }}
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
