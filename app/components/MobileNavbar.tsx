"use client";
import React, { useState } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import OptionalLinks from "./OptionalLinks";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
];

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const user = false;
  return (
    <div>
      <div className="flex justify-end">
        {
            open ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="fill-green-600 h-[25px]" onClick={() => setOpen(!open)}
            ><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-green-600 h-[25px]" onClick={() => setOpen(!open)}
            ><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        }
      </div>
      {open && (
        <div className="bg-black text-green-600 absolute left-0 w-full h-[calc(100vh-3rem)] flex flex-col gap-8 items-center justify-center z-50">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}

          {/* CHECK USER */}
          <OptionalLinks />
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;