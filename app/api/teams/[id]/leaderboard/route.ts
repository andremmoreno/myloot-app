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

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to || isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
    return NextResponse.json({ error: "Invalid or missing date range" }, { status: 400 });
  }

  const users = await prisma.user.findMany({
    where: { teamId },
    include: {
      team: {
        select: {
          name: true,
        },
      },
      earnings: {
        where: {
          earnedAt: {
            gte: new Date(from + "T00:00:00.000Z"),
            lte: new Date(to + "T23:59:59.999Z"),
          },
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