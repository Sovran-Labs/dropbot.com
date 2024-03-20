import { HoudiniSupportedToken } from "./HoudiniSupportedToken";

export type ConfigureGeneralHoudiniInputs = {
  templateId: string;
  // tokenA: HoudiniSupportedToken;
  // tokenB: HoudiniSupportedToken;
  tokenA: string;
  tokenB: string;
  tokenAAmount: string;
  tokenBAmount: string;
  obfuscatedAddress: string;
  receiverAddress: string;
};
