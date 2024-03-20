import { Protocols } from "@/ts/enums/Protocols";
import Image from "next/image";

export function protocolToImg(p: string):
  | {
      path: string;
      alt: string;
    }
  | false {
  switch (p) {
    case Protocols.Houdini:
      return {
        path: "/logos/protocols/houdini.png",
        alt: "Houdini logo",
      };
    case Protocols.Orbiter:
      return {
        path: "/logos/protocols/orbiter.png",
        alt: "Orbiter logo",
      };

    case Protocols.SyncSwap:
      return {
        path: "/logos/protocols/syncswap.png",
        alt: "Orbiter logo",
      };

    case Protocols.UniswapV3:
      return {
        path: "/logos/protocols/uniswap_v3.png",
        alt: "Uniswap V3 logo",
      };

    default:
      return false;
  }
}
