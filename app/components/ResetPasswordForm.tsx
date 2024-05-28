"use client";
import React from 'react';
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { resetPassword } from "../utils/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";




interface Props {
    jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(52, "Password must be less than 52 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

  type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({jwtUserId}:Props) => {
    const router = useRouter();

    const {register, handleSubmit, reset, formState:{ errors, isSubmitting }, } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    // Password visibility
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => setVisible((prev) => !prev);

    const resetPass:SubmitHandler<InputType> = async (data) => {
        try {
            const result = await resetPassword(jwtUserId, data.password);
            if (result === "success")
              toast.success("Your password has been reset successfully!");
              router.push("/")
          } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
          }
    }

  return (
    <div className="flex justify-center">
        <form onSubmit={handleSubmit(resetPass)} className="dark flex flex-col gap-2 sm:w-[50%] lg:w-[30%] pt-10">
            <h2 className="text-white text-center text-xl">Reset Your Password</h2>
            <Input
            label="Password"
            {...register("password")}
            errorMessage={errors.password?.message}
            type={visible ? "text" : "password"}
            endContent={
            visible ? (
                  <EyeSlashIcon
                  className="w-4 cursor-pointer"
                  onClick={toggleVisible}
                  />
                ) : (
                  <EyeIcon
                  className="w-4 cursor-pointer"
                  onClick={toggleVisible}
                  />
                )
            }
            />
            <Input
            label="Confirm Password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            type={visible ? "text" : "password"}
            endContent={
            visible ? (
                  <EyeSlashIcon
                  className="w-4 cursor-pointer"
                  onClick={toggleVisible}
                  />
                ) : (
                  <EyeIcon
                  className="w-4 cursor-pointer"
                  onClick={toggleVisible}
                  />
                )
            }
            />
            <Button
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
            color="success"
            >
              {isSubmitting ? "Please Wait..." : "Submit"}
            </Button>
        </form>
    </div>
  )
}

export default ResetPasswordForm