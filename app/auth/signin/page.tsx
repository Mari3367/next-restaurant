import React from "react";
import Link from "next/link";
import SigninForm from "@/app/components/SigninForm";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  return (
    <div className="flex justify-center flex-col items-center bg-black text-green-600 h-[calc(100vh-6rem)] md:justify-start md:pt-[5rem]">
    <SigninForm callbackUrl={searchParams.callbackUrl}/>
    <Link href="/auth/forgotPassword" className="text-blue-300 text-sm pt-4">Forgot password</Link>
    <span className="pt-2"><Link href="/auth/signup" className="text-blue-500 hover:text-blue-400">Don&apos;t have an account? Create one!</Link></span>
    <div className="flex flex-col gap-2 pt-[3rem] text-white text-sm">
        <h1>Demo</h1>
        <span>Email: admin-demo-test@mail.com</span>
        <span>Password: admindemopass</span>
        <span>Email: demo-user-test@mail.com</span>
        <span>Password: userdemopass</span>
    </div>
    </div>
  )
}

export default SigninPage