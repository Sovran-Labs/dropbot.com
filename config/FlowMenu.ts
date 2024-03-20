import { Blockchains } from "@/ts/enums/Blockchains";
import { FlowMode } from "@/ts/enums/FlowModes";
import { Protocols } from "@/ts/enums/Protocols";
import { Tokens } from "@/ts/enums/Tokens";
import { FlowMenuItem } from "@/ts/interfaces/FlowMenuItem";

export const FlowMenu: FlowMenuItem[] = [
  {
    id: "1",
    name: "Flow 1",
    mode: FlowMode.TESTNET,
    description: "Implements a simple wrap/unwrap flow on Polygon Mumbai.",
    detailedDescription:
      "This flow selects a random amount of wei (between 100,000,000 and 200,000,000) and wraps it to WMATIC. It then unwraps the WMATIC back to MATIC.",
    protocols: [],
    blockchains: [Blockchains.POLYGON],
    tokens: [Tokens.Polygon_WMATIC],
    isLive: true,
    chooseFlowRoute: "/admin/flowsMenu/chooseFlow/1?templateId=1",
  },
  {
    id: "7c",
    name: "7c",
    mode: FlowMode.TESTNET,
    description:
      "Perform a fully customizable swap on zkSync Göerli's SyncSwap protocol.",
    protocols: [Protocols.SyncSwap],
    blockchains: [Blockchains.ZKSYNC_SEPOLIA_TESTNET],
    tokens: [],
    isLive: true,
    chooseFlowRoute: "/admin/flowsMenu/chooseFlow/7c?templateId=7c",
  },
  {
    id: "7d",
    name: "7d",
    mode: FlowMode.MAINNET,
    description:
      "Perform a customizable swap on zkSync Mainnet's SyncSwap protocol.",
    protocols: [Protocols.SyncSwap],
    blockchains: [Blockchains.ZKSYNC],
    tokens: [],
    isLive: true,
    chooseFlowRoute: "/admin/flowsMenu/chooseFlow/7d?templateId=7d",
  },
  {
    id: "houdini",
    name: "HoudiniSwap",
    mode: FlowMode.MAINNET,
    description: "Perform an obfuscated bridge on HoudiniSwap's protocol.",
    protocols: [Protocols.Houdini],
    blockchains: [],
    tokens: [],
    isLive: true,
    chooseFlowRoute: "/admin/flowsMenu/chooseFlow/houdini?templateId=houdini",
  },
  {
    id: "orbiter",
    name: "Orbiter",
    mode: FlowMode.MAINNET,
    description: "Perform a bridge using Orbiter.",
    protocols: [Protocols.Orbiter],
    blockchains: [],
    tokens: [],
    isLive: true,
    chooseFlowRoute: "/admin/flowsMenu/chooseFlow/orbiter?templateId=orbiter",
  },
];
