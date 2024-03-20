import styles from "./HighChart2.module.css";

import React, { useRef } from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const options: Highcharts.Options = {
  chart: {
    backgroundColor: "#101827",
    borderRadius: 10,
  },
  title: {
    text: "Txns per blockchain (30 days)",
    style: {
      color: "white",
    },
  },
  series: [
    {
      type: "pie",
      data: [
        {
          name: "zkSync",
          y: 120,
        },
        {
          name: "Arbitrum",
          y: 42,
        },
        {
          name: "Polygon",
          y: 33,
        },
      ],
    },
  ],
  credits: {
    enabled: false,
  },
};

export const HighChart2 = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
