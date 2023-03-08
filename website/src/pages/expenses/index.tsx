import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useExpenses from "../hooks/useExpenses";

interface ProfileProps {
  session?: Session | null;
}

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  const expenses = useExpenses(sessionState?.user.id);

  if (!expenses) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          No registered expenses,{" "}
          <Link href="expenses/new" className="underline underline-offset-2">
            add your first one
          </Link>
        </p>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Expenses" pageDescription="Expenses">
      {expenses.length > 0 ? (
        <>
          <div className="px-6 py-3">
            <Link
              href="expenses/new"
              className="px-2 py-1 bg-gray-200 border border-black rounded-sm cursor-pointer w-fit hover:bg-gray-400"
            >
              Add new expense
            </Link>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Description
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Amount
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Due Date
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Paid
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Category
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Account ID
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Paid at
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Created at
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Updated at
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${expense.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(expense.due_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expense.paid ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expense.account_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expense.paid_at
                      ? new Date(expense.paid_at).toLocaleString()
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(expense.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(expense.updated_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-lg font-bold text-center">
          No registered expenses,{" "}
          <Link href="expenses/new" className="underline underline-offset-2">
            add your first one
          </Link>
          .
        </p>
      )}
    </Layout>
  );
}
