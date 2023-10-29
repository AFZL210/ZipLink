import React from 'react';
import { IDate } from '@/lib/types/types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const LineChart = ({ dates, filter }: { dates: IDate[], filter: string }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
            },
        },
    };

    const labels = dates.map((date) => { return date.date.split('T')[0] });

    const data = {
        labels,
        datasets: [
            {
                label: `${filter}`,
                data: dates.map((date) => { return date.clicks }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(37,99,235, 0.5)',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}

export default LineChart;
