import Link from "next/link";
import { signOut } from "next-auth/react";
import { BiTransferAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillBank, AiFillCreditCard } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";

type NavbarProps = {
  name: string | null;
};

function LoggedIn({ handleLogout }: any) {
  return (
    <ul className="flex flex-col items-center w-full gap-4 md:flex-row md:w-max">
      <li className="items-center justify-center w-full py-1 border-b border-gray-500 md:border-none md:py-0 ">
        <Link
          href="/accounts"
          className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-800"
        >
          <AiFillBank />
          <span>Accounts</span>
        </Link>
      </li>
      <li className="items-center justify-center w-full py-1 border-b border-gray-500 md:border-none md:py-0 ">
        <Link
          href="/expenses"
          className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-800"
        >
          <AiFillCreditCard />
          <span>Expenses</span>
        </Link>
      </li>
      <li className="items-center justify-center w-full py-1 border-b border-gray-500 md:border-none md:py-0 ">
        <Link
          href="/revenues"
          className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-800"
        >
          <FaMoneyBill />
          <span>Revenues</span>
        </Link>
      </li>
      <li className="items-center justify-center w-full py-1 border-b border-gray-500 md:border-none md:py-0 ">
        <Link
          href="/transfers"
          className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-800"
        >
          <BiTransferAlt />
          <span>Transfers</span>
        </Link>
      </li>
      <li className="items-center justify-center w-full py-1 border-b border-gray-500 md:border-none md:py-0 ">
        <Link
          href="/profile"
          className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-800"
        >
          <BsFillPersonFill />
          <span>Profile</span>
        </Link>
      </li>
      <li onClick={handleLogout} className="cursor-pointer">
        <span className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-800">
          Logout
        </span>
      </li>
    </ul>
  );
}

export const Navbar = ({ name }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 md:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-gray-700">
            Finance Manager
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <RxHamburgerMenu
            size={24}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        {name ? (
          <div className="items-center hidden gap-8 md:flex">
            <LoggedIn handleLogout={handleLogout} />
          </div>
        ) : (
          <ul className="items-center hidden gap-8 md:flex">
            <Link href="/login">
              <li>Login</li>
            </Link>
            <Link href="/register">
              <li>Register</li>
            </Link>
          </ul>
        )}
      </nav>

      {/* Mobile Navbar */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden fixed top-0 right-0 w-3/5 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out`}
      >
        {name ? (
          <div className="flex flex-col items-center gap-8 pt-16">
            <LoggedIn handleLogout={handleLogout} />
          </div>
        ) : (
          <ul className="flex flex-col items-center gap-8 pt-16">
            <Link href="/login">
              <li>Login</li>
            </Link>
            <Link href="/register">
              <li>Register</li>
            </Link>
          </ul>
        )}
      </div>
    </>
  );
};
