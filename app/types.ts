// Central types for MyLoot App

export interface CoinEarning {
  id: number;
  userId: number;
  amount: number;
  earnedAt: string;
}

export interface User {
  id: number;
  name: string;
  teamId: number;
  earnings: CoinEarning[];
}

export interface Team {
  id: number;
  name: string;
}

export interface Member {
  userId: number;
  name: string;
  coins: number;
  percentage?: number;
}

export interface TeamStatsData {
  teamId: number;
  teamName: string;
  totalCoins: number;
  members: Member[];
} 