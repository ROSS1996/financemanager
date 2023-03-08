import Link from "next/link";
import { signOut } from "next-auth/react";

type NavbarProps = {
  name: string | null;
};

export const Navbar = ({ name }: NavbarProps) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <nav className="flex flex-row items-center justify-between w-full px-2 py-1 bg-blue-300">
      <ul className="flex flex-row items-center gap-2">
        <li className="flex flex-row gap-2 font-bold">
          <Link href="/">Home</Link>
        </li>
        {name ? (
          <>
            <li className="flex flex-row gap-2 font-bold">
              <Link href="/accounts">Accounts</Link>
            </li>
            <li className="flex flex-row gap-2 font-bold">
              <Link href="/expenses">Expenses</Link>
            </li>
            <li className="flex flex-row gap-2 font-bold">
              <Link href="/revenues">Revenues</Link>
            </li>
            <li className="flex flex-row gap-2 font-bold">
              <Link href="/transfers">Transfers</Link>
            </li>
          </>
        ) : (
          false
        )}
      </ul>
      {name ? (
        <ul className="flex flex-row gap-3 font-bold">
          <li>
            <span>{name}</span>
          </li>
          <li className="font-bold">
            <Link href="/profile">Edit Profile</Link>
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            Logout
          </li>
        </ul>
      ) : (
        <span className="font-bold">
          <Link href="/login">Login</Link>
        </span>
      )}
    </nav>
  );
};
