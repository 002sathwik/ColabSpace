"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import { sidebarlinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[265px]">
      <Sheet>
        <SheetTrigger asChild>
          <GiHamburgerMenu className="text-white sm:hidden cursor-pointer " />
        </SheetTrigger>
        <SheetContent side="left" className="border-none text-white bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <h1 className="text-white font-semibold text-md md:text-2xl  p-2 rounded-xl">
              <span className="text-md md:text-2xl font-bold">C</span>olab
              <span className="text-md md:text-2xl">S</span>pace
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarlinks.map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-3 rounded-lg w-full max-w-60 ",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={24}
                          height={24}
                        />
                        <p className=" text-sm font-semibold font-poetsen-one-regular">
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
