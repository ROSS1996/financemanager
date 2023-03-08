import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useExpenses from "../hooks/useExpenses";
import useAccounts from "../hooks/useAccounts";
import { useRouter } from "next/router";

interface ProfileProps {
  session?: Session | null;
}

export default function Index({ session }: ProfileProps) {
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

  const expenses = useExpenses(sessionState?.user.id);
  const accounts = useAccounts(sessionState?.user.id);

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
                  Account
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
                    {accounts.find(
                      (account) => account.id === expense.account_id
                    )?.name ?? ""}
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
