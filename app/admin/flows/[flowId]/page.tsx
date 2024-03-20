"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/dashboard/button.client";

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
import { WindowLoader } from "@/components/shared/WindowLoader";

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

export default function FlowDashboard({ params }: { params: any }) {
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
  const [txnCount, setTxnCount] = useState([]);
  const [gas, setGas] = useState([]);
  const [txnUsdVolume, setTxnUsdVolume] = useState([]);

  const router = useRouter();

  const onStartFlow = async () => {
    try {
      console.log("starting flow...");
      setStartFlowRequest({
        l: true,
        e: null,
      });
      startFlow(FLOW_ID);
      await new Promise((r) => setTimeout(r, 1000));
      setStartFlowRequest({
        l: false,
        e: null,
      });
    } catch (e) {
      setStartFlowRequest({
        l: false,
        e: e as Error,
      });
    }
  };

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

  let tsx = null;

  if (flow.l) {
    tsx = <WindowLoader />;
  } else if (flow.v) {
    tsx = (
      <main className="flex flex-col flex-1 min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10">
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
        <div>
          {params.flowId && (
            <p>
              <b>Id:</b> {params?.flowId}
            </p>
          )}
        </div>
        <div>
          {flow.v && (
            <p>
              <b>Template:</b> {flow?.v?.template?.id}
            </p>
          )}
        </div>
        <div>
          {flow.v && (
            <p>
              <b>Description:</b> {flow?.v?.description}
            </p>
          )}
        </div>
        {flow?.v?.state?.inputs && (
          <>
            <h3>
              <b>Inputs</b> ⬇️
            </h3>
            <JsonView collapsed={true} src={flow?.v?.state?.inputs} />
          </>
        )}
      </main>
    );
  } else {
    tsx = <div>Unknown error</div>;
  }

  return tsx;
}
