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
  Filler,
  ChartOptions as ChartJSOptions,
} from 'chart.js';
import { ChartProps } from '../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function formatTimestamp(timestamp: number, history: string): string {
  const date = new Date(timestamp);
  
  if (history === 'minute') {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  } else if (history === 'hour') {
    return date.toLocaleString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  } else {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  }
}

function Chart({ times, values, history }: ChartProps): JSX.Element {
  const formattedLabels = times.map(time => formatTimestamp(time, history));
  
  const data = {
    labels: formattedLabels,
    datasets: [
      {
        label: history,
        data: values,
        backgroundColor: 'rgba(74, 63, 105, 0.6)',
        borderColor: 'rgba(74, 63, 105, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options: ChartJSOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#999',
        },
        grid: {
          color: '#333',
        },
      },
      x: {
        display: true,
        ticks: {
          color: '#999',
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            size: 11,
          },
        },
        grid: {
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            return formatTimestamp(times[index], history);
          },
        },
      },
    },
  };

  return <Line data={data} options={options} id="coinChart" />;
}

export default Chart;
