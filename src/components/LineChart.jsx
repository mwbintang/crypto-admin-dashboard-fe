import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // important for mobile
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col items-center w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Transactions per Day
      </h2>
      {/* Give a fixed height so Chart.js can render */}
      <div className="w-full h-64 sm:h-72 md:h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
