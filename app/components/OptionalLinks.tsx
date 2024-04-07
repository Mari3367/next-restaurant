import React from 'react';
import Link from 'next/link';

// later turn in to clinet component to click logout

const OptionalLinks = () => {
    const user = false;
  return (
    <div>
        {!user ? (
          <Link href="/login" className="group text-green-600 transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Login</span>
        </Link>
        ) : (
          <div className="flex flex-col gap-8 md:gap-12 md:flex-row">
            <Link href="/orders" className="group text-green-600 transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Orders</span>
            </Link>
            <div className="cursor-pointer xl:text-lg  group text-green-600 transition-all duration-300 ease-in-out">
              <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Logout</span>
            </div>
          </div>
        )}
    </div>
  )
}

export default OptionalLinks
