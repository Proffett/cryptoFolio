import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartProps, ChartData, ChartOptions } from '../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart({ times, values, history }: ChartProps): JSX.Element {
  const data: ChartData = {
    labels: times,
    datasets: [
      {
        label: history,
        data: values,
        backgroundColor: ['rgba(74, 63, 105, 0.6)'],
        borderColor: ['rgba(74, 63, 105, 1)'],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} id="coinChart" width="400" height="400" />;
}

export default Chart;
