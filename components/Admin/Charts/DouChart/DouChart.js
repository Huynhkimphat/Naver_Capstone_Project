import React from 'react';
import {Doughnut} from "react-chartjs-2";
import Chart from "chart.js/auto";
Chart.defaults.scale.grid.display = false;
const styles = {
    douChart:
        "w-full flex items-center justify-start p-[1rem] shadow-lg sm:w-[30%]",
}
const dataDou = {
    labels: ["Current Customers", "New Customers", "Target Customers"],
    datasets: [
        {
            data: [35, 35, 30],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        },
    ],
};
const DouChart = (props) => {
    return (
        <div className={styles.douChart}>
            <Doughnut data={dataDou} height="190px" />
        </div>
    );
};

export default DouChart;