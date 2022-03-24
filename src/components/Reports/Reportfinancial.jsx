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

    const convert_to_mounth = (now:Date,time:Number)=>{
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
     
       
        let labels_mounth = []
        if(time < 12 ){
            for(let countaa = 0 ; countaa< time; countaa++){
                let  end_ago_mounth  = new Date(now.valueOf())
                end_ago_mounth.setMonth(  end_ago_mounth.getMonth() - Number(countaa)); 
                labels_mounth = [  `${month.at(end_ago_mounth.getMonth()  )}-${end_ago_mounth.getFullYear()}` , ...labels_mounth,]
            }
        }
        console.log('debug labels_mounth',labels_mounth)
        return labels_mounth
   }

    const [DataChart, setDataChart] = useState({
        labels:[], //<< mounth
        datasets: [
            {
                label: 'ยอดรวม',
                data: [1,2,1],
                backgroundColor: ' #63e5ac',
            }, {
                label: 'รายรับ',
                data: [1,1,1],
                backgroundColor: '#62d2ce',

            }, {
                label: 'จำนวนใบแจ้งหนี้',
                data: [1,1,1],
                backgroundColor: '#cf57c1',
            },
            {
                label: 'ยอดค้างชำระ',
                data: [1,1,1],
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1
            }
        ]
    })

    const invoice = useQuery(API_GET_Invoice)
    const receipt = useQuery(API_GET_Receipt)



    const [DataReceipt, setDataReceipt] = useState([])
    const [DataInvoice, setDataInvoice] = useState([])


    const [monthselected , setmonthselected] = useState(new Date())
    const [timelength,settimelength] = useState('1')






    const Number_invoice = (selectedmounth:Date , selectedtime:Number ) =>{
     
      
        
        if(invoice && invoice.data && invoice.data.Invoices &&  invoice.data.Invoices.length){
            let  invoices_unpaid  = [...invoice.data.Invoices]
            if(selectedmounth  !== undefined && selectedtime !== undefined ){
                invoices_unpaid =   invoices_unpaid.filter(item => {
                    let invoices_mounth =  new Date(item.duedateinvoice)
                    let end_mounth =  new Date ( selectedmounth )
                    let _end_mounth =  new Date ( selectedmounth )
                    let end_mounth_ago = new Date ( _end_mounth.setMonth(_end_mounth.getMonth() - selectedtime)  )
                    if(  invoices_mounth.getTime()  <= end_mounth.getTime()  && 
                    invoices_mounth.getTime() >=  end_mounth_ago.getTime()   ){
                           return true;  
                      }else{
                          return false;
                      }
                  })
                return  invoices_unpaid.length
            }else{
                return invoices_unpaid.length
            }

          
        }   
        else{
            return   '---'
        }
    }
    const updatedatachart =( selectedmounth:Date , selectedtime:Number) =>{
        let data_total = []
        let data_incom = []
        let data_number_invoice = []
        let data_unpaid = []

      
        for(let count  =0 ; count < selectedtime ; count++){
            let  _selectedmounth =   new Date(selectedmounth.valueOf())
            data_total = [ invoice_summary('ยอดรวม',_selectedmounth.setMonth(_selectedmounth.getMonth()-count),1) , ...data_total]
        }
        for(let count  =0 ; count <selectedtime ; count++){
            let  _selectedmounth =   new Date(selectedmounth.valueOf())
             data_incom = [ invoice_summary('รายรับ',_selectedmounth.setMonth(_selectedmounth.getMonth()-count),1) , ...data_incom]
        }
        for(let count  =0 ; count <selectedtime ; count++){
            let  _selectedmounth =   new Date(selectedmounth.valueOf())
             data_number_invoice = [ Number_invoice( _selectedmounth.setMonth(_selectedmounth.getMonth()-count)  , 1 ) , ...data_number_invoice]
        }
        for(let count  =0 ; count <selectedtime ; count++){
            let  _selectedmounth =   new Date(selectedmounth.valueOf())
             data_unpaid = [ invoice_summary('ยอดค้างชำระ', _selectedmounth.setMonth(_selectedmounth.getMonth()-count) ,1) , ...data_unpaid]
        }
        
        let ndate = new Date(selectedmounth)
        let  label_mounth =  convert_to_mounth(ndate,selectedtime);
        return {
            
            labels:[...label_mounth], //<< mounth
            datasets: [
                {
                    label: 'ยอดรวม',
                    data: data_total,
                    backgroundColor: ' #63e5ac',
                }, {
                    label: 'รายรับ',
                    data: data_incom,
                    backgroundColor: '#62d2ce',

                }, 
                {
                    label: 'ยอดค้างชำระ',
                    data: data_unpaid,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 1
                }
            ]
        }
    }
    const invoice_summary =(status,selectedmounth:Date,selectedtime:Number) =>{
        if(invoice && invoice.data && invoice.data.Invoices &&  invoice.data.Invoices.length){
            let  invoices_unpaid = []

            switch (status) {
                case 'ยอดค้างชำระ':
                    invoices_unpaid =  invoice.data.Invoices.filter(item => item.status === 'รอชำระเงิน').slice()
                    break;
                case 'รายรับ':
                    invoices_unpaid =  invoice.data.Invoices.filter(item => item.status === 'สำเร็จ').slice()
                    break;
                case 'ยอดรวม':
                    invoices_unpaid =  invoice.data.Invoices.filter(item => item.status).slice()
                    break;
                default:
                    invoices_unpaid =   invoice.data.Invoices.filter(item => item.status).slice()
                    break;
            }
            if(selectedmounth !== undefined && selectedtime !== undefined ){
                 let _selectedmounth = new Date(selectedmounth.valueOf())
                 let first_date_of_mounth = new Date(_selectedmounth.getFullYear() , _selectedmounth.getMonth()+1 - selectedtime,1)
                 let end_date_of_mounth =   new Date(  new Date(_selectedmounth.getFullYear() , _selectedmounth.getMonth()+1,1).getTime() -1  ) 
                
                invoices_unpaid =   invoices_unpaid.filter(item => {
                  let invoices_mounth =  new Date(item.duedateinvoice)
                  if(  invoices_mounth.getTime() <= end_date_of_mounth.getTime()  && invoices_mounth.getTime() >= first_date_of_mounth.getTime()){
                         return true;  
                    }else{
                        return false;
                    }
                })
              
            }
        
          
            const total_price = (invoice) =>{
             return  Number( 
                invoice.lists.reduce(
                    (current,next) => {
                        
                        if(current !== undefined && next !== undefined){
                            return  {price: Number(current.price)  + Number( next.price)} 
                        }else{
                            return {price: Number(current.price)  }
                        }
                    }
                ).price )
            }
   
           
            if(invoices_unpaid && invoices_unpaid.length > 0 ){


                invoices_unpaid =  invoices_unpaid.map((invoice) => ({...invoice,total_price:total_price(invoice)}) ) 
              
                const costunpaid =  invoices_unpaid.reduce( (current,next ) => 
                 ({ total_price :  ( Number(current.total_price) +  Number(next.total_price)  )  })
                 ).total_price 
                

                return  costunpaid
            }else{
                return Number(0)
            }
        }
        else{
            return   '---'
        }
    }

    useEffect (()=>{
        let now  = new Date(monthselected)
        let time = Number(timelength)
       setDataChart( updatedatachart(now , time) )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[DataInvoice,DataReceipt , timelength,monthselected])
    useEffect(() => {

        if (invoice.data) {
            setDataInvoice([...Data_to_table(invoice.data.Invoices)])
        }

        if (receipt.data) {
            setDataReceipt([...Data_to_table(receipt.data.Receipts)])
        }
       
        

    }, [invoice, receipt ])






    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>

                    <div className={styles.header}>
                        <h2>Financial report</h2>
                        <div className={styles.headerinput} >
                            <input type='month'
                             
                                value={`${monthselected.getFullYear()}-${monthselected.getMonth()+1<10?0:""}${monthselected.getMonth()+1 }`}
                                onChange={(e)=>{
                                    setmonthselected( new Date( e.target.value)  )
                                }}
                             />
                             <select onChange={(e)=>{ settimelength( e.target.value) }} value={timelength}>
                                 <option>1</option>
                                 <option>2</option>
                                 <option>3</option>
                                 <option>5</option>
                            </select>
                            <button
                                onClick={()=>{
                                    console.log('click search')
                                    invoice.refetch()
                                    receipt.refetch()
                                } }
                             >
                                search
                            </button>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.profit}>
                            <h3 className={styles.headtext}>ยอดรวม</h3>
                            <div className={styles.result}>
                                <h1>{invoice_summary('ยอดรวม')}</h1>
                            </div>
                            <div className={styles.detail}>
                                <label></label>
                                <br />
                              
                            </div>

                        </div>
                        <div className={styles.incomes}>
                            <h3 className={styles.headtext}>รายรับ</h3>
                            <div className={styles.result}>
                                <h1>{invoice_summary('รายรับ')}</h1>
                            </div>
                            <div className={styles.detail}>
                               
                            </div>

                        </div>
                        <div className={styles.expenses}>
                            <h3 className={styles.headtext}>จำนวนใบแจ้งหนี้</h3>
                            <div className={styles.result}>
                                <h1>{Number_invoice()}</h1>
                            </div>
                            <div className={styles.detail}>
                               
                            </div>

                        </div>
                        <div className={styles.wageExpenses}>
                            <h3 className={styles.headtext}>ยอดค้างชำระ</h3>
                            <div className={styles.result}>
                                <h1>{invoice_summary('ยอดค้างชำระ')}</h1>
                            </div>
                            <div className={styles.detail}>
                                
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