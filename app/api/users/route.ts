import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { name, teamId } = await req.json();
  const user = await prisma.user.create({ data: { name, teamId } });
  return NextResponse.json(user);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const user = await prisma.user.delete({ where: { id } });
  return NextResponse.json(user);
}