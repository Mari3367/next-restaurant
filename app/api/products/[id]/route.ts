import prisma from "@/app/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";


// DELETE SINGLE PRODUCT

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (session?.user.isAdmin) {
      try {
        await prisma.product.delete({
          where: {
            id: id,
          },
        });

        return new NextResponse(JSON.stringify("Product has been deleted!"), {
          status: 200,
        });
      } catch (err) {
        console.log(err);
        return new NextResponse(
          JSON.stringify({ message: "Something went wrong!" }),
          { status: 500 }
        );
      }
    }
    return new NextResponse(JSON.stringify({ message: "You are not allowed!" }), {
      status: 403,
    });
  };
