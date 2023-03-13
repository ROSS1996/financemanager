import axios from "axios";
import Link from "next/link";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import useTransfers from "../hooks/transfers/useTransfers";
import useAccounts from "../hooks/accounts/useAccounts";
import { useRouter } from "next/router";

import type { Session } from "next-auth";
import { Account } from "@/models/account";
import { Transfer } from "@/models/transfer";

import Layout from "../../components/layout";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";

import Icons from "@/components/icons";

interface ProfileProps {
  session?: Session | null;
}

interface InfoProps {
  transfers: Transfer[];
  accounts: Account[];
}

function TransferList({ transfers, accounts }: InfoProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (id: any, div: any) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/transfers/single/${id}`
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
        {transfers.map((transfer) => (
          <div
            className="overflow-hidden bg-white border rounded-lg shadow-md"
            key={transfer.id}
            ref={divRef}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h3 className="text-lg font-bold text-white truncate">
                {transfer.description}
              </h3>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center mb-2">
                <Icons category="Money" className="text-2xl text-yellow-700" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  $ {transfer.amount.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <AiOutlineCalendar className="text-2xl text-blue-500" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  {new Date(transfer.due_date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <Icons category="paid" className="text-2xl text-red-500" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  {accounts.find(
                    (account) => account.id === transfer.origin_account_id
                  )?.name ?? ""}{" "}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <Icons
                  category="received"
                  className="text-2xl text-green-500"
                />

                <div className="ml-2 text-sm font-semibold text-gray-500">
                  {accounts.find(
                    (account) => account.id === transfer.destination_account_id
                  )?.name ?? ""}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaCheckSquare className="text-2xl text-indigo-500" />
                <div className="ml-2 text-sm font-semibold text-gray-500">
                  {transfer.done ? "Transfer Done" : "Transfer Pending"}
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 py-2 bg-gray-100">
              <div className="flex gap-2">
                <Link href={`transfers/edit/${transfer.id}`}>
                  <div className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800">
                    <BsFillPencilFill /> Edit
                  </div>
                </Link>
                <div
                  className="flex items-center justify-center w-20 gap-1 py-1 text-sm font-bold text-white bg-red-500 rounded cursor-pointer hover:bg-red-700"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this transfer?"
                      )
                    ) {
                      handleDelete(transfer.id, divRef.current);
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

  return (
    <Layout pageTitle="Transfers" pageDescription="Transfers">
      {transfers.length > 0 ? (
        <div className="flex flex-col">
          <header className="py-4 shadow bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Transfers</h1>
                <div className="flex items-center">
                  <Link
                    href="/transfers/new"
                    className="inline-block px-4 py-2 font-semibold text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add new transfer
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <TransferList accounts={accounts} transfers={transfers} />
        </div>
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
