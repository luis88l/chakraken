import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJs,
  ChartData,
  ChartOptions,
  TimeScale, // Import timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { FC } from "react";
ChartJs.register(
  TimeScale, // Register timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface LineProps {
  options?: ChartOptions<"line">;
  data: ChartData<"line">;
}

const KLineChart: FC<LineProps> = ({ data, options }) => {
  return <Chart type="line" data={data} options={options} />;
};

export default KLineChart;
