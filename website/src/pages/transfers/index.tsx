import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useTransfers from "../hooks/transfers/useTransfers";
import useAccounts from "../hooks/accounts/useAccounts";
import { useRouter } from "next/router";
import axios from "axios";
import { BsFillPencilFill, BsEraserFill } from "react-icons/bs";

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
  const transfers = useTransfers(sessionState?.user.id);
  const accounts = useAccounts(sessionState?.user.id);

  if (!transfers) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          No registered transfers,{" "}
          <Link href="transfers/new" className="underline underline-offset-2">
            add your first one
          </Link>
        </p>
      </Layout>
    );
  }

  if (accounts.length < 2) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          In order to start adding transfers, you need at least two accounts
          setup.{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            Add accounts.
          </Link>
        </p>
      </Layout>
    );
  }

  const handleDelete = async (id: any, row: any) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:3000/transfers/single",
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
    <Layout pageTitle="Transfers" pageDescription="Transfers">
      {transfers.length > 0 ? (
        <div className="flex flex-col bg-gray-50">
          <header className="py-4 shadow bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Transfers</h1>
                <div className="flex items-center">
                  <Link
                    href="/accounts/new"
                    className="inline-block px-4 py-2 font-semibold text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add new transfer
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            <div className="container px-4 py-8 mx-auto">
              <div className="inline-block min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Done
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Origin Account
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Destination Account
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transfers.map((transfer) => (
                      <tr
                        key={transfer.id}
                        className="bg-white border-b border-gray-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {transfer.description}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          $ {transfer.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {new Date(transfer.due_date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {transfer.done ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {accounts.find(
                            (account) =>
                              account.id === transfer.origin_account_id
                          )?.name ?? ""}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {accounts.find(
                            (account) =>
                              account.id === transfer.destination_account_id
                          )?.name ?? ""}
                        </td>
                        <td className="flex flex-col gap-2 px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Link href={`transfers/edit/${transfer.id}`}>
                              <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-indigo-600 rounded-sm cursor-pointer hover:bg-indigo-800">
                                <BsFillPencilFill /> Edit
                              </div>
                            </Link>
                            <div
                              className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-red-500 rounded-sm cursor-pointer hover:bg-red-700"
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this transfer?"
                                  )
                                ) {
                                  handleDelete(
                                    transfer.id,
                                    e.currentTarget.closest("tr")
                                  );
                                }
                              }}
                            >
                              <BsEraserFill /> Delete
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <p className="text-lg font-bold text-center">
          No registered transfers,{" "}
          <Link href="transfers/new" className="underline underline-offset-2">
            add your first one
          </Link>
        </p>
      )}
    </Layout>
  );
}
