import { Blockchains } from "@/ts/enums/Blockchains";
import Image from "next/image";

export function blockchainToImg(b: string):
  | {
      path: string;
      alt: string;
    }
  | false {
  switch (b) {
    case Blockchains.POLYGON:
      return {
        path: "/logos/blockchains/polygon.png",
        alt: "Polygon logo",
      };
    case Blockchains.POLYGON_MUMBAI:
      return {
        path: "/logos/blockchains/polygon.png",
        alt: "Polygon logo",
      };
    case Blockchains.ZKSYNC:
      return {
        path: "/logos/blockchains/zkSync.png",
        alt: "zkSync logo",
      };
    case Blockchains.ZKSYNC_SEPOLIA_TESTNET:
      return {
        path: "/logos/blockchains/goerli.png",
        alt: "zkSync Goerli logo",
      };
    case Blockchains.ARBITRUM_ONE:
      return {
        path: "/logos/blockchains/arbitrum.png",
        alt: "Arbitrum One",
      };
    default:
      return false;
  }
}
