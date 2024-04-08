import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="md:h-24 p-4 lg:px-20 xl:px-40 bg-black text-green-600 flex items-center justify-between flex-col sm:flex-row gap-4">
      <Link href="/" className="font-bold  xl:text-xl uppercase">Pasta Rasta</Link>
      <p>Phone: <span className="text-white">123-456-789</span></p>
      <div>
        <h3 className="font-bold">Working hours</h3>
        <span className="text-white">10:00-22:00</span>
      </div>
      <p>© ALL RIGHTS RESERVED</p>
    </div>
  );
};

export default Footer;