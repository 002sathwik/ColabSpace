import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className=" flex flex-between  fixed z-50 w-full bg-dark-1 px-6  py-4 lg:px-8">
      <Link href="/" className="flex items-center gap-1">
        <h1 className="text-white font-semibold text-md md:text-2xl  p-2 rounded-xl">
          <span className="text-md md:text-2xl font-bold">C</span>olab
          <span className="text-md md:text-2xl">S</span>pace
        </h1>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
       
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
