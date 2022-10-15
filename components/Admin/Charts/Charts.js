import React, { useEffect } from 'react';
import LineChart from './LineChart/LineChart';
import DouChart from './DouChart/DouChart';
import Overview from './Overview/Overview';
import PieChart from './PieChart/PieChart';
import orderService from '../../../services/api/admin/orderService';
import { useDispatch } from 'react-redux';
import { getOrders } from '../../../redux/actions/orderAction';

const styles = {
    content: "w-full flex gap-4 flex-wrap",
}

const Charts = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      orderService.getOrdersAll().then(res => dispatch(getOrders(res)))
    },[])
    return (
        <div className={styles.content}>
            <LineChart></LineChart>
            <DouChart></DouChart>
            <Overview></Overview>
            <PieChart></PieChart>
        </div>
    );
};

export default Charts;