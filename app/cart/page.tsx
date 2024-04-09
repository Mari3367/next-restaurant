import Image from "next/image";
import React from "react";

const CartPage = () => {
  return (
    <div className="h-[calc(100vh-3rem)] md:h-[calc(100vh-6rem)] flex flex-col text-green-600 lg:flex-row bg-zinc-900">
      {/* PRODUCTS CONTAINER */}
      <div className="p-6 flex flex-col justify-center overflow-y-scroll w-full lg:p-10">
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <Image src="/assets/pizza.png" alt="" width={100} height={100} className="w-[4rem] sm:w-[6.5rem]"/>
          <div>
            <h1 className="uppercase sm:text-xl font-bold text-white">sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$79.90</h2>
          <span className="cursor-pointer">X</span>
        </div>
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <Image src="/assets/pizza.png" alt="" width={100} height={100} className="w-[4rem] sm:w-[6.5rem]"/>
          <div>
            <h1 className="uppercase sm:text-xl font-bold text-white">sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$79.90</h2>
          <span className="cursor-pointer">X</span>
        </div>
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <Image src="/assets/pizza.png" alt="" width={100} height={100} className="w-[4rem] sm:w-[6.5rem]"/>
          <div>
            <h1 className="uppercase sm:text-xl font-bold text-white">sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$79.90</h2>
          <span className="cursor-pointer">X</span>
        </div>
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="p-6 bg-zinc-900 flex flex-col gap-4 justify-center w-full lg:px-[10rem] ">
        <div className="flex justify-between">
          <span>Subtotal (3 items)</span>
          <span>$81.70</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-blue-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL(INCL. VAT)</span>
          <span className="font-bold text-white">$239.70</span>
        </div>
        <button className="bg-green-600 text-white p-3 rounded-md w-1/2 self-end">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;