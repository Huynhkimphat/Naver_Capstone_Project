import React from 'react';
import {Doughnut} from "react-chartjs-2";
import Chart from "chart.js/auto";
Chart.defaults.scale.grid.display = false;
const styles = {
    douChart:
        "w-full flex items-center justify-start p-[1rem] shadow-lg sm:w-[30%]",
}
const dataDou = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
        {
            data: [35, 35, 30],
            backgroundColor: ["#76FF03", "#F50057"  ,"#FFD600"],
            hoverBackgroundColor: ["#1FAA00", "#D50000", "#FFAB00"],
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