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

  return (
    <Layout pageTitle="Accounts" pageDescription="Accounts">
      {accounts.length > 0 ? (
        <>
          <div className="px-6 py-3">
            <Link
              href="/accounts/new"
              className="px-2 py-1 bg-gray-200 border border-black rounded-sm cursor-pointer w-fit hover:bg-gray-400"
            >
              Add new account
            </Link>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  ID
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Name
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Starting Balance
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Revenues
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Expenses
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Transfers Sent
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Transfers Received
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Balance
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Category
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    $ {account.starting_balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    $ {account.total_revenues}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    $ {account.total_expenses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    $ {account.total_transfers_received}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    $ {account.total_transfers_sent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    $ {account.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.category}
                  </td>
                  <td className="flex flex-col gap-2 px-6 py-4 whitespace-nowrap">
                    <Link href={`accounts/edit/${account.id}`}>
                      <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white rounded-sm cursor-pointer bg-slate-600 hover:bg-slate-800">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
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
