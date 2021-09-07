import React from 'react';
import { Line } from 'react-chartjs-2';

// eslint-disable-next-line react/prop-types
const Chart = ({ times, values, history }) => {
  const data = {
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
  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} id="coinChart" width="400" height="400" />;
};

export default Chart;
