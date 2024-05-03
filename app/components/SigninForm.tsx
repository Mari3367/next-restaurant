"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";


const SigninForm = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prev) => !prev);
  return (
    <form className="dark flex flex-col gap-2 sm:w-[50%] lg:w-[30%]">
        <Input label="Email" type="email"/>
        <Input
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