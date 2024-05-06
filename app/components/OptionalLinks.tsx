"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/20/solid';

//check if user is signed in via session, if signed in show sing out, otherwise show sign in
const OptionalLinks = () => {
  const { data: session } = useSession();

  return (
    <div>
        {session && session.user ? (
        <div className="flex flex-col gap-8  md:flex-row items-center justify-between">
            <Link href="/orders" className="group text-green-600 transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Orders</span>
            </Link>
            <Link href={"/api/auth/signout"} className="cursor-pointer xl:text-lg group text-green-600 transition-all duration-300 ease-in-out">
              <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Sign out</span>
            </Link>
            <p className="text-white">
              {`${session.user.name}`}
              <UserIcon />
            </p>
          </div>
        ) : (
             <Link href={"/api/auth/signin"} className="group text-green-600 transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-green-600 to-green-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-2 xl:text-lg">Sign in</span>
        </Link>
        )}
    </div>
  )
}

export default OptionalLinks
