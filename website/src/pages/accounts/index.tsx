import { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import useBalance from "../hooks/accounts/useBalance";
import { Account } from "@/models/account";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import Icons from "@/components/icons";

interface ProfileProps {
  session?: Session | null;
}

interface AccountsProps {
  accounts: Account[];
}

function AccountsList({ accounts }: AccountsProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (id: any, div: any) => {
    try {
      const { data } = await axios.delete(`/api/accounts/delete/${id}`);
      if (data) {
        div.parentElement.removeChild(div);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <main className="flex-grow">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accounts.map((item) => (
            <div
              className="overflow-hidden bg-white border rounded-lg shadow-md"
              key={item.id}
              ref={divRef}
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h3 className="text-lg font-bold text-white truncate">
                  {item.name}
                </h3>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center mb-2">
                  <Icons
                    category="Money"
                    className="text-2xl text-yellow-500"
                  />
                  <div className="ml-2 text-sm font-semibold text-gray-500">
                    Starting Balance: ${" "}
                    {item.starting_balance?.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Icons
                    category="Received"
                    className="text-2xl text-green-500"
                  />
                  <div className="ml-2 text-sm font-semibold text-gray-500">
                    Revenues: $ {item.total_revenues?.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Icons category="Paid" className="text-2xl text-red-500" />
                  <div className="ml-2 text-sm font-semibold text-gray-500">
                    Expenses: $ {item.total_expenses?.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Icons
                    category="Received"
                    className="text-2xl text-green-500"
                  />
                  <div className="ml-2 text-sm font-semibold text-gray-500">
                    Transfers Received: ${" "}
                    {item.total_transfers_received?.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Icons category="Paid" className="text-2xl text-red-500" />
                  <div className="ml-2 text-sm font-semibold text-gray-500">
                    Transfers Sent: ${" "}
                    {item.total_transfers_sent?.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Icons
                    category="Account"
                    className="text-2xl text-indigo-500"
                  />
                  <div className="ml-2 text-sm font-semibold text-gray-500">
                    Balance: $ {item.balance?.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-4 py-2 bg-gray-100">
                <div className="flex gap-2">
                  <Link href={`items/edit/${item.id}`}>
                    <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white rounded cursor-pointer bg-emerald-600 hover:bg-emerald-800">
                      <BsFillPencilFill /> Edit
                    </div>
                  </Link>
                  <div
                    className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-red-500 rounded cursor-pointer hover:bg-red-700"
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this account? All of the transfers related to that account will also be delete"
                        )
                      ) {
                        handleDelete(item.id, divRef.current);
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

  let totalBalance = 0;
  accounts.forEach((account) => {
    totalBalance +=
      account.starting_balance +
      account.total_revenues -
      account.total_expenses;
  });

  return (
    <Layout pageTitle="Accounts" pageDescription="Accounts">
      {accounts.length > 0 ? (
        <div className="flex flex-col">
          <header className="py-4 shadow bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
                <div className="flex items-center">
                  <div className="flex flex-col items-center justify-center px-2 pt-1 mr-4 text-gray-500 bg-white border border-gray-400 rounded-sm">
                    <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Total Balance
                    </span>
                    <div className="text-lg font-bold text-black">
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
          <AccountsList accounts={accounts} />
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
