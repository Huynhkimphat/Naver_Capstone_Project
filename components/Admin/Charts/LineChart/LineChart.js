import React from 'react';
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
Chart.defaults.scale.grid.display = false;
const styles = {
    lineChart: "w-full p-4 shadow-lg sm:w-[65%]",
    titleLineChart: "flex w-full justify-between items-center",
    btnLineChart:
        "px-4 py-1 bg-[#5842BD] text-white font-medium rounded-md shadow-2xl",
}

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "August"],
    datasets: [
        {
            label: "Total Orders",
            data: [33, 53, 85, 41, 44, 65, 90, 60],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            lineTension: 0.3,
        },
    ],
};
const LineChart = (props) => {
    return (
        <div className={styles.lineChart}>
            <div className={styles.titleLineChart}>
                <h3 className="text-6 font-medium">Total Customer: {"229"}</h3>
                <button className={styles.btnLineChart}>This Year</button>
            </div>
            <Line data={data} height="190px" />
        </div>
    );
};

export default LineChart;