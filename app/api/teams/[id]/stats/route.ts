import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const teamId = parseInt(params.id);

  if (isNaN(teamId)) {
    return NextResponse.json({ error: "Invalid team ID" }, { status: 400 });
  }

  const users = await prisma.user.findMany({
    where: { teamId },
    include: {
      earnings: true,
      team: {
        select: {
          name: true,
        },
      },
    },
  });

  if (users.length === 0) {
    return NextResponse.json({
      teamId,
      teamName: users[0].team.name,
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
    teamName: users[0].team.name,
    totalCoins,
    members: enriched,
  });
}
