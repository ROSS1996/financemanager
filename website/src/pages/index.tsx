import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { NotLogged } from "../components/notlogged";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useBalance from "./hooks/accounts/useBalance";

interface ProfileProps {
  session?: Session | null;
}

interface AccountSummaryProps {
  userId: string;
}

const AccountSummary: React.FC<AccountSummaryProps> = ({ userId }) => {
  const balance = useBalance(userId);

  const accountSummaries = balance.map((account) => (
    <p
      className="p-4 text-lg text-justify border border-gray-400 rounded-sm shadow-sm"
      key={account.id}
    >
      Your <span className="font-semibold">{account.name}</span> account, which
      is a <span className="font-semibold">{account.category}</span>, started
      with a balance of{" "}
      <span className="font-semibold">${account.starting_balance}</span>. You{" "}
      {account.total_revenues > 0 ? (
        <>
          received a total of{" "}
          <span className="font-semibold">
            ${account.total_revenues.toLocaleString()}
          </span>{" "}
          in revenues
        </>
      ) : (
        <>did not receive any revenues</>
      )}{" "}
      {account.total_expenses > 0 ? (
        <>
          and spent a total of{" "}
          <span className="font-semibold">
            ${account.total_expenses.toLocaleString()}
          </span>{" "}
          in expenses
        </>
      ) : (
        <>and did not have any expenses</>
      )}
      . You{" "}
      {account.total_transfers_received > 0 ? (
        <>
          received{" "}
          <span className="font-semibold">
            ${account.total_transfers_received.toLocaleString()}
          </span>{" "}
          in transfers
        </>
      ) : (
        <>did not receive any transfers</>
      )}{" "}
      {account.total_transfers_sent > 0 ? (
        <>
          and sent{" "}
          <span className="font-semibold">
            ${account.total_transfers_sent.toLocaleString()}
          </span>{" "}
          in transfers
        </>
      ) : (
        <>and did not send any transfers</>
      )}
      . Your current balance for this account is{" "}
      <span className="font-semibold">${account.balance.toLocaleString()}</span>
      .
    </p>
  ));

  let totalBalance = 0;
  balance.forEach((account) => {
    totalBalance += +account.balance;
  });

  return (
    <div className="flex flex-col gap-4 rounded-md">
      <div className="flex flex-col gap-2">{accountSummaries}</div>
      <p>
        In total, you have a{" "}
        <span className="font-semibold">${totalBalance}</span> balance across
        all accounts.
      </p>
    </div>
  );
};

export default function Index({ session }: ProfileProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      sessionData ? setSessionState(sessionData) : setSessionState(null);
    }
  }, [sessionData, status]);

  return (
    <Layout pageTitle="Home" pageDescription="Home">
      {!sessionState ? (
        <NotLogged />
      ) : (
        <div className="flex flex-col gap-4 p-4 rounded-md h-content">
          <p className="text-lg font-medium">
            Welcome back,{" "}
            <span className="text-indigo-600">{sessionState.user?.name}!</span>{" "}
            <span className="text-gray-700">
              Here is a summary of your accounts:
            </span>
          </p>
          <AccountSummary userId={sessionState.user.id} />
        </div>
      )}
    </Layout>
  );
}
