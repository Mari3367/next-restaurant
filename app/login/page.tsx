import React from "react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      LoginPage
    <p>Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:text-blue-400">Create one!</Link></p>
    </div>
  )
}

export default LoginPage