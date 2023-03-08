import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";

interface ProfileProps {
  session?: Session | null;
}

interface Revenue {
  id: number;
  description: string;
  amount: string;
  due_date: string;
  received: boolean;
  category: string;
  user_id: number;
  received_at: string | null;
  account_id: number;
  created_at: string;
  updated_at: string;
}

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/revenues/all", {
          params: { id: sessionState?.user.id },
        });
        setRevenues(response.data.revenues);
      } catch (error) {
        console.error(error);
      }
    };

    if (sessionState) {
      fetchData();
    }
  }, [sessionState]);

  return (
    <Layout pageTitle="Revenues" pageDescription="Revenues">
      {revenues ? (
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
                    {revenue.account_id}
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
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-lg font-bold text-center">No registered revenues.</p>
      )}
    </Layout>
  );
}