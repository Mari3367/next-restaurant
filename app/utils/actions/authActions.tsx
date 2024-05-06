"use server";

import {User} from "@prisma/client";
import prisma from "../connect";
import * as bcrypt from "bcrypt";


export const registerUser = async (user: Omit<User, "id" | "emailVerified" | "image" | "isAdmin">) => {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        },
    });
}