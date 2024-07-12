"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white w-full sticky z-20 top-0  transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center shrink-0 h-20 px-4 xl:px-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" prefetch={false}>
              <h3 className="text-2xl font-bold">LOGO</h3>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                href="/"
                className="flex w-full items-center py-2 text-base font-medium"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/donate"
                className="flex w-full items-center py-2 text-base font-medium"
                prefetch={false}
              >
                Donate
              </Link>
              <Link
                href="/vote"
                className="flex w-full items-center py-2 text-base font-medium"
                prefetch={false}
              >
                Vote
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
          <h3 className="text-2xl font-bold">LOGO</h3>
        </Link>
        <div className="flex w-full justify-center">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/donate"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Donate
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/vote"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Vote
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto">
          <Button>Login</Button>
        </div>
      </nav>
    </header>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}




export default Navbar;
