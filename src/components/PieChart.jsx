import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Transaction Type Distribution</h2>
      <div className="w-80 h-80">
        <Pie data={data} options={pieOptions} />
      </div>
    </div>
  );
};

export default PieChart;
