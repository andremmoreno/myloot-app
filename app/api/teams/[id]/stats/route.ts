import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params } : { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const teamId = parseInt(id);

  if (isNaN(teamId)) {
    return NextResponse.json({ error: "Invalid team ID" }, { status: 400 });
  }

  const users = await prisma.user.findMany({
    where: { teamId },
    include: {
      earnings: true,
    },
  });

  const teamName = (await prisma.team.findUnique({ where: { id: teamId } }))?.name;

  if (users.length === 0) {
    return NextResponse.json({
      teamId,
      teamName,
      totalCoins: 0,
      members: [],
    });
  }
  
  const members = users.map((user) => {
    const coins = user.earnings.reduce((acc, e) => acc + e.amount, 0);
    return {
      userId: user.id,
      name: user.name,
      coins,
    };
  });

  const totalCoins = members.reduce((acc, m) => acc + m.coins, 0);

  const enriched = members
    .map((m) => ({
      ...m,
      percentage: totalCoins === 0 ? 0 : Math.round((m.coins / totalCoins) * 100),
    }))
    .sort((a, b) => b.coins - a.coins);

  return NextResponse.json({
    teamId,
    teamName,
    totalCoins,
    members: enriched,
  });
}
