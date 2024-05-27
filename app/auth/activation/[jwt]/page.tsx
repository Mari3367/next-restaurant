import React from 'react';
import { activateUser } from '@/app/utils/actions/authActions';

interface Props {
    params: {
      jwt: string;
    };
  }

const ActivationPage = async ({ params }: Props) => {
    const res = await activateUser(params.jwt)
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center bg-black">
    {res === "userNotExist" ? (
      <p className="text-red-500 text-2xl">The user does not exist</p>
    ) : res === "alreadyActivated" ? (
      <p className="text-red-500 text-2xl">The user is already activated</p>
    ) : res === "success" ? (
      <p className="text-green-500 text-2xl">
        Success! The user is now activated
      </p>
    ) : (
      <p className="text-yellow-500 text-2xl">Oops! Something went wrong!</p>
    )}
  </div>
  )
}

export default ActivationPage