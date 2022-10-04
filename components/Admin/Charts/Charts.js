import React from 'react';
import LineChart from './LineChart/LineChart';
import DouChart from './DouChart/DouChart';
import Overview from './Overview/Overview';
import PieChart from './PieChart/PieChart';

const styles = {
    content: "w-full flex gap-4 flex-wrap",
}

const Charts = (props) => {
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