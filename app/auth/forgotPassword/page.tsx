"use client";
import React from 'react';
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@nextui-org/react';

const FormSchema = z.object({
    email: z.string().email("Please enter a valid email!")
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
    const {register, handleSubmit, reset, formState: { errors, isSubmitting },} = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    const submitRequest:SubmitHandler<InputType> = async (data) => {
        //forgotpass server action
    }

  return (
    <div className="h-screen bg-black flex justify-center">
        <form className="dark flex flex-col gap-2 sm:w-[50%] lg:w-[30%] mt-10" 
        onSubmit={handleSubmit(submitRequest)}
        >
        <div className="text-white text-center">Enter Your Email</div>
        <Input
          label="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
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

export default ForgotPasswordPage