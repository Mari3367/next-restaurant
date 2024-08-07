"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { OrderType } from "../types/types";
import { useSession } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const {data:session, status} = useSession();

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch(`/api/orders`).then((res) =>
        res.json(),
      ),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({id, status} : {id:string, status: string}) => {
      return fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey:["orders"]});
    },
  });

   const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault;
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({id, status});
    toast.success("Order status updated successfully!");
   }


   if (isLoading || status === "loading") return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] bg-zinc-900 flex justify-center items-center">
      <p className="text-green-600 text-xl">Loading ...</p>
      </div>
   );

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen lg:h-[calc(100vh-6rem)] bg-zinc-900">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left text-white">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr className={`${item.status !== "delivered" ? "bg-yellow-100" : "bg-green-100"}`} key={item.id}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">{item.createdAt.toString().slice(0, 10)}</td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">{item.products[0].title}</td>
              {session?.user.isAdmin ? (
                <td>
                  <form className="flex gap-4" onSubmit={(e) => handleUpdate(e, item.id)}>
                    <Input placeholder={item.status} className="md:px-4"/>
                    <Button className="sm:mr-4 p-0 min-w-[2rem]" type="submit" color="success" size="sm" fullWidth={false}>
                      <PencilIcon className="size-6 text-green-50 m-0"/>
                    </Button>
                  </form>
                </td>
              )
              : (
                  <td className="py-6 px-1">{item.status}</td>
                )}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;