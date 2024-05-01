import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MenuType } from "../types/types";

const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/categories', {cache: "no-store"});
  if(!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
}

const MenuPage = async () => {
  const menu:MenuType = await getCategories();
  return (
    <div className="p-4 lg:px-20 lg:pb-12 xl:px-40 md:h-[calc(100vh-6rem)] flex flex-col md:flex-row items-center bg-black gap-8">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full opacity-80 hover:opacity-100 transition duration-200"
        >
          <div className=" bg-zinc-900 flex flex-col justify-center items-center gap-4 hover:bg-zinc-700 transition duration-200">
            {category.img && <Image src={category.img} width={500} height={300} alt="" className="h-[10rem] lg:h-[18rem] object-cover" />}
            <h1 className="uppercase font-bold text-3xl text-white">{category.title}</h1>
            <p className="text-sm my-8 text-white px-4">{category.desc}</p>
            <button className="hidden 2xl:block bg-green-600 hover:bg-green-400 transition duration-150 text-white py-2 px-4 rounded-md mb-4">Explore</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;