import React, { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import orderService from '../../../../services/api/admin/orderService';
import { useSelector } from 'react-redux';
import Scroll from '../../Animation/Scroll';
Chart.defaults.scale.grid.display = false;
const styles = {
    douChart:
        "w-full flex items-center justify-center p-[1rem] shadow-lg sm:w-[30%]",
}
const DouChart = (props) => {
    const orders = useSelector(state => state.rootReducer.order.orderList)
    const [dataDou, setDataDou] = useState({
        labels: ["Approved", "Reject", "Pending"],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: ["#76FF03", "#F50057", "#FFD600"],
                hoverBackgroundColor: ["#1FAA00", "#D50000", "#FFAB00"],
            },
        ],
    })
    const getOrderStatus = dataDou.labels.map((label) => {
      return orders?.filter((order) => {
        return order?.status == label.toUpperCase();
      }).length;
    })
    useEffect(() => {
      setDataDou({
        ...dataDou,
        datasets: [
            {
                data: getOrderStatus,
                backgroundColor: ["#76FF03", "#F50057", "#FFD600"],
                hoverBackgroundColor: ["#1FAA00", "#D50000", "#FFAB00"],
            }
        ],
      })
    },[orders])
    return (
        <Scroll style={styles.douChart} scroll="translateX(10px)">
            <Doughnut data={dataDou} height="190px" />
        </Scroll>
    );
};

export default DouChart;