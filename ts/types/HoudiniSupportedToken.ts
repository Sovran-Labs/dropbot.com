export interface HoudiniSupportedToken {
  address: string;
  chain: number;
  color: string;
  displayName: string;
  hasFixed: boolean;
  hasFixedReverse: boolean;
  hasMarkup: boolean;
  icon: string;
  id: string;
  keyword: string;
  name: string;
  network: {
    addressUrl: string;
    addressValidation: string;
    explorerUrl: string;
    icon: string;
    memoNeeded: boolean;
    name: string;
    priority: number;
    shortName: string;
  };
  networkPriority: number;
  priority: number;
  symbol: string;
}
