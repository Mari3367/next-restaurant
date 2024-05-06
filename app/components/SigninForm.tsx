"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;


const SigninForm = (props:Props) => {

  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

// Password visibility
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((prev) => !prev);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if(!result?.ok) {
      toast.error(result?.error);
      return;
    }

    toast.success("Welcome To Rasta Pasta Restaurant!");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  }

  return (
    <form className="dark flex flex-col gap-2 sm:w-[50%] lg:w-[30%]" onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email")} label="Email" type="email" errorMessage={errors.email?.message}/>
        <Input
        {...register("password")}
        errorMessage={errors.password?.message}
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
        <Button color="success" type="submit">Sign in</Button>
    </form>
  )
}

export default SigninForm