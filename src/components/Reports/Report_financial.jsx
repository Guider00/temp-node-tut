import styles from './Report_financial.module.css'
import { API_GET_Invoice } from '../../API/Schema/Invoice/Invoice';
import { API_GET_Receipt } from '../../API/Schema/Receipt/Receipt';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Bar } from 'react-chartjs-2'
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);


export const Data_to_table = (e) => {
    let table = [];
    table = e.map((data) => {
        let _data = data;
        return {
            data: data,
            status: data.status ? data.status : '---',
            list: (data.lists && data.lists[0]) ? data.lists[0] : '---',
            price: (data.lists && data.lists[0] && data.lists[0].price) ? data.lists[0].price : '---',
            vat: (data.lists && data.lists[0] && data.lists[0].vat) ? data.lists[0].vat : '---',
            duedate: data.duedate ? data.duedate : data.duedateinvoice ? data.duedateinvoice : '---',
            monthlybilling: data.monthlybilling ? data.monthlybilling : '---'

        }
    })
    return table
}


export const Report_financial = () => {


    const [DataChart, setDataChart] = useState({
        labels: [],
        datasets: [
            {
                label: 'ยอดรวม',
                data: [12, 19, 3, 15, 1, 9],
                backgroundColor: ' #63e5ac',
            }, {
                label: 'รายรับ',
                data: [6, 11, 10, 20, 6, 19],
                backgroundColor: '#62d2ce',

            }, {
                label: 'จำนวนใบแจ้งหนี้',
                data: [17, 10, 10, 10, 5, 5],
                backgroundColor: '#cf57c1',
            },
            {
                label: 'ยอดค้างชำระ',
                data: [17, 10, 10, 10, 5, 5],
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1
            }
        ]
    })

    const invoice = useQuery(API_GET_Invoice)
    const receipt = useQuery(API_GET_Receipt)


    const [Data, setData] = useState([])

    const [DataReceipt, setDataReceipt] = useState([])
    const [DataInvoice, setDataInvoice] = useState([])

    

    const getMonthName = (month) => {
        let d = new Date
        d.setMonth(month - 1);
        let monthName = d.toLocaleDateString('default', { month: 'long' });
        return monthName

    }
    const ConvertData = (list) => {
        let Data = list.price
        let priceInNumber = parseInt(Data.replace(/,/g, ''), 10);
        let _price = Number(priceInNumber ? (priceInNumber) * 107 / 100 : 0).toFixed(2)
        let _profit = list.status === 'รอการชำระเงิน' ? 0 : Number(priceInNumber ? (priceInNumber) * 107 / 100 : 0).toFixed(2)
        let _amountInvoice = (list.data.Invoice === null || list.data.Invoice) ? 1 : 0
        let _unpaid = list.status === 'รอการชำระเงิน' ? Number(priceInNumber ? (priceInNumber) : 0).toFixed(2) : 0
        let _unpaidAmount = list.status === 'รอการชำระเงิน' ? 1 : 0
       


        return ({ price: _price, profit: _profit, amountInvoice: _amountInvoice, unpaid: _unpaid, unpaidAmount: _unpaidAmount})


    }


    // labels = ["March-2022","February-2022","April-2022","February-2012"]


    const validateTotal = (lists , DataChart) => {
        

        console.log('DataChart',DataChart)

        if((lists && lists.length > 0) && (DataChart && DataChart.labels.length > 0)){
            let _totalprice = 0
            let _profit = 0
            let _amountInvoice = 0
            let _unpaid = 0
            let _unpaidAmount = 0
            lists.map(list =>{
            let date = (new Date(list.duedate));
            let dateM = `${date.getMonth() + 1}`;
            let trueDay = getMonthName(dateM) + -`${date.getFullYear()}`
            
            let i = DataChart.labels.length - 1
            console.log(i)
            for(let e = 0 ; e <= i ; e++){
                if(trueDay === DataChart.labels[e]){
                    _totalprice += (Number(ConvertData(list).price) ? Number(ConvertData(list).price) : 0)
                    _profit += (Number(ConvertData(list).profit) ? Number(ConvertData(list).profit) : 0)
                    _amountInvoice += (Number(ConvertData(list).amountInvoice) ? Number(ConvertData(list).amountInvoice) : 0)
                    _unpaid += (Number(ConvertData(list).unpaid) ? Number(ConvertData(list).unpaid) : 0)
                    _unpaidAmount += (Number(ConvertData(list).unpaidAmount) ? Number(ConvertData(list).unpaidAmount) : 0)
                }
                
            }
            })
            return ({totalprice: Number(_totalprice).toFixed(0), profit: Number(_profit).toFixed(0), 
                amountInvoice: Number(_amountInvoice).toFixed(0), unpaid: Number(_unpaid).toFixed(0), 
                unpaidAmount: Number(_unpaidAmount).toFixed(0)
                    })

        }
         else {
            return ({ totalprice: 0, profit: 0, amountInvoice: 0, invoice: 0, unpaid: 0, unpaidAmount: 0 })
        }
    }


    useEffect(() => {

        if (invoice.data) {
            let _Invoice = Data
            _Invoice = Data_to_table(invoice.data.Invoices)
            setDataInvoice([..._Invoice])
            console.log("2_setData", _Invoice)

        }
        
        if (receipt.data) {
            let _Receipt = Data
            _Receipt = Data_to_table(receipt.data.Receipts)
            setDataReceipt([..._Receipt])
            console.log("1_setData", _Receipt)

        }

    }, [invoice , receipt])


    useEffect(() => {
        if ((DataInvoice.length > 0) && (DataReceipt.length > 0)) {
            console.log('ready to set data')
            setData([...DataInvoice, ...DataReceipt])


        }
    }, [DataInvoice, DataReceipt])



    useEffect(() => {
        if (Data) {
            let _allMonth = [...new Set(Data.map((item) => {
                let date = new Date(item.duedate);
                let dateM = `${date.getMonth() + 1}`;
                return getMonthName(dateM) + -`${date.getFullYear()}`

            }))]
            let _DataChart = JSON.parse(JSON.stringify(DataChart))
            _DataChart.labels = _allMonth
            setDataChart(_DataChart)
        }
    }, [Data])






    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>

                    <div className={styles.header}>
                        <h2>Financial report</h2>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.profit}>
                            <h3 className={styles.headtext}>ยอดรวม</h3>
                            <div className={styles.result}>
                                <h1>{validateTotal(Data , DataChart).totalprice}</h1>
                            </div>
                            <div className={styles.detail}>
                                <lable>{console.log('DataChart', DataChart)}</lable>
                                <br />
                                <lable>vs. previous period</lable>
                            </div>

                        </div>
                        <div className={styles.incomes}>
                            <h3 className={styles.headtext}>รายรับ</h3>
                            <div className={styles.result}>
                                <h1>{validateTotal(Data  , DataChart).profit}</h1>
                            </div>
                            <div className={styles.detail}>
                                <lable>90%</lable>
                                <br />
                                <lable>vs. previous period</lable>
                            </div>

                        </div>
                        <div className={styles.expenses}>
                            <h3 className={styles.headtext}>จำนวนใบแจ้งหนี้</h3>
                            <div className={styles.result}>
                                <h1>{validateTotal(Data  , DataChart).amountInvoice}</h1>
                            </div>
                            <div className={styles.detail}>
                                <lable>90%</lable>
                                <br />
                                <lable>vs. previous period</lable>
                            </div>

                        </div>
                        <div className={styles.wageExpenses}>
                            <h3 className={styles.headtext}>ยอดค้างชำระ</h3>
                            <div className={styles.result}>
                                <h1>{validateTotal(Data  , DataChart).unpaid}</h1>
                            </div>
                            <div className={styles.detail}>
                                <lable>{validateTotal(Data  , DataChart).unpaidAmount}</lable>
                                <br />
                                <lable>vs. previous period</lable>
                            </div>

                        </div>
                    </div>
                    <div className={styles.footer}>
                        <Bar
                            className={styles.Bar}
                            data={DataChart}
                            height={100}
                            width={100}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />


                    </div>

                </div>

            </div>
        </>
    )
}