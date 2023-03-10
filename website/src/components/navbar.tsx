import Link from "next/link";
import { signOut } from "next-auth/react";
import { BiTransferAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillBank, AiFillCreditCard, AiFillHome } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";

type NavbarProps = {
  name: string | null;
};

export const Navbar = ({ name }: NavbarProps) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <nav className="flex flex-row items-center justify-between w-full px-4 py-2 bg-gray-200 shadow-lg">
      <ul className="flex flex-row items-center gap-4">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-800"
          >
            <AiFillHome />
            <span>Home</span>
          </Link>
        </li>
        {name && (
          <>
            <li>
              <Link
                href="/accounts"
                className="flex items-center gap-1 text-gray-700 hover:text-gray-800"
              >
                <AiFillBank />
                <span>Accounts</span>
              </Link>
            </li>
            <li>
              <Link
                href="/expenses"
                className="flex items-center gap-1 text-gray-700 hover:text-gray-800"
              >
                <AiFillCreditCard />
                <span>Expenses</span>
              </Link>
            </li>
            <li>
              <Link
                href="/revenues"
                className="flex items-center gap-1 text-gray-700 hover:text-gray-800"
              >
                <FaMoneyBill />
                <span>Revenues</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transfers"
                className="flex items-center gap-1 text-gray-700 hover:text-gray-800"
              >
                <BiTransferAlt />
                <span>Transfers</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      {name ? (
        <ul className="flex flex-row items-center gap-4">
          <li>
            <span className="font-bold text-gray-700 ">{name}</span>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-1 text-gray-700 hover:text-gray-800"
            >
              <BsFillPersonFill />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            <span className="flex items-center gap-1 text-gray-700 hover:text-gray-800">
              Logout
            </span>
          </li>
        </ul>
      ) : (
        <span className="font-bold text-gray-700 ">
          <Link href="/login">Login</Link>
        </span>
      )}
    </nav>
  );
};
