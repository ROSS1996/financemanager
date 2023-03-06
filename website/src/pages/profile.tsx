import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useState, useEffect } from "react";

interface User {
  email: string;
}

interface ProfileProps {
  session: Session | null;
}

export default function Profile({ session }: ProfileProps) {
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

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {email}</p>
    </div>
  );
}
