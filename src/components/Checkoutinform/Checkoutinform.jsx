import styles from './Checkoutinform.module.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';


export const Checkoutinform = () => {

    let head_table = ["ห้อง" ,"อาคาร" ,"ชั้น" ,"ประเภทห้อง" ,"สถานะ" ,"ชื่อ" ,"นามสกุล" ,"เวลาที่ต้องย้ายออก"]
    let body_table = [{"ห้อง":"226","อาคาร":"อาคาร B","ชั้น":"2","ประเภทห้อง":"ห้องแอร์","สถานะ":"เช่า","ชื่อ":"ใจดี","นามสกุล":"มากมาย","วันที่ต้องย้ายออก":"12/12/2564"}]
    return (
        <>
            <div className= {styles.container}>
                <div className= {styles.mainbox}>
                    <div className= {styles.headerstyles}>
                        <h1 className= {styles.header}>รายการห้องเช่า</h1>
                        <div className= {styles.subheader}>
                            <select className= {styles.selectstyles}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
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
                            <tbody className={styles.body}>{body_table.map((item) =>
                                <tr>
                                    <td>{item["ห้อง"]}</td>
                                    <td>{item["อาคาร"]}</td>
                                    <td>{item["ชั้น"]}</td>
                                    <td>{item["ประเภทห้อง"]}</td>
                                    <td>{item["สถานะ"]}</td>
                                    <td>{item["ชื่อ"]}</td>
                                    <td>{item["นามสกุล"]}</td>
                                    <td>{item["วันที่ต้องย้ายออก"]}</td>
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