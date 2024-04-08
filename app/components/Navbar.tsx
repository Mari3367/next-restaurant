import React from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import MobileNavbar from "./MobileNavbar";
import OptionalLinks from "./OptionalLinks";

const Navbar = () => {
  const user = true;
  return (
    <div className="h-12 text-green-600 p-4 flex items-center justify-between bg-black uppercase md:h-[6rem] lg:px-20 xl:px-40">
      {/* LOGO */}
      <div className=" md:flex gap-4 flex-1 md:font-bold xl:text-xl">
        <Link href="/">Rasta Pasta</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-12 items-center justify-end flex-1">
        <Link href="/menu" className="group text-green-600 transition-all duration-300 ease-in-out">
          <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Menu</span>
        </Link>
        <OptionalLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;