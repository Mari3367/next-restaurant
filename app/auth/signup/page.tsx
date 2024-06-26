import React from 'react';
import SignupForm from '@/app/components/SignupForm';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <div className="flex justify-center flex-col items-center bg-black text-green-600 h-[calc(100vh-6rem)] md:justify-start md:pt-[5rem]">
    <SignupForm />
    <p className="text-green-600 pt-4">A verification link will be sent to your email.</p>
    <span className="pt-2"><Link href="/auth/signin" className="text-blue-500 hover:text-blue-400">Already have an account? Sign in!</Link></span>
    </div>
  )
}

export default SignupPage