import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="fixed w-full z-50 bg-gray-900">
      <div className="container  mx-auto px-8 xl:px-0 flex items-center py-2 justify-between top-0  z-50 shadow">
        <Link href={"/"}>
          <div className="text-container">
            <h2 className="text-gradient">Shopping</h2>
          </div>
        </Link>
        <div className="flex items-center space-x-2.5 text-sm">
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/"}
              className="mr-5 hover:text-yellow-100 text-white transition"
            >
              Home page
            </Link>
            <Link
              href={"/products"}
              className="mr-5 hover:text-yellow-100 text-white transition"
            >
              All products
            </Link>
            <Link
              href={"/contacts"}
              className="mr-5 hover:text-yellow-100 text-white transition"
            >
              Contacts
            </Link>
          </nav>
          <Link href={"/shopping-card"}>
            <button
              className="button bg-blue-700 text-white border-transparent hover:border-white 
              hover:bg-transparent"
            >
              My Bag
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
