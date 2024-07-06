import prisma from "@/app/utils/connect";
import { NextResponse, NextRequest } from "next/server";


  export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json();
      const product = await prisma.product.create({
        data: body,
      });
      return new NextResponse(JSON.stringify(product), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  };