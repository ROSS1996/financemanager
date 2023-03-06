import Link from "next/link";
import { destroyCookie } from "nookies";

type NavbarProps = {
  email: string | null;
};

export const Navbar = ({ email }: NavbarProps) => {
  const handleLogout = () => {
    destroyCookie(null, "token", { path: "/" });
    destroyCookie(null, "userId", { path: "/" });
    location.reload();
  };

  return (
    <nav className="flex flex-row items-center justify-between w-full px-2 py-1 bg-blue-300">
      <ul>
        <li className="flex flex-row gap-2 font-bold">
          <Link href="/">Home</Link>
        </li>
      </ul>
      {email ? (
        <ul className="flex flex-row gap-3 font-bold">
          <li>
            <span>{email}</span>
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
          <Link href="/login2">Login</Link>
        </span>
      )}
    </nav>
  );
};
