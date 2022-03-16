import styles from './Report_financial.module.css'
import { API_GET_Invoice } from '../../API/Schema/Invoice/Invoice';
import { API_GET_Receipt } from '../../API/Schema/Receipt/Receipt';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Bar } from 'react-chartjs-2'

import SearchIcon from '@mui/icons-material/Search';
import { Chart, registerables, ArcElement } from "chart.js";
import {
    toYYMM
} from '../../general_functions/convert'
Chart.register(...registerables);
Chart.register(ArcElement);


export const Data_to_table = (e) => {
    let table = [];
    table = e.map((data) => {
        let _data = data;
        console.log(_data)
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


export const Reportfinancial = () => {


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

    const [TotalValue, setTotalValue] = useState([])

    const [Datestartselected,setDatestartselected] = useState(toYYMM( new Date().setFullYear(new Date().getFullYear() - 1)  ))
    const [Dateendselected,setDateendselected] = useState(toYYMM( new Date() ))

    const handleronChangeDatelength  = (datestart,dateend ) =>{
        if(datestart  && dateend ){
           let  timedatestart  =  new Date(datestart)
           let  timedateend  =  new Date(dateend)
            // check not over date end 
           if(timedatestart < timedateend){
                setDatestartselected(datestart)
                setDateendselected(dateend)
           }else{
                    // set notifly Error over lab date 
           }
        }
    }
    const handlersearch = async ()=>{
        if(Datestartselected && Dateendselected)
        {
            console.log('ค้นหา')
            try{
            await  invoice.refetch()
            await receipt.refetch()
           
            }catch(e){
                 console.error('ค้นหาข้อมูล fail ')
            }
        }
    }


    const getMonthName = (month) => {
        let d = new Date()
        d.setMonth(month - 1);
        let monthName = d.toLocaleDateString('default', { month: 'long' });
        return monthName

    }
    const ConvertData = (list) => {
        let Data = list.price
        let priceInNumber = parseInt(Data.replace(/,/g, ''), 10);
        let _price = Number(priceInNumber ? (priceInNumber) * 107 / 100 : 0).toFixed(2)
        let _profit = list.status === 'ชำระเงินแล้ว' ? Number(priceInNumber ? (priceInNumber) * 107 / 100 : 0).toFixed(2) : 0
        let _amountInvoice = (list.data.Invoice === null || list.data.Invoice) || (list.data.Room === null || list.data.Room) ? 1 : 0
        let _unpaidAmount = list.status === 'รอการชำระเงิน' ? 1 : 0



        return ({ price: _price, profit: _profit, amountInvoice: _amountInvoice, unpaidAmount: _unpaidAmount })


    }


    // labels = ["March-2022","February-2022","April-2022","February-2012"]





    useEffect(() => {

        if (invoice.data) {
           
            let _Invoice = []
            _Invoice = Data_to_table(invoice.data.Invoices)
            setDataInvoice([..._Invoice])

        }

        if (receipt.data) {
            let _Receipt  = [] 
            _Receipt = Data_to_table(receipt.data.Receipts)
            setDataReceipt([..._Receipt])

        }

    }, [invoice , invoice.data , receipt ,receipt.data  ])


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

            setDataChart((prevState) => ({
                ...prevState,
                labels:_allMonth
              })); 
        }
    }, [Data])
    useEffect (()=>{
        const validateTotal = (lists, DataChart) => {
            console.log('lists',lists)
    
    
            if ((lists && lists.length > 0) && (DataChart && DataChart.labels.length > 0)) {
                let _totalprice = 0
                let _profit = 0
                let _amountInvoice = 0
                let _unpaid = 0
                let _unpaidAmount = 0
                let data = []
                let data2 = []
                // let y = []
                
    
                lists.map(list => {
                    let date = (new Date(list.duedate));
                    let dateM = `${date.getMonth() + 1}`;
                    let trueDay = getMonthName(dateM) + -`${date.getFullYear()}`
                    let i = DataChart.labels.length
                    
                    for(let e = 0 ; e < i ; e++){
                        if (trueDay === DataChart.labels[e]) {
                            _totalprice += (Number(ConvertData(list).price) ? Number(ConvertData(list).price) : 0)
                            _profit += (Number(ConvertData(list).profit) ? Number(ConvertData(list).profit) : 0)
                            _amountInvoice += (Number(ConvertData(list).amountInvoice) ? Number(ConvertData(list).amountInvoice) : 0)
                            _unpaidAmount += (Number(ConvertData(list).unpaidAmount) ? Number(ConvertData(list).unpaidAmount) : 0)
                            data = [...data,Number(ConvertData(list).price),DataChart.labels[e] ]
                            
                        }
    
                    }
    
                    
                    return null;
                })
    
                _unpaid = _totalprice - _profit
    
    
                    
                return ({
                    data2:data2,data:data,totalprice: Number(_totalprice).toFixed(0), profit: Number(_profit).toFixed(0),
                    amountInvoice: Number(_amountInvoice).toFixed(0), unpaid: Number(_unpaid).toFixed(0),
                    unpaidAmount: Number(_unpaidAmount).toFixed(0)
                })
    
            }
            else {
                return ({ totalprice: 0, profit: 0, amountInvoice: 0, invoice: 0, unpaid: 0, unpaidAmount: 0 })
            }
        }
        if (DataChart.labels.length > 0) {
            let _TotalValue 
            _TotalValue = validateTotal(Data, DataChart)
            setTotalValue(_TotalValue)
            console.log('_DataChart', _TotalValue.data)
            
        }
    },[Data,DataChart])






    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>

                    <div className={styles.header}>
                        <h2>Financial report</h2>
                        <div>
                            <label> เดือนเริ่มต้น </label>
                            <input type="month"   value={Datestartselected}
                                onChange={(e)=>{
                                    if(e && e.target && e.target.value ){
                                    handleronChangeDatelength(e.target.value ,Dateendselected)
                                    }
                                }}
                            />
                            <label> เดือนสิ้นสุด </label>
                            <input type="month"   value={Dateendselected}
                                onChange={(e)=>{
                                    handleronChangeDatelength()
                                    if(e && e.target && e.target.value ){
                                    
                                        setDateendselected( Datestartselected ,e.target.value )
                                    }
                                }}
                            />
                            <button  onClick={ handlersearch }>  <SearchIcon/> ค้นหา </button>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.profit}>
                            <h3 className={styles.headtext}>ยอดรวม</h3>
                            <div className={styles.result}>
                                <h1>{TotalValue.totalprice}</h1>
                            </div>
                            <div className={styles.detail}>
                                <label></label>
                                <br />
                                <label>vs. previous period</label>
                            </div>

                        </div>
                        <div className={styles.incomes}>
                            <h3 className={styles.headtext}>รายรับ</h3>
                            <div className={styles.result}>
                                <h1>{TotalValue.profit}</h1>
                            </div>
                            <div className={styles.detail}>
                                <label>90%</label>
                                <br />
                                <label>vs. previous period</label>
                            </div>

                        </div>
                        <div className={styles.expenses}>
                            <h3 className={styles.headtext}>จำนวนใบแจ้งหนี้</h3>
                            <div className={styles.result}>
                                <h1>{TotalValue.amountInvoice}</h1>
                            </div>
                            <div className={styles.detail}>
                                <label>90%</label>
                                <br />
                                <label>vs. previous period</label>
                            </div>

                        </div>
                        <div className={styles.wageExpenses}>
                            <h3 className={styles.headtext}>ยอดค้างชำระ</h3>
                            <div className={styles.result}>
                                <h1>{TotalValue.unpaid}</h1>
                            </div>
                            <div className={styles.detail}>
                                <label></label>
                                <br />
                                <label>vs. previous period</label>
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