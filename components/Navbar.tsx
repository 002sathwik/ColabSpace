import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between  fixed z-50 w-full bg-dark-1 px-6  py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <h1 className="text-white font-semibold text-2xl md:text-2xl border border-white p-2 rounded-xl">
          <span className="text-3xl md:text-3xl font-bold">C</span>olab
          <span className="text-3xl md:text-3xl">S</span>pace
        </h1>
      </Link>
      <div className="flex-between gap-5">
         {/* cleck user */}
         <MobileNav/>
      </div>
    </nav>
  );
};

export default Navbar;
