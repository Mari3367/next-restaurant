import prisma from "@/app/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// Change order's status

export const PUT = async (req:NextRequest, {params}: {params: {id:string}}) => {
    const {id} = params;

try {
    const body = await req.json();

    await prisma.order.update({
        where: {
            id: id,
        },
        data: {status: body},
    });
    return new NextResponse(JSON.stringify({message: "Order status updated successfully!"}), {status: 200});
} catch (err){
        console.log(err);
        return new NextResponse(JSON.stringify({message: "Something went wrong!"}), {status: 500});
    }
}