import React, { useRef } from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const options: Highcharts.Options = {
  chart: {
    type: "pie",
    backgroundColor: "#101827",
    borderRadius: 10,
  },
  title: {
    text: "USD volume per blockchain (30 days)",
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
          y: 4140.23,
        },
        {
          name: "Arbitrum",
          y: 1420.12,
        },
        {
          name: "Polygon",
          y: 330.14,
        },
      ],
      tooltip: {
        pointFormat: "{series.name}: <b>${point.y:.2f}</b>",
      },
    },
  ],
  credits: {
    enabled: false,
  },
};

export const HighChart3 = (props: HighchartsReact.Props) => {
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
