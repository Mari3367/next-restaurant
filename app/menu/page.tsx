import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MenuType } from "../types/types";
import prisma from "../utils/connect";
import { NextResponse } from "next/server";

const getCategories = async () => {

  try {
    const categories = await prisma.category.findMany();
    const res = new NextResponse(JSON.stringify(categories), {status: 200});
    return res.json()
  }catch(err) {
    console.log(err);
    return new NextResponse(JSON.stringify({message:"Something went wrong"}), {status: 500})
  }
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