import Link from "next/link";
import { destroyCookie } from "nookies";

type NavbarProps = {
  userId?: string;
};

export const Navbar = ({ userId }: NavbarProps) => {
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
      <ul>
        {userId ? (
          <li className="flex flex-row gap-3 font-bold">
            User ID: <span>{userId}</span>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li className="font-bold">
            <span>
              <Link href="/login">Login</Link>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};
