import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import useExpense from "@/pages/hooks/expenses/useExpense";
import useAccounts from "@/pages/hooks/accounts/useAccounts";

export default function Index() {
  const router = useRouter();

  const { id } = router.query;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [duedate, setDueDate] = useState<Date>();
  const [paid, setPaid] = useState(false);
  const [paidat, setPaidAt] = useState<Date | null>(null);
  const [category, setCategory] = useState("");
  const [accountId, setAccountId] = useState(0);

  const expenseId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;
  const expense = useExpense(expenseId);

  const accounts = useAccounts(expense?.user_id);

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDueDate(expense.due_date);
      setPaid(expense.paid);
      setPaidAt(expense.paid_at ? new Date(expense.paid_at) : null);
      setAccountId(parseInt(expense.account_id));
    }
  }, [expense]);

  if (!expense) {
    return <p>Expense data not found</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/expenses/update", {
        id,
        description,
        amount,
        category,
        due_date: duedate,
        paid,
        paid_at: paidat,
        account_id: accountId,
      });
      if (data) {
        router.push("/expenses");
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
              defaultValue={expense?.description}
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
              defaultValue={expense?.amount}
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
              defaultValue={new Date(expense.due_date)
                .toISOString()
                .slice(0, 10)}
              onChange={(event) => setDueDate(new Date(event.target.value))}
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
                  onChange={(event) => setPaid(true)}
                  className="mr-1"
                  required
                  defaultChecked={expense.paid === true}
                />
                Yes
              </label>
              <label htmlFor="paid-no">
                <input
                  type="radio"
                  id="paid-no"
                  name="paid"
                  value="false"
                  onChange={(event) => {
                    setPaid(false);
                    setPaidAt(null);
                  }}
                  className="mr-1"
                  required
                  defaultChecked={expense.paid === false}
                />
                No
              </label>
            </div>
          </div>
          {paid === true ? (
            <div className="flex flex-col">
              <label
                htmlFor="paidat"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Date Paid
              </label>
              <input
                type="date"
                id="paidat"
                name="paidat"
                defaultValue={
                  expense.paid_at
                    ? new Date(expense.paid_at).toISOString().slice(0, 10)
                    : new Date(expense.due_date).toISOString().slice(0, 10)
                }
                onChange={(event) => setPaidAt(new Date(event.target.value))}
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
              defaultValue={expense?.category}
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
                  selected={account.id === expense.account_id}
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
