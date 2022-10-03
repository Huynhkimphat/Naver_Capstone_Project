import React from 'react';

import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
Chart.defaults.scale.grid.display = false;
const styles = {
    douChart:
        "w-full flex items-center justify-start p-[1rem] shadow-lg sm:w-[30%]",
}
const dataPie = {
    labels: ["Woman", "Man", "Kids"],
    datasets: [
        {
            data: [50, 35, 15],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        },
    ],
};
const PieChart = (props) => {
    return (
        <div className={styles.douChart}>
            <Pie data={dataPie}></Pie>
        </div>
    );
};

export default PieChart;