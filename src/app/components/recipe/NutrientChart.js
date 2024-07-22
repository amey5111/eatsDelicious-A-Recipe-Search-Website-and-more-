"use client";
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const NutrientChart = ({ data }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sortNutrients = (data) => {
      const sorted = Object.entries(data)
        .sort(([, a], [, b]) => b.quantity - a.quantity)
        .slice(0, 9)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      return sorted;
    };

    const sorted = sortNutrients(data);
    setSortedData(Object.keys(sorted).map(key => ({ name: sorted[key].label, value: sorted[key].quantity })));
  }, [data]);

  const total = sortedData.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = sortedData.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  const chartData = {
    labels: dataWithPercentage.map(item => item.name),
    datasets: [
      {
        data: dataWithPercentage.map(item => item.value),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#4acaa8', '#36A2EB', '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#eb2a51', '#2B82C9', '#E5B63D', '#3DA6A6', '#7A4ECC',
          '#E58526', '#3BAA8C', '#2B82C9', '#E5B63D'
        ]
      }
    ]
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = dataWithPercentage.find(item => item.name === label)?.percentage;
            return `${label}: ${percentage}%`;
          }
        }
      },
      legend: {
        position: 'right',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                const percentage = dataWithPercentage.find(item => item.name === label)?.percentage;

                return {
                  text: `${label}: ${percentage}%`,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                  index: i,
                  fontColor: '#57cfb8', // Adding text color here
                  fontSize: 12 
                };
              });
            }
            return [];
          },
          color: '#57cfb8', // Ensuring the font color is set here
          font: {
            size: 12
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%'
  };

  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default NutrientChart;
