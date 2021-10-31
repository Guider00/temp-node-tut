
import { useEffect, useState } from "react"
import styles from './Tablebooking.module.css';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { formatDate } from '../../../general_functions/convert'


export const Tablebooking =(props)=>{
    const [loading,setloading] = useState(false)
    const [rooms,setroom] = useState([])
    useEffect(()=>{
        async function fetchdata() {
            
            setloading(true)
        }
         fetchdata()
    },[loading])
    console.log('Tablebooking',props.data)


    return  ( loading ?
    <div>
        <div className={styles.tablebooking}>
            <table >
                <tr>
                    <th>ห้อง</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>เงินจอง</th>
                    <th>วันที่ต้องการ</th>
                    <th>วันที่สิ้นสุดการจอง</th>
                    <th>เลขที่ใบจอง</th>
                    <th>สถานะ</th>
                    <th></th>
                </tr>
                { props &&  props.data &&  props.data.Bookings ?
                    <> { props.data.Bookings.map( booking => 
                    <tr>
                        <td>{ "---"}</td>
                            <td>{booking.customer_name}</td>
                            <td>{booking.customer_lastname}</td>
                            <td>{booking.deposit}</td>
                            <td>{ formatDate( new Date(Number(booking.checkin_date) ) ) }</td>
                            <td>{ formatDate( new Date(Number(booking.checkin_date_exp)  ) )}</td>
                            <td>{booking.receipt_number}</td>
                            <td>{booking.status}</td>
                            <td>
                                <button onClick={ props.handlerdelete ?()=>props.handlerdelete(booking) : ()=>{console.log('delete',booking) }   }> <DeleteIcon/> </button>
                                <button onClick={ props.handleredit ?()=>props.handleredit(booking) :()=>{console.log('edit',booking)}  } > <EditIcon/> </button>
                            </td>

                            
                    </tr>)
                    }</> : 
                     <tr> 
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>
                                <button  ><DeleteIcon/></button>
                                <button  > <EditIcon/> </button>
                            </td>

                    </tr>
                }
            </table>
        </div>
    </div> : null
    )
}