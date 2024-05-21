"use client";
import Link from "next/link";
import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useCartStore } from "../utils/store";
import { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href="/cart" className="flex items-center gap-4 md:pl-20">
      <div className="relative w-8 h-8 md:w-5 md:h-5 hidden md:block">
        <ShoppingCartIcon/>
      </div>
      <div className="xl:text-lg">Cart<span className="bg-yellow-400 ml-[2px] px-[4px] text-sm rounded-full">{totalItems}</span></div>
    </Link>
  );
};

export default CartIcon;