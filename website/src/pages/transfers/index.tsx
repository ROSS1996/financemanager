import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useTransfers from "../hooks/useTransfers";
import useAccounts from "../hooks/useAccounts";
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
        <>
          <div className="px-6 py-3">
            <Link
              href="/transfers/new"
              className="px-2 py-1 bg-gray-200 border border-black rounded-sm cursor-pointer w-fit hover:bg-gray-400"
            >
              Add new transfer
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
                  Done
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Origin Account
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Destination Account
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr
                  key={transfer.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transfer.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${transfer.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(transfer.due_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transfer.done ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {accounts.find(
                      (account) => account.id === transfer.origin_account_id
                    )?.name ?? ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {accounts.find(
                      (account) =>
                        account.id === transfer.destination_account_id
                    )?.name ?? ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex flex-col gap-2">
                    <div className="flex gap-1 items-center rounded-sm w-20 justify-center font-bold text-sm py-1 bg-slate-600 text-white cursor-pointer hover:bg-slate-800">
                      <BsFillPencilFill /> Edit
                    </div>
                    <div
                      className="flex gap-1 items-center rounded-sm w-20 justify-center font-bold text-sm py-1 bg-red-500 text-white cursor-pointer hover:bg-red-700"
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this account?"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
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
