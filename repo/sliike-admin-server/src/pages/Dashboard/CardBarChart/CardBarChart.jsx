import React from "react";
import PeriodicBarChart from "./PeriodicBarChart";
import "./CardBarChart.scss";
import RegisteredBarChart from "./RegisteredBarChart";
import FinancialBarChart from "./FinancialBarChart";
import ActiveInactiveClient from "./ActiveInactiveClients";
import ActiveInactiveBeauticians from "./ActiveInactiveBeauticians";

const CardBarChart = () => {
  return (
    <div id="bar-chart-container">
      <PeriodicBarChart />
      <RegisteredBarChart />
      <FinancialBarChart />
      <ActiveInactiveClient />
      <ActiveInactiveBeauticians />
    </div>
  );
};

export default CardBarChart;
