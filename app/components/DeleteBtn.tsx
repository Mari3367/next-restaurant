"use client";
import React from 'react';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const DeleteBtn = ({id}:{id:number}) => {
    const {data:session, status} = useSession();
    const router = useRouter();


    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return;
      }

      const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE",
          });
          if (res.status === 200) {
            router.push("/menu");
            toast("The product has been deleted!");
          } else {
            const data = await res.json();
            toast.error(data.message);
          }
      }

  return (
    <div>
        <Button color="success" className="text-white" onClick={handleDelete}>Delete</Button>
    </div>
  )
}

export default DeleteBtn