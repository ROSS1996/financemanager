import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

interface ProfileProps {
  session?: Session | null;
}

interface Expense {
  id: string;
  name: string;
  starting_balance: string;
  category: string;
  user_id?: string;
}

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [accounts, setAccounts] = useState<Expense[]>([]);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/accounts/all", {
          params: { id: sessionState?.user.id },
        });
        setAccounts(response.data.accounts);
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
      {accounts ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-6 py-3 font-bold border-b border-gray-200">
                Name
              </th>
              <th className="px-6 py-3 font-bold border-b border-gray-200">
                Starting Balance
              </th>
              <th className="px-6 py-3 font-bold border-b border-gray-200">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr
                key={account.id}
                className="bg-white border-b border-gray-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.starting_balance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg font-bold text-center">No registered accounts.</p>
      )}
    </Layout>
  );
}
