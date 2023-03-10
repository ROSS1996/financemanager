import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { BsFillPencilFill, BsEraserFill } from "react-icons/bs";
import useBalance from "../hooks/accounts/useBalance";

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
  const accounts = useBalance(sessionState?.user.id);

  if (!accounts) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          No registered accounts,{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            add your first one
          </Link>
        </p>
      </Layout>
    );
  }

  const handleDelete = async (id: any, row: any) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:3000/accounts/single",
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

  let totalBalance = 0;
  accounts.forEach((account) => {
    totalBalance += +account.balance;
  });

  return (
    <Layout pageTitle="Accounts" pageDescription="Accounts">
      {accounts.length > 0 ? (
        <div className="flex flex-col bg-gray-50">
          <header className="py-4 shadow bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
                <div className="flex items-center">
                  <div className="flex flex-col items-center justify-center px-4 mr-4 text-gray-500 bg-white rounded-sm shadow-md">
                    <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Total Balance
                    </span>
                    <div className="text-lg font-bold">
                      $ {totalBalance.toLocaleString()}
                    </div>
                  </div>
                  <Link
                    href="/accounts/new"
                    className="inline-block px-4 py-2 font-semibold text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add new account
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
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Starting Balance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Revenues
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs tracking-wider text-left text-gray-500 uppercase font medium"
                      >
                        Expenses
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Transfers Sent
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Transfers Received
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Balance
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {accounts.map((account) => (
                      <tr key={account.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {account.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {account.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          $ {account.starting_balance.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-500 whitespace-nowrap">
                          $ {account.total_revenues.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-red-500 whitespace-nowrap">
                          $ {account.total_expenses.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          $ {account.total_transfers_sent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          $ {account.total_transfers_received.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          $ {account.balance.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Link href={`accounts/edit/${account.id}`}>
                              <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-indigo-600 rounded-sm cursor-pointer hover:bg-indigo-800">
                                <BsFillPencilFill /> Edit
                              </div>
                            </Link>
                            <div
                              className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-red-500 rounded-sm cursor-pointer hover:bg-red-700"
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this account? Doing so will also remove all the expenses, revenues and transfers related to that account"
                                  )
                                ) {
                                  handleDelete(
                                    account.id,
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
          No registered accounts,{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            add your first one
          </Link>
        </p>
      )}
    </Layout>
  );
}
