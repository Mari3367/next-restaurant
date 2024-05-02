import React from "react";
import Link from "next/link";
import SigninForm from "@/app/components/SigninForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center flex-col items-center bg-black text-green-600 h-[calc(100vh-6rem)] md:justify-start md:pt-[5rem]">
    <SigninForm />
    <span className="pt-2"><Link href="/auth/signup" className="text-blue-500 hover:text-blue-400">Don&apos;t have an account? Create one!</Link></span>
    </div>
  )
}

export default LoginPage