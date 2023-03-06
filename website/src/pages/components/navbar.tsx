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
      <ul>
        <li className="flex flex-row gap-2 font-bold">
          <Link href="/">Home</Link>
        </li>
      </ul>
      {name ? (
        <ul className="flex flex-row gap-3 font-bold">
          <li>
            <span>{name}</span>
          </li>
          <li className="font-bold">
            <Link href="/edit">Edit Profile</Link>
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
