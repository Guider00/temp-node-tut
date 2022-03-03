
import { useEffect, useState } from "react"
import styles from './Tablebooking.module.css';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

import CheckIcon from '@mui/icons-material/Check';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptIcon from '@mui/icons-material/Receipt';

//Dialog
import Dialog from '../../../subcomponents/Dialog/Dialog'
import { DialogFunction } from "../../../subcomponents/Dialog/Dialog";

import NotificationsIcon from '@mui/icons-material/Notifications';

import { formatDate } from '../../../general_functions/convert'
import { Modalupload } from '../Modalupload/Modalupload'

//dialog
//Dialog


export const Tablebooking = (props) => {
    const [loading, setloading] = useState(false)
    const [showmodal, setmodal] = useState(false)
    const [modalbooking, setmodalbooking] = useState(null)

    //Dialog

    const { defaultDialog,handleDialog, checkData } = DialogFunction();

    useEffect(() => {
        async function fetchdata() {

            setloading(true)
        }
        fetchdata()
    }, [loading])
    const handleSaveimage = (booking, file) => {

        if (props && props.handleSaveimage) {
            props.handleSaveimage(booking, file, () => { setmodal(false) })
        }
    }
    console.log(props.data)


    return (loading ?
        <div>
            {defaultDialog.isLoading && <Dialog onDialog={checkData} nextPage={'/check_in'} message={defaultDialog.message} />}
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
                        <th>ใบเสร็จ</th>
                        <th>ยืนยันการเข้าพัก</th>
                        <th>แจ้งเตือน</th>
                        <th></th>
                    </tr>
                    {props && props.data && props.data.Bookings ?
                        <> {props.data.Bookings.map(booking =>
                            <tr style={{
                                backgroundColor:
                                    formatDate(new Date(Number(booking.checkin_date))) === formatDate(new Date()) || new Date(Number(booking.checkin_date)) <= new Date()
                                        ? "darkgray" : "white"
                            }}>
                                <td>{booking && booking.Room && booking.Room.name ? booking.Room.name : "---"}</td>
                                <td>{booking && booking.customer_name ? booking.customer_name : '---'}</td>
                                <td>{booking && booking.customer_lastname ? booking.customer_lastname : '---'}</td>
                                <td>{booking && booking.deposit ? booking.deposit : "---"}</td>

                                <td>{booking && booking.checkin_date ? formatDate(new Date(Number(booking.checkin_date))) : '---'}</td>
                                <td>{booking && booking.checkin_date_exp ? formatDate(new Date(Number(booking.checkin_date_exp))) : '---'}</td>
                                <td>{booking.booking_number ? booking.booking_number : '---'}</td>
                                <td>
                                    <label style={{ color: (booking.status === 'สำเร็จ') ? 'green' : 'black' }} >{booking.status ? booking.status : '---'} </label>
                                </td>
                                <td>
                                    <a href={booking.receipt_number ? booking.receipt_number : ''}>{booking.receipt_number ? booking.receipt_number : '---'}</a>
                                </td>
                                <td>
                                    <button onClick={() => props.handleUpdateconfirm_booking(booking)}>
                                        {(booking.confirm_booking && booking.confirm_booking === 'ยืนยันการเข้าพัก') ? <CheckIcon /> : "---"}
                                    </button>

                                </td>
                                <td>


                                    <button

                                        className={
                                            (formatDate(new Date(Number(booking.checkin_date))) === formatDate(new Date()) ||
                                                new Date(Number(booking.checkin_date)) <= new Date()) && booking.confirm_booking !== 'ยืนยันการเข้าพัก' ? styles.blink_me : null
                                        }
                                    >
                                        <NotificationsIcon />
                                    </button>
                                </td>
                                <td>

                                    <button onClick={props.handleredit ? () => props.handleredit(booking) : () => { console.log('edit', booking) }} > <EditIcon /> </button>
                                    <button onClick={() => {
                                        setmodal(true)
                                        setmodalbooking(booking)
                                    }
                                    } > <UploadFileIcon />
                                    </button>
                                    <button onClick={() => props.handleUpdatecompletestatus(booking)}>
                                        {
                                            (booking.status === 'สำเร็จ') ?
                                                <CancelIcon /> :
                                                <CheckCircleOutlineIcon />
                                        }
                                    </button>
                                    <button onClick={() => {
                                        if (booking.status === 'สำเร็จ') {
                                            props.handleExportformbooking(booking)

                                        } else {
                                            alert('รอการชำระเงิน')
                                        }
                                    }}>
                                        <AssignmentIcon />
                                    </button>
                                    <button onClick={() => {
                                        if (booking.status === 'สำเร็จ') {
                                            handleDialog("The request was successful !!!!! Go Check-in page?", true)
                                            props.handleExportReceipt(booking)

                                        } else {
                                            alert('รอการชำระเงิน')
                                        }
                                    }}>
                                        <ReceiptIcon />
                                    </button>
                                    <button onClick={props.handlerdelete ? () => props.handlerdelete(booking) : () => { console.log('delete', booking) }}> <DeleteIcon /> </button>

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
                            <td>   <button> <NotificationsIcon /></button> </td>
                            <td>


                                <button><EditIcon /> </button>
                                <button><UploadFileIcon /></button>
                                <button><CheckCircleOutlineIcon /></button>
                                <button ><AssignmentIcon /></button>
                                <button > <ReceiptIcon /></button>
                                <button><DeleteIcon /></button>

                            </td>

                        </tr>
                    }
                </table>
            </div>
            {showmodal ? <Modalupload handleclose={() => { setmodal(false) }} booking={modalbooking} handleSave={handleSaveimage} /> : null}
        </div> : null
    )
}