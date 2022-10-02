import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import { Line, Doughnut, Pie } from 'react-chartjs-2'
import { FiUser } from 'react-icons/fi'
import { BsBag, BsPrinter, BsCart } from 'react-icons/bs'
import Chart from 'chart.js/auto'
import Product1 from '../../static/Product1.png'
import { list } from 'postcss';
Chart.defaults.scale.grid.display = false;

const styles = {
    wrapper: '',
    titile: ' font-bold text-[#535353] ml-4',
    content: 'w-full flex gap-4 flex-wrap',
    lineChart: 'w-full p-[1rem] shadow-lg sm:w-[65%]',
    titleLineChart: 'flex w-full justify-between items-center',
    btnLineChart: 'px-4 py-1 bg-[#5842BD] text-white font-medium rounded-md shadow-2xl',
    douChart: 'w-full flex items-center justify-start p-[1rem] shadow-lg sm:w-[30%]',
    overView: 'w-full p-[1rem] shadow-lg sm:w-[65%] overflow-hidden sm:h-[300px]',
    ovHeader: 'flex justify-evenly flex-wrap gap-3',
    ovHitem: ' w-[45%] bg-[#EEEEEE] px-2 py-2 rounded-md flex flex-col items-center justify-center gap-1 sm:flex-row sm:w-[20%]',
    topProduct: 'p-4',
    titleTopPD: 'font-medium py-2',
    ProductList: 'w-[100%] flex flex-col gap-1 items-center overflow-scroll h-[8rem] text-[8px] overflow-x-hidden lg:text-sm sm:h-[150px]',
    ProductItem: 'flex w-[98%] justify-between px-2 py-4 mb-1 bg-[#EEEEEE] rounded-md',
    ProductLeft: 'flex gap-4 w-[30%]',
    ProductQuantity: 'flex flex-col w-[80%]',
    ProductRight: 'flex w-[60%] justify-around',
    ProductRightItem: 'flex flex-col items-center',


}
const index = (props) => {
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
        ]
    };

    const options = {
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
    }
    const dataDou = {
        labels: ["Current Customers", "New Customers", "Target Customers"],
        datasets: [
            {
                data: [35, 35, 30],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
            }
        ],
    }
    const dataPie = {
        labels: ["Woman", "Man", "Kids"],
        datasets: [
            {
                data: [50, 35, 15],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
            }
        ],
    }
    const listTopProduct = [1, 2, 3]
    const printTopProduct = () => {
        return listTopProduct.map((element, index) => {
            return <div className={styles.ProductItem}>
                <div className={styles.ProductLeft}>
                    <Image height='50px' width='50px' src={Product1}></Image>
                    <div className={styles.ProductQuantity}>
                        <span>Chair</span>
                        <span>50 orders</span>
                    </div>
                </div>
                <div className={styles.ProductRight}>
                    <div className={styles.ProductRightItem}>
                        <span>Inventory</span>
                        <span>700</span>
                    </div>
                    <div className={styles.ProductRightItem}>
                        <span>Sale</span>
                        <span>$1,000</span>
                    </div>
                    <div className={styles.ProductRightItem}>
                        <span>Prices</span>
                        <span>$1,300</span>
                    </div>
                    <div className={styles.ProductRightItem}>
                        <span>Today</span>
                        <span>$17,800</span>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div className={styles.wrapper}>
            <AdminLayout>
                <h1 className={styles.titile}>Analyst &gt; Overview</h1>
                <div className={styles.content}>
                    <div className={styles.lineChart}>
                        <div className={styles.titleLineChart}>
                            <h3 className='text-6 font-medium'>Total Customer: {'229'}</h3>
                            <button className={styles.btnLineChart}>This Year</button>
                        </div>
                        <Line
                            data={data} options={options} height='190px'
                        />
                    </div>
                    <div className={styles.douChart}>
                        <Doughnut
                            data={dataDou} height='190px'
                        />
                    </div>
                    <div className={styles.overView}>
                        <div className={styles.ovHeader}>
                            <div className={styles.ovHitem}>
                                <FiUser size='2.0rem' color='#FFB402'></FiUser>
                                <div className=' text-[12px]'>
                                    <div>Total Visits</div>
                                    <div className='text-center'>10.8m</div>
                                </div>
                            </div>
                            <div className={styles.ovHitem}>
                                <BsCart size='2.0rem' color='#5F27CD'></BsCart>
                                <div className=' text-[12px]'>
                                    <div>Total Sales</div>
                                    <div className='text-center'>10.8m</div>
                                </div>
                            </div>
                            <div className={styles.ovHitem}>
                                <BsBag size='2.0rem' color='#FF9F43'></BsBag>
                                <div className=' text-[12px]'>
                                    <div>Total Made</div>
                                    <div className='text-center'>10.8m</div>
                                </div>
                            </div>
                            <div className={styles.ovHitem}>
                                <BsPrinter size='2.0rem' color='#FF6B6B'></BsPrinter>
                                <div className=' text-[12px]'>
                                    <div>Completed</div>
                                    <div className='text-center'>10.8m</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.topProduct}>
                            <h2 className={styles.titleTopPD}>Top Products</h2>
                            <div className={styles.ProductList}>
                                {printTopProduct()}
                            </div>
                        </div>
                    </div>
                    <div className={styles.douChart}>
                        <Pie data={dataPie}></Pie>
                    </div>
                </div>

            </AdminLayout>
        </div>
    );
};

export default index;