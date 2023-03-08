import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";

interface ProfileProps {
  session?: Session | null;
}

interface Transfer {
  id?: string;
  description: string;
  amount: string;
  due_date: string;
  done: string;
  origin_account_id: string;
  destination_account_id: string;
  user_id?: string;
}

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/transfers/all", {
          params: { id: sessionState?.user.id },
        });
        setTransfers(response.data.transfers);
      } catch (error) {
        console.error(error);
      }
    };

    if (sessionState) {
      fetchData();
    }
  }, [sessionState]);

  return (
    <Layout>
      {transfers ? (
        <>
          <div className="px-6 py-3">
            <Link
              href="/newtransfer"
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
                    {transfer.amount}
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
          No registered transfers.
        </p>
      )}
    </Layout>
  );
}
