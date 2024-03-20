"use client";

import { HighChart2 } from "@/components/dashboard/charts/HighChart2";
import { HighChart3 } from "@/components/dashboard/charts/HighChart3";
import { StatsGroup3 } from "@/components/dashboard/stats/statsGroup3";

const stats1 = [
  {
    id: 1,
    name: "Wallet accounts",
    stat: "71",
    change: "5",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Accumulated balances",
    stat: "$5,002.32 USD",
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Wallets",
    stat: "1",
    change: "0%",
    changeType: "",
  },
];

const stats2 = [
  {
    id: 1,
    name: "Flows executed",
    stat: "71",
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Flows failed",
    stat: "9.67%",
    change: "5.4%",
    changeType: "decrease",
  },
  {
    id: 3,
    name: "Active flows",
    stat: "24",
    change: "3.2%",
    changeType: "increase",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 mb-4">
      <StatsGroup3 title={"Wallets"} timeFrame={"7 days"} stats={stats1} />
      <StatsGroup3
        title={"Bot Activity"}
        timeFrame={"30 days"}
        stats={stats2}
      />
      {/* <HighChart1 /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <HighChart2 />
        <HighChart3 />
      </div>
    </div>
  );
}
