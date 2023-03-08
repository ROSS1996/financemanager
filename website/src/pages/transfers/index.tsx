import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useTransfers from "../hooks/useTransfers";

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

  const transfers = useTransfers(sessionState?.user.id);

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
                    {transfer.origin_account_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transfer.destination_account_id}
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
