import prisma from "@/app/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// FETCH ORDERS
export const GET = async (req:NextRequest) => {
    const session = await getServerSession(authOptions);

    if(session) {
        try {
            if (session.user.isAdmin) {
                const orders = await prisma.order.findMany();
                return new NextResponse(JSON.stringify(orders), {status: 200});
            }
            const orders = await prisma.order.findMany({
                where: {
                    userEmail: session.user.email!,
                },
            });
            return new NextResponse(JSON.stringify(orders), {status: 200});
        } catch(err) {
            console.log(err);
            return new NextResponse(JSON.stringify({message: "Something went wrong!"}), {status: 500});
        }
    } else {
        return new NextResponse(JSON.stringify({message: "Please sign in."}), {status: 401});
    }
}

//CREATE ORDER