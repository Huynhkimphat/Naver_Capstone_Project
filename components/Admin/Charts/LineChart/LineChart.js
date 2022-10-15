import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from 'react-redux';
Chart.defaults.scale.grid.display = false;
const styles = {
    lineChart: "w-full p-4 shadow-lg sm:w-[65%]",
    titleLineChart: "flex w-full justify-between items-center",
    btnLineChart:
        "p-1 bg-[#5842BD] text-white font-medium rounded-md shadow-2xl",
}


const LineChart = (props) => {
    const orders = useSelector(state => state.rootReducer.order.orderList)
    const [dataLine, setDataLine] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
        ],
    })
    const getDataDateOrder = dataLine.labels.map((month, index) => {
        return orders.filter((order) => {
            return order.date.split("/")[1] == index + 1
        }).length;
    })
    const getMonth = () => {
        let newDate = new Date();
        return dataLine.labels.slice(0,newDate.getMonth()+1)
    }
    useEffect(() => {
        setDataLine(
            {
                labels: getMonth(),
                datasets: [
                    {
                        label: "Total Orders",
                        data: getDataDateOrder,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                        lineTension: 0.3,
                    },
                ],
            })
    }, [])
    return (
        <div className={styles.lineChart}>
            <div className={styles.titleLineChart}>
                <h3 className="text-6 font-medium">Total Customer: {"229"}</h3>
                <select className={styles.btnLineChart}>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                </select>
            </div>
            <Line data={dataLine} height="190px" />
        </div>
    );
};

export default LineChart;