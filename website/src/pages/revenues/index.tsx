import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useRevenues from "../hooks/revenues/useRevenues";
import useAccounts from "../hooks/accounts/useAccounts";
import { useRouter } from "next/router";
import { BsFillPencilFill, BsEraserFill } from "react-icons/bs";
import axios from "axios";

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

  const revenues = useRevenues(sessionState?.user.id);
  const accounts = useAccounts(sessionState?.user.id);

  if (!revenues) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          No registered revenues,{" "}
          <Link href="revenues/new" className="underline underline-offset-2">
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
          In order to start adding revenues, you need at least one account
          setup.{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            Add your first one.
          </Link>
        </p>
      </Layout>
    );
  }

  const handleDelete = async (id: any, row: any) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:3000/revenues/single",
        {
          data: {
            id: id,
          },
        }
      );
      if (data) {
        row.parentElement.removeChild(row);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle="Revenues" pageDescription="Revenues">
      {revenues.length > 0 ? (
        <>
          <div className="px-6 py-3">
            <Link
              href="/revenues/new"
              className="px-2 py-1 bg-gray-200 border border-black rounded-sm cursor-pointer w-fit hover:bg-gray-400"
            >
              Add new revenue
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
                  Received
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
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {revenues.map((revenue) => (
                <tr
                  key={revenue.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {revenue.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${revenue.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(revenue.due_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {revenue.received ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {revenue.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {accounts.find(
                      (account) => account.id === revenue.account_id
                    )?.name ?? ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {revenue.received_at
                      ? new Date(revenue.received_at).toLocaleString()
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(revenue.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(revenue.updated_at).toLocaleString()}
                  </td>
                  <td className="flex flex-col gap-2 px-6 py-4 whitespace-nowrap">
                    <Link href={`revenues/edit/${revenue.id}`}>
                      <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white rounded-sm cursor-pointer bg-slate-600 hover:bg-slate-800">
                        <BsFillPencilFill /> Edit
                      </div>
                    </Link>
                    <div
                      className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-red-500 rounded-sm cursor-pointer hover:bg-red-700"
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this revenue?"
                          )
                        ) {
                          handleDelete(
                            revenue.id,
                            e.currentTarget.closest("tr")
                          );
                        }
                      }}
                    >
                      <BsEraserFill /> Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-lg font-bold text-center">
          No registered revenues,{" "}
          <Link href="revenues/new" className="underline underline-offset-2">
            add your first one
          </Link>
        </p>
      )}
    </Layout>
  );
}
