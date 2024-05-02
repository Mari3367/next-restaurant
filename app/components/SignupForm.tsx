"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";

const SignupForm = () => {
  return (
    <form className="dark flex flex-col gap-2 sm:w-[50%] lg:w-[30%]">
        <Input label="Name"/>
        <Input label="Email" type="email"/>
        <Input label="Password" type="password"/>
        <Button color="success" type="submit">Sign up</Button>
    </form>
  )
}

export default SignupForm