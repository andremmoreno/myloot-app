import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const teams = await prisma.team.findMany();
  return NextResponse.json(teams);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const team = await prisma.team.create({ data: { name } });
  return NextResponse.json(team);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const team = await prisma.team.delete({ where: { id } });
  return NextResponse.json(team);
}

export async function PUT(req: Request) {
  const { id, name } = await req.json();
  const team = await prisma.team.update({ where: { id }, data: { name } });
  return NextResponse.json(team);
}