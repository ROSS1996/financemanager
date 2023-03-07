import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

interface ProfileProps {
  session?: Session | null;
}

interface Expense {
  id: number;
  description: string;
  amount: string;
  due_date: string;
  paid: boolean;
  category: string;
  user_id: number;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/expenses/all", {
          params: { id: sessionState?.user.id },
        });
        setExpenses(response.data.expenses); // log the response data to the console
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
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="bg-white border-b border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.due_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.paid ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
