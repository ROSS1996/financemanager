import Link from "next/link";

type NavbarProps = {
  userId?: string;
};

export const Navbar = ({ userId }: NavbarProps) => {
  return (
    <nav>
      <ul className="flex flex-row gap-2 bg-blue-300">
        <li className="font-bold">
          <Link href="/">Home</Link>
        </li>
        {userId ? (
          <li className="font-bold">
            User ID: <span>{userId}</span>
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
