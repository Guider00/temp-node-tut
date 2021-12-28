import styles from './Contract.module.css';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    API_GET_Contract,
    API_CREATE_Contract,
    API_DELETE_Contract,
    API_UPDATE_Contract
} from '../../API/Schema/Contract/Contract'






export const Contract = () => {


    const Contract = useQuery(API_GET_Contract);
    

    const [ loadingpage, setloadingpage] = useState(false)
    const [ rooms , setrooms ] = useState([])

   

    useEffect(() =>{
        if( Contract && Contract.data && Contract.data.Contracts){
            let _contract = rooms
            _contract = [...Contract.data.Contracts]
            setrooms([..._contract]);
            console.log('1',_contract)
            
        }
        
        
        setloadingpage(true);

    },[loadingpage , Contract])

   



    let head_table = ['','เลขที่สัญญา','ประเภทห้อง','ชื่อห้อง','ประเภทสัญญา','ชื่อผู้เช่า','นามสกุล','วันที่ขอสัญญา','สถานะ','วันที่ปิดสัญญา']

    return (
        <>
            <div className={styles.container}>
                <div className={styles.zone1}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <lable className={styles.contract}>รายการสัญญา</lable>
                        </div>
                        <div className={styles.dateinput}>
                            <label className={styles.date}>วันที่ :</label>
                            <input type='date' className={styles.inputdate}></input>
                            <label className={styles.to}>ถึง :</label>
                            <input type='date' className={styles.inputdate}></input>
                            <br/>
                            <label className={styles.selectAll}>เลือกทั้งหมด</label>
                            <input type = 'checkbox' className={styles.checkbox}></input>
                            <label className={styles.building}>อาคาร :</label>
                            <select className={styles.select}>
                                <option>อาคารทั้งหมด</option>
                            </select>
                        </div>
                        

                    </div>
                    <div className={styles.body}>
                        <div className={styles.filter}>
                            <input className={styles.input}></input>
                            <button className={styles.button}>กรอง</button>
                            <button className={styles.button}>ทั้งหมด</button>
                        </div>
                        <table className={styles.table}>
                            <thead className={styles.head}>
                                <tr>
                                    <td>{head_table[0]}</td>
                                    <td>{head_table[1]}</td>
                                    <td>{head_table[2]}</td>
                                    <td>{head_table[3]}</td>
                                    <td>{head_table[4]}</td>
                                    <td>{head_table[5]}</td>
                                    <td>{head_table[6]}</td>
                                    <td>{head_table[7]}</td>
                                    <td>{head_table[8]}</td>
                                    <td>{head_table[9]}</td>
                                </tr>
                            </thead>
                            <tbody className={styles.body}>{
                                rooms.map((item) => 
                            <tr>
                                <td>
                                    <input type='checkbox' ></input>
                                </td>
                                <td>{item.Contractnumber}</td>
                                <td>{item.RoomType}</td>
                                <td>{item.RoomName}</td>
                                <td>{item.RentType}</td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.Check_in}</td>
                                <td>{item.status}</td>
                                <td>{item.Check_out}</td>
                            </tr>
                            
                            )}
                                
                                          
        
                            </tbody>
                        </table>


                    </div>
                    <div className={styles.button}>
                        <button className={styles.print}>พิมพ์</button>
                        <button className={styles.importfile}>แนบไฟล์</button>
                    </div>

                </div>
                <div className={styles.zone2}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <div className={styles.contract}>รายละเอียดสัญญา</div>
                        </div>
                    </div>
                    <div className={styles.subheader}>
                        <lable className={styles.subheadertext}>ชื่อประเภทห้อง :</lable>
                        <select className={styles.subheaderselect}>
                            <option>Air</option>
                            <option>Fan</option>
                        </select>

                    </div>
                    
                    <div className={styles.inputmonthandday}>
                        <h1 className={styles.line}></h1>
                        <div className={styles.month}>
                            <lable className={styles.month}>รายเดือน :</lable>
                            <input className={styles.check} type = 'checkbox'/>
                            <div className={styles.input1}>
                                <lable className={styles.inputtext1}>ค่าเช่าห้อง :</lable>
                                <input placeholder='0.00' className={styles.inputbox1}></input>
                                <lable className={styles.inputtext2}>ค่าประกัน :</lable>
                                <input placeholder='0.00' className={styles.inputbox2}></input>
                                <br/>
                                <lable className={styles.inputtext3}>ค่าเช่าล่วงหน้า :</lable>
                                <input placeholder='0.00' className={styles.inputtext3}></input>
                            </div>
                            <lable className={styles.submonth}>ค่าสาธารณูปโภค</lable>
                            <div className={styles.input2}>
                                <lable className={styles.inputtext1}>คิดค่าใช้จ่าย</lable>
                                <lable className={styles.inputtext2}>อัตราบริการต่อหน่วย</lable>
                                <lable className={styles.inputtext3}>อัตราต่อขั้นต่ำ</lable>
                                <lable className={styles.inputtext4}>เหมาจ่าย</lable>
                                <br/>
                                <lable className={styles.inputtext5}>ไฟฟ้า :</lable>
                                <input placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                <input placeholder='0.00' className={styles.inputbox1}></input>
                                <input placeholder='0.00' className={styles.inputbox2}></input>
                                <lable>บาท</lable>
                                <input placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                <input placeholder='0.00' className={styles.inputbox3}></input>
                                <lable>บาท</lable>
                                <br/>
                                <lable className={styles.inputtext7}>น้ำ :</lable>
                                <input placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                <input placeholder='0.00' className={styles.inputbox1}></input>
                                <input placeholder='0.00' className={styles.inputbox2}></input>
                                <lable>บาท</lable>
                                <input placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                <input placeholder='0.00' className={styles.inputbox3}></input>
                                <lable>บาท</lable>
                            </div>
               
                        </div>
                        <h1 className={styles.line}></h1>
                        <div className={styles.day}>
                                <lable className={styles.day}>รายวัน :</lable>
                                <input type='checkbox' className={styles.check} />
                                <div className={styles.input1}>
                                    <lable className={styles.inputtext1}>ค่าเช่าห้อง :</lable>
                                    <input placeholder='0.00' className={styles.inputbox1}></input>
                                </div>
                                <lable className={styles.subday}>ค่าสาธารณูปโภค</lable>
                                <div className={styles.input2}>
                                    <lable className={styles.inputtext1}>คิดค่าใช้จ่าย</lable>
                                    <lable className={styles.inputtext2}>อัตราบริการต่อหน่วย</lable>
                                    <lable className={styles.inputtext3}>อัตราต่อขั้นต่ำ</lable>
                                    <lable className={styles.inputtext4}>เหมาจ่าย</lable>
                                    <br/>
                                    <lable className={styles.inputtext5}>ไฟฟ้า :</lable>
                                    <input placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                    <input placeholder='0.00' className={styles.inputbox1}></input>
                                    <input placeholder='0.00' className={styles.inputbox2}></input>
                                    <lable>บาท</lable>
                                    <input placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                    <input placeholder='0.00' className={styles.inputbox3}></input>
                                    <lable>บาท</lable>
                                    <br/>
                                    <lable className={styles.inputtext7}>น้ำ :</lable>
                                    <input placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                    <input placeholder='0.00' className={styles.inputbox1}></input>
                                    <input placeholder='0.00' className={styles.inputbox2}></input>
                                    <lable>บาท</lable>
                                    <input placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                    <input placeholder='0.00' className={styles.inputbox3}></input>
                                    <lable>บาท</lable>
                                </div>
                                

                        </div>
                        

                        

                    </div>
                    
                    <div className={styles.button}>
                        <h1 className={styles.line}></h1>
                        <button className={styles.save}>
                            <SaveIcon/>
                            <br/>
                            บันทึก
                        </button>

                        <button className={styles.edit}>
                            <EditIcon/>
                            <br/>
                            แก้ไข
                        </button>
                        
                        <button className={styles.cancel}>
                            <CancelIcon/>
                            <br/>
                            ยกเลิก
                        </button>

                    </div>
                </div>
               
            </div>
        </>
    )
}