"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/dashboard/button.client";
import Card from "@/components/dashboard/card.client";
import CardTitle from "@/components/dashboard/card-title.client";
import CardContent from "@/components/dashboard/card-content";
import CardHeader from "@/components/dashboard/card-header.client";
import { getTxns } from "@/services/getTxns";
import { getGasFees } from "@/services/getGasFees";
import { getTxnCount } from "@/services/getTxnCount";
import { getUSDTransactionVolume } from "@/services/getUSDTxnVolume";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Flow } from "@/ts/types/Flow";
import { clearFlowActionLog } from "@/services/flows/clearFlowActionLog";
import { startFlow } from "@/services/flows/startFlow";
import { deleteFlow } from "@/services/flows/deleteFlow";
import { useRouter } from "next/navigation";
import { errorReporter } from "@/utils/errorReporter";
import { getFlow } from "@/services/flows/getFlow";
import JsonView from "react18-json-view";
import { StatsGroup3 } from "@/components/dashboard/stats/statsGroup3";

let initialStats = [
  {
    id: 1,
    name: "Txn Count",
    stat: "0",
    change: "0",
    changeType: "increase",
  },
  {
    id: 2,
    name: "USD Txn Volume",
    stat: "0",
    change: "0",
    changeType: "increase",
  },
  // {
  // 	id: 3,
  // 	name: 'Gas Used (USD)',
  // 	stat: '0',
  // 	change: '0%',
  // 	changeType: ''
  // }
];

const columnHelper = createColumnHelper<Flow>();

const columns = [
  columnHelper.accessor("template.id", {
    header: () => "ID",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("description", {
    cell: (info) =>
      info.getValue()
        ? `${info.getValue()?.substring(0, 20)}...`
        : "No description",
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.createdAt, {
    id: "createdAt",
    cell: (info) => <i>{new Date(info.getValue()).toLocaleDateString()}</i>,
    header: () => <span>Created</span>,
    footer: (info) => info.column.id,
  }),
];

export default function View_7dDashboard({ params }: { params: any }) {
  const FLOW_ID = params.flowId;
  const [txns, setTxns] = useState([]);
  const [startFlowRequest, setStartFlowRequest] = useState<{
    l: boolean;
    e: Error | null;
  }>({
    l: false,
    e: null,
  });
  const [flow, setFlow] = useState<{
    v: any;
    l: boolean;
    e: any;
  }>({
    v: null,
    l: true,
    e: null,
  });
  const [stats, setStats] = useState(initialStats);
  // const [gas, setGas] = useState([]);
  // const [txnUsdVolume, setTxnUsdVolume] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      try {
        const resp = await getFlow(FLOW_ID);
        const { flow } = await resp.json();
        setFlow({
          v: flow,
          l: false,
          e: null,
        });
      } catch (e) {
        errorReporter("Error fetching flow", true);
        setFlow({
          v: null,
          l: false,
          e: e,
        });
      }
    }

    fetch();
  }, []);

  // useEffect(() => {
  // 	console.log('txns');
  // 	const intervalId = setInterval(async () => {
  // 		// const resp = await getTxns(FLOW_ID);
  // 		const resp = await getTxns(FLOW_ID);
  // 		const txns = await resp.json();
  // 		console.log('txns: ', txns);
  // 		setTxns(txns);
  // 	}, 2500);
  // 	return () => {
  // 		clearInterval(intervalId);
  // 	};
  // }, []);

  // useEffect(() => {
  //   console.log("gas fees");
  //   const intervalId = setInterval(async () => {
  //     const resp = await getGasFees(FLOW_ID);
  //     const gasfees = await resp.json();
  //     const gasFeesTotal = gasfees[0]?.totalGasFees;
  //     console.log("gasFeesTotal: ", gasFeesTotal);
  //     setGas(gasFeesTotal);
  //   }, 2500);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  useEffect(() => {
    console.log("txn count...");
    const intervalId = setInterval(async () => {
      const resp = await getTxnCount(FLOW_ID);
      const txnCount = await resp.json();
      console.log("txnCount: ", txnCount);

      const txnCountTotal = txnCount[0]?.txnLogCount;
      console.log("txnCountTotal: ", txnCountTotal);
      stats[0].stat = txnCountTotal;
      setStats([...stats]);
      // setTxnCount(txnCountTotal);
    }, 2500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log("USD Transaction Volume");
    const intervalId = setInterval(async () => {
      const resp = await getUSDTransactionVolume(FLOW_ID);
      const respJson = await resp.json();
      const usdTransactionVolume = respJson;
      console.log("usdTransactionVolume: ", usdTransactionVolume);
      stats[1].stat = usdTransactionVolume;
      setStats([...stats]);
    }, 2500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function onStartFlow() {
    try {
      setStartFlowRequest({
        l: true,
        e: null,
      });
      await startFlow(FLOW_ID);
      await new Promise((r) => setTimeout(r, 1000));
      setStartFlowRequest({
        l: false,
        e: null,
      });
    } catch (e) {
      setStartFlowRequest({
        ...startFlowRequest,
        l: false,
        e: e as Error,
      });
    }
  }

  return (
    <main className="flex flex-col flex-1 min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10">
      <div className="flex flex-col gap-8">
        <StatsGroup3 title={"Cycle Statistics"} timeFrame={""} stats={stats} />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex space-x-4">
          <Button
            className="bg-green-500 text-2xl font-bold"
            variant="solid"
            onClick={onStartFlow}
            bgColor="#28a745"
          >
            {startFlowRequest.l ? "Start Flow 🚀" : "Start Flow"}
          </Button>
          <Button
            className="bg-red-500 text-2xl font-bold"
            variant="solid"
            onClick={async () => {
              try {
                await deleteFlow(FLOW_ID);
                router.push("/admin/flows");
              } catch (e) {
                errorReporter("Error deleting flow", true);
              }
            }}
            bgColor="#dc3545"
          >
            Delete Flow <span></span>
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button
            className="text-2xl font-bold"
            variant="solid"
            onClick={() => {
              window.open(process.env.NEXT_PUBLIC_TEMPORAL_URL);
            }}
          >
            View Temporal
          </Button>
        </div>
      </div>
      <div>{flow.v && <p>Template Id: {flow.v?.template?.id}</p>}</div>
      <div>{flow.v && <p>Flow Description: {flow.v?.description}</p>}</div>
      {flow?.v?.state?.inputs && (
        <>
          <h3>Inputs</h3>
          <JsonView src={flow?.v?.state?.inputs} />
        </>
      )}
    </main>
  );
}
