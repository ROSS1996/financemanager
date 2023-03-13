import { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useExpenses from "../hooks/expenses/useExpenses";
import useAccounts from "../hooks/accounts/useAccounts";
import { useRouter } from "next/router";
import axios from "axios";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineDollar, AiOutlineCalendar } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";

import { Account } from "@/models/account";
import { Expense } from "@/models/expense";

import Icons from "@/components/icons";

interface ProfileProps {
  session?: Session | null;
}

interface InfoProps {
  expenses: Expense[];
  accounts: Account[];
}

function ExpensesList({ expenses, accounts }: InfoProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (id: any, div: any) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/expenses/single/${id}`
      );
      if (data) {
        div.parentElement.removeChild(div);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <main className="flex-grow">
      <div className="container grid grid-cols-1 gap-6 px-4 py-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {expenses.map((expense) => (
          <div
            className="overflow-hidden bg-white border rounded-lg shadow-md"
            key={expense.id}
            ref={divRef}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h3 className="text-lg font-bold text-white truncate">
                {expense.description}
              </h3>
              <div className="text-sm text-gray-400">
                {expense.created_at
                  ? new Date(expense.created_at).toLocaleString()
                  : ""}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center mb-2">
                <Icons
                  category={expense.category}
                  className="text-2xl text-blue-500"
                />
                <div className="ml-2 text-sm font-semibold text-gray-500 uppercase">
                  {expense.category}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <AiOutlineDollar className="text-2xl text-red-500" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  $ {expense.amount.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <AiOutlineCalendar className="text-2xl text-green-500" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  {new Date(expense.due_date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaCheckSquare className="text-2xl text-indigo-500" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  {expense.paid
                    ? "Paid on " +
                      new Date(expense.paid_at!).toLocaleDateString()
                    : "Not paid"}
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 py-2 bg-gray-50">
              <div className="flex gap-2">
                <Link href={`expenses/edit/${expense.id}`}>
                  <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800">
                    <BsFillPencilFill /> Edit
                  </div>
                </Link>
                <div
                  className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-red-500 rounded cursor-pointer hover:bg-red-700"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this expense?"
                      )
                    ) {
                      handleDelete(expense.id, divRef.current);
                    }
                  }}
                >
                  <BsFillTrashFill /> Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
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

  const expenses = useExpenses(sessionState?.user.id);
  const accounts = useAccounts(sessionState?.user.id);

  if (!expenses) {
    return (
      <Layout pageTitle="Expenses" pageDescription="Expenses">
        <p className="text-lg font-bold text-center">
          No registered expenses,{" "}
          <Link href="expenses/new" className="underline underline-offset-2">
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
          In order to start adding expenses, you need at least one account
          setup.{" "}
          <Link href="accounts/new" className="underline underline-offset-2">
            Add your first one.
          </Link>
        </p>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Expenses" pageDescription="Expenses">
      {expenses.length > 0 ? (
        <div className="flex flex-col">
          <header className="py-4 shadow bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
                <div className="flex items-center">
                  <Link
                    href="/expenses/new"
                    className="inline-block px-4 py-2 font-semibold text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add new expense
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <ExpensesList expenses={expenses} accounts={accounts} />
        </div>
      ) : (
        <p className="text-lg font-bold text-center">
          No registered expenses,{" "}
          <Link href="expenses/new" className="underline underline-offset-2">
            add your first one
          </Link>
          .
        </p>
      )}
    </Layout>
  );
}
