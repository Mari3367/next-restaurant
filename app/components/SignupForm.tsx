"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import {z} from "zod";
import { useForm, SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/utils/actions/authActions";
import { toast } from "react-toastify";



const FormSchema = z.object({
  name:z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(45, "Name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed!"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm password don't match!",
  path: ["confirmPassword"],
});

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {

  const {register, handleSubmit, formState: { errors }, reset} = useForm<InputType>({
    resolver: zodResolver(FormSchema)
  });

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data)=> {
    const {confirmPassword, ...user} = data;
    try {
      const result = await registerUser(user);
      toast.success("User Registered Successfully.");
      reset()
    } catch(err){
      toast.error("Something Went Wrong!")
      console.error(err);
    }
  }


  return (
    <form onSubmit={handleSubmit(saveUser)} className="dark flex flex-col gap-2 sm:w-[50%] lg:w-[30%]">
        <Input errorMessage={errors.name?.message} isInvalid={!!errors.name} {...register("name")} label="Name" />
        <Input errorMessage={errors.email?.message} isInvalid={!!errors.email} {...register("email")} label="Email" type="email"/>
        <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        label="Password"
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
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        label="Confirm Password"
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
        <Button color="success" type="submit">Sign up</Button>
    </form>
  )
}

export default SignupForm