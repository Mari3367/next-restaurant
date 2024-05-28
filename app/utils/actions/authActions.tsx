"use server";

import {User} from "@prisma/client";
import prisma from "../connect";
import * as bcrypt from "bcrypt";
import { compileActivationTemplate, sendMail, compileResetPassTemplate } from "../mail";
import { signJwt, verifyJwt } from "../jwt";

export const registerUser = async (user: Omit<User, "id" | "emailVerified" | "image" | "isAdmin">) => {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        },
    });

    const jwtUserId = signJwt({
        id: result.id,
      });

    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
    const body = compileActivationTemplate(user.name!, activationUrl);
    await sendMail({ to: user.email, subject: "Activate Your Account", body });
    return result;
}

// ACTIVATE USER

type ActivateUserFunc = (
    jwtUserId: string
  ) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
    const payload = verifyJwt(jwtUserID);
    const userId = payload?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return "userNotExist";
    if (user.emailVerified) return "alreadyActivated";
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    return "success";
  };

  // FORGOT PASSWORD

  export async function forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("The User Does Not Exist!");

    // Send Email with Reset Password Link
    const jwtUserId = signJwt({
      id: user.id,
    });
    const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPassword/${jwtUserId}`;
    const body = compileResetPassTemplate(user.name!, resetPassUrl);
    const sendResult = await sendMail({
      to: user.email,
      subject: "Reset Password",
      body: body,
    });
    return sendResult;
  }

  // RESET PASSWORD

  type ResetPasswordFucn = (
    jwtUserId: string,
    password: string
  ) => Promise<"userNotExist" | "success">;

  export const resetPassword: ResetPasswordFucn = async (jwtUserId, password) => {
    const payload = verifyJwt(jwtUserId);
    if (!payload) return "userNotExist";
    const userId = payload.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return "userNotExist";

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await bcrypt.hash(password, 10),
      },
    });
    if (result) return "success";
    else throw new Error("Something went wrong!");
  };