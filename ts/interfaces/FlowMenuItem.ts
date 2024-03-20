import { Blockchains } from "@/ts/enums/Blockchains";
import { FlowMode } from "@/ts/enums/FlowModes";
import { Protocols } from "@/ts/enums/Protocols";
import { Tokens } from "@/ts/enums/Tokens";

export interface FlowMenuItem {
  id: string;
  name: string;
  mode: FlowMode;
  description: string;
  detailedDescription?: string;
  blockchains: Blockchains[];
  protocols: Protocols[];
  tokens: Tokens[];
  isLive: boolean;
  chooseFlowRoute?: string;
}
