import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useAccounts from "../hooks/useAccounts";
import { useRouter } from "next/router";

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
  const accounts = useAccounts(sessionState?.user.id);

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
                  Name
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Starting Balance
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Category
                </th>
                <th className="px-6 py-3 font-bold border-b border-gray-200">
                  Account ID
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${account.starting_balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
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
