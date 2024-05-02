import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/utils/connect";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials?.email,
                    }
                });

                if(!user) throw new Error("Email or password is not correct");

                if(!credentials?.password) throw new Error("Please Enter Your Password");

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if(!isPasswordCorrect) throw new Error("Email or password is not correct");

                const {password, ...userWithoutPassword} = user;
                return userWithoutPassword;
            }
        }),
    ],
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};