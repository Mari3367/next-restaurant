import React from 'react';
import ResetPasswordForm from '@/app/components/ResetPasswordForm';
import { verifyJwt } from '@/app/utils/jwt';

interface Props {
    params: {
        jwt:string;
    }
}

const ResetPasswordPage = ({params}:Props) => {
    const payload = verifyJwt(params.jwt);
    if (!payload)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-2xl bg-black">
        The URL is not valid!
      </div>
    );
  return (
    <div className="bg-black h-screen text-green-600">
        <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  )
}

export default ResetPasswordPage