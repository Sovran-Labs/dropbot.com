import { Tokens } from "@/ts/enums/Tokens";
import Image from "next/image";

export function tokenToImg(b: string):
  | {
      path: string;
      alt: string;
    }
  | false {
  switch (b) {
    case Tokens.Polygon_MATIC:
      return {
        path: "/logos/tokens/matic.png",
        alt: "Polygon MATIC logo",
      };
    case Tokens.Polygon_WMATIC:
      return {
        path: "/logos/tokens/wmatic.png",
        alt: "Polygon WMATIC logo",
      };
    case Tokens.Polygon_WETH:
      return {
        path: "/logos/tokens/weth.png",
        alt: "Polygon WETH",
      };
    case Tokens.zkSync_WETH:
      return {
        path: "/logos/tokens/weth.png",
        alt: "zkSync WETH logo",
      };
    case Tokens.zkSync_ETH:
      return {
        path: "/logos/tokens/eth.png",
        alt: "zkSync ETH logo",
      };

    case Tokens.Arbitrum_ETH:
      return {
        path: "/logos/tokens/eth.png",
        alt: "Arbitrum ETH logo",
      };

    default:
      return false;
  }
}
