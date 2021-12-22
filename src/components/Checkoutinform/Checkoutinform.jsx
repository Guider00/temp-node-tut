import styles from './Checkoutinform.module.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    API_GET_Checkoutinform,
    API_CREATE_Checkoutinform,
    API_DELETE_Checkoutinform,
    API_UPDATE_Checkoutinform
} from '../../API/Schema/Checkoutinform/Checkoutinform'


export const Checkoutinform = () => {

    const Checkoutinform = useQuery(API_GET_Checkoutinform);
    console.log("first-data",Checkoutinform)

    const [checkoutinforms,setcheckoutinforms] = useState([])
    const [checkoutState,setcheckoutState] = useState([])


    useEffect(() => {
        if(Checkoutinform && Checkoutinform.data && Checkoutinform.data.Checkoutinforms){

            let _checkoutinform = checkoutinforms
            _checkoutinform = [...Checkoutinform.data.Checkoutinforms]
            setcheckoutinforms([..._checkoutinform])
            console.log('set-data',checkoutinforms)

        }

    }, [Checkoutinform])




    let head_table = ["ห้อง" ,"อาคาร" ,"ชั้น" ,"ประเภทห้อง" ,"สถานะ" ,"ชื่อ" ,"นามสกุล" ,"เวลาที่ต้องย้ายออก"]
    let body_table = [{"ห้อง":"226","อาคาร":"อาคาร B","ชั้น":"2","ประเภทห้อง":"ห้องแอร์","สถานะ":"เช่า","ชื่อ":"ใจดี","นามสกุล":"มากมาย","วันที่ต้องย้ายออก":"12/12/2564"}]
    return (
        <>
            <div className= {styles.container}>
                <div className= {styles.mainbox}>
                    <div className= {styles.headerstyles}>
                        <h1 className= {styles.header}>รายการห้องเช่า</h1>
                        <div className= {styles.subheader}>
                            <select className= {styles.selectstyles} onChange={(e)=>{
                                const selectroomtype = e.target.value;
                                setcheckoutState(selectroomtype);
                            }}>{checkoutinforms.map((item) =>
                                <option value={item.roomtype}>ประเภทห้อง : {item.roomtype}</option>
                                )}
                            </select>
                            <button className= {styles.filterstyles}>กรอง</button>
                            <button className= {styles.selectallstyles}>ทั้งหมด</button>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <table className={styles.tablestyles}>
                            <thead className={styles.header}>
                                <tr>
                                    <td>{head_table[0]}</td>
                                    <td>{head_table[1]}</td>
                                    <td>{head_table[2]}</td>
                                    <td>{head_table[3]}</td>
                                    <td>{head_table[4]}</td>
                                    <td>{head_table[5]}</td>
                                    <td>{head_table[6]}</td>
                                    <td>{head_table[7]}</td>
                                </tr>

                            </thead>
                            <tbody className={styles.body}>{checkoutinforms.map((item) =>
                                <tr>
                                    <td>{item.room}</td>
                                    <td>{item.building}</td>
                                    <td>{item.floor}</td>
                                    <td>{item.roomtype}</td>
                                    <td>{item.status}</td>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.checkout}</td>
                                </tr>

                                )}
                            </tbody>

                        </table>
                    </div>
                    <div className= {styles.buttonstyles} >
                        <button className= {styles.buttonsave}><SaveIcon/>บันทึก</button>
                        <button className= {styles.buttoncancel}><HighlightOffIcon/>แก้ไข</button>
                    </div>

                </div>
            </div>
        </>
    )
}