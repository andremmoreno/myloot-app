import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const coinEarnings = await prisma.coinEarning.findMany();
  return NextResponse.json(coinEarnings);
}

export async function POST(req: Request) {
  const { userId, amount } = await req.json();
  const coinEarnings = await prisma.coinEarning.create({ data: { userId, amount } });
  return NextResponse.json(coinEarnings);
}