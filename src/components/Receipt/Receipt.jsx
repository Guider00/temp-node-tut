
import styles from './Receipt.module.css';
import PaymentIcon from '@mui/icons-material/Payment';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';



export const Receipt = () => {

    let header_table = ["","เลขที่ใบแจ้งหนี้","ชื่อห้อง","วันที่ออก","สถานะ","สถานะการพิมพ์","รอบบิล"]
    let sim_table = [{"":"","เลขที่ใบแจ้งหนี้":"INMV20190030000097","ชื่อห้อง":"201","วันที่ออก":"30/12/2021","สถานะ":"รอชำระเงิน","สถานะการพิมพ์":"ยังไม่พิมพ์","รอบบิล":"04/2562"}]

    let header_table2 = ["รายการ","ชื่อรายการค่าใช้จ่าย","จำนวน","จำนวนเงิน","ราคา","ภาษีมูลค่าเพิ่ม","จำนวนเงิน","ภาษี"]
    let sim_table2 = [{"รายการ":"1","ชื่อรายการค่าใช้จ่าย":"INMV20190030000097","จำนวน":"1","จำนวนเงิน":"1200.00","ราคา":"100.00","ภาษีมูลค่าเพิ่ม":"888.00","จำนวนเงิน":"888.00","ภาษี":""}]


    return (
        <>
            <div className = {styles.container}>
                <div className = {styles.display}>
                    <div className = {styles.zone1}>
                        <div className = {styles.box1}>
                            <div className = {styles.topic}>
                                <lable>รายการใบแจ้งหนี้</lable>
                            </div>
                            <div className = {styles.date}>
                                <div className = {styles.part1}>
                                    <input  type = "radio"></input>
                                    <lable className = {styles.onerem}>วันที่</lable>
                                    <input className = {styles.side1}></input>

                                    <lable>ถึง</lable>
                                    <input className = {styles.side2}></input>

                                    <lable>แสดงผล</lable>
                                    <input className = {styles.side3}></input>
                                    <lable>เดือน</lable>
                                </div>
                                <div className = {styles.part2}>
                                <input  type = "radio"></input>
                                    <lable className = {styles.semirem}>รอบบิล</lable>
                                    <input className = {styles.side1}></input>

                                    <lable>ถึง</lable>
                                    <input className = {styles.side2}></input>

                                </div>
                                <div className = {styles.part3}>
                                    <input type = "checkbox"></input>
                                    <lable className = {styles.onerem}>เลือกทั้งหมด</lable>

                                    <lable className = {styles.side1}>อาคาร</lable>
                                    <input className = {styles.side2}></input>



                                </div>
                                
                            </div>
                            <div className = {styles.main}>
                                <div className = {styles.research}>
                                    <input className = {styles.input1}></input>
                                    <button className = {styles.input2}>กรอง</button>
                                    <button className = {styles.input3}>ทั้งหมด</button>
                                </div>








                            </div>
                            <table className ={styles.table}>
                                <thead className ={styles.header}>
                                    <tr >
                                        <td>{header_table[0]}</td>
                                        <td>{header_table[1]}</td>
                                        <td>{header_table[2]}</td>
                                        <td>{header_table[3]}</td>
                                        <td>{header_table[4]}</td>
                                        <td>{header_table[5]}</td>
                                        <td>{header_table[6]}</td>
                                    </tr>
                                </thead>
                                <tbody className ={styles.body}>{sim_table.map( (data) =>
                                    <tr>
                                        <td>    
                                            <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"></input>
                                            </td>
                                        <td>{data["เลขที่ใบแจ้งหนี้"]}</td>
                                        <td>{data["ชื่อห้อง"]}</td>
                                        <td>{data["วันที่ออก"]}</td>
                                        <td>{data["สถานะ"]}</td>
                                        <td>{data["สถานะการพิมพ์"]}</td>
                                        <td>{data["รอบบิล"]}</td>
                                    </tr>
                                        )
                                            }                
                                </tbody>




                            </table>
                            
            
                        </div>
                        
                            

                        
                    </div>
                    <div className = {styles.zone2}>
                        <div className = {styles.box2}>
                            <div className = {styles.topic1}>
                                
                                <lable >บันทึกมิเตอร์</lable>        
                            </div>
                                <div className = {styles.display}>
                                
                                <div className = {styles.topic2}>
                                    <label className = {styles.text1}>ครั้งก่อน</label>
                                    <label className = {styles.text2}>วันที่บันทึก</label>
                                    <div className = {styles.input}>
                                        <label className = {styles.rightrem}>ไฟฟ้า</label>
                                        <input className = {styles.input1}></input>
                                        <input className = {styles.input2}></input>
                                    </div>
                                    <div className = {styles.input}>
                                        <label className = {styles.rightrem}>น้ำ</label>
                                        <input className = {styles.input3}></input>
                                        <input className = {styles.input2}></input>
                                    </div>

                                </div>
                                <div className = {styles.topic3}>
                                    <label className = {styles.text1} >ล่าสุด</label>
                                    <label className = {styles.text2}>วันที่บันทึก</label>
                                    <div className = {styles.input}>
                                        <input className = {styles.input1}></input>
                                        <input className = {styles.input2}></input>
                                    </div>
                                    <div className = {styles.input}>
                                        <input className = {styles.input1}></input>
                                        <input className = {styles.input2}></input>
                                    </div>

                                </div>                              
                            </div>
                            
                            <div className = {styles.topic4}>
                                <lable className = {styles.text1} >วันที่เริ่ม</lable>
                                <lable className = {styles.text2} >วันที่สิ้นสุด</lable>
                                <lable className = {styles.text3} >ค่าโทรศัพท์</lable>
                                <div className = {styles.input}>
                                    <lable className = {styles.text4} >โทรศัพท์</lable>
                                    <input className = {styles.input1} ></input>
                                    <input className = {styles.input2} ></input>
                                    <input className = {styles.input3}></input>
                                </div>
                                
                                        
                            </div>
                            <div className = {styles.topic}>
                                รายการใช้จ่าย
                            </div>
                           
                            <table className ={styles.table}>
                                    <thead className ={styles.header}>
                                        <tr >
                                            <td>{header_table2[0]}</td>
                                            <td>{header_table2[1]}</td>
                                            <td>{header_table2[2]}</td>
                                            <td>{header_table2[3]}</td>
                                            <td>{header_table2[4]}</td>
                                            <td>{header_table2[5]}</td>
                                            <td>{header_table2[6]}</td>
                                            <td>{header_table2[7]}</td>
                                        </tr>
                                    </thead>
                                    <tbody className ={styles.body}>{sim_table2.map( (data) =>
                                        <tr>
                                            <td>{data["รายการ"]}</td>
                                            <td>{data["ชื่อรายการค่าใช้จ่าย"]}</td>
                                            <td>{data["จำนวน"]}</td>
                                            <td>{data["จำนวนเงิน"]}</td>
                                            <td>{data["ราคา"]}</td>
                                            <td>{data["ภาษีมูลค่าเพิ่ม"]}</td>
                                            <td>{data["จำนวนเงิน"]}</td>
                                            <td>    
                                                <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"></input>
                                            </td>
                                        </tr>
                                            )
                                                }                
                                    </tbody>




                            </table>
                            <div button className = {styles.button}>
                                <button className = {styles.button1}>เพิ่ม</button>
                                <button className = {styles.button2}>ลบ</button>
                                <div className = {styles.lastresult}>
                                    <div className = {styles.head} >
                                        <lable>รวม</lable>
                                        <input className = {styles.onerem}></input>
                                        <lable className = {styles.onerem}>บาท</lable>
                                    </div>
                                    <div className = {styles.head}>
                                        <lable>ภาษีมูลค่าเพิ่ม 7%</lable>
                                        <input className = {styles.onerem}></input>
                                        <lable className = {styles.onerem}>บาท</lable>
                                    </div>
                                    <div className = {styles.head}>
                                        <lable>รวมยอกเงินสุทธิ</lable>
                                        <input className = {styles.onerem}></input>
                                        <lable className = {styles.onerem}>บาท</lable>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                            
                            

                        </div>
                    </div>
                </div> 
                <div class = {styles.buttonzone}>
                    <div className = {styles.box3}> 
                        <button className = {styles.button1}>
                            <i><LocalPrintshopIcon/></i>
                            <div>พิมพ์ทั้งหมดที่เลือก</div>
                        </button>
                        <button className = {styles.button2}>
                            <i><PaymentIcon/></i>
                            <div>ชำระทั้งหมดที่เลือก</div>
                            </button>
                        <button className = {styles.button3}>
                            <i><DoNotDisturbIcon/></i>
                            <div>ยกเลิกทั้งหมดที่เลือก</div>
                        </button>
                        



                    </div>
                    <div className = {styles.box4}>
                        <button className = {styles.button1}>
                            <i><EditOutlinedIcon/></i>
                            <div>แก้ไข</div>
                        </button>
                        <button className = {styles.button2}>
                            <i><SaveOutlinedIcon/></i>
                            <div>บันทึก</div>
                            </button>
                        <button className = {styles.button3}>
                            <i><CancelOutlinedIcon/></i>
                            <div>ยกเลิก</div>
                        </button>




                    </div>




                </div>
            </div>
        </>
    )
}