import { ReactNode, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

import { Navbar } from "./navbar";

interface User {
  email: string;
}

interface ProfileProps {
  session: Session | null;
}

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(
  { children }: LayoutProps,
  { session }: ProfileProps
) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session?.user) {
        const user = session.user as User;
        setEmail(user.email);
      }
    }
    if (!session) {
      fetchData();
    } else {
      const user = session.user as User;
      setEmail(user.email);
    }
  }, [session]);

  return (
    <>
      <Navbar email={email} />
      {children}
    </>
  );
}
