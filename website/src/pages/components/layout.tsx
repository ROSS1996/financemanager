import { ReactNode, useEffect, useState } from "react";
import { parseCookies } from "nookies";

import { Navbar } from "./navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    setUserId(parseCookies().userId);
  }, []);

  return (
    <>
      <Navbar userId={userId} />
      {children}
    </>
  );
}
