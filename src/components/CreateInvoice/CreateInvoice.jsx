import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import styles from './CreateInvoice.module.css';




export const CreateInvoic = () =>{


    let header_table = ["","อาคาร","ชั้น","ประเภทห้อง","ชื่อห้อง","ประเภทการเช่า"]
    let sim_table = [{"":"","อาคาร":"อาคารเอ","ชั้น":"01","ประเภทห้อง":"ห้องแอร์","ชื่อห้อง":"101","ประเภทการเช่า":"รายเดือน"},{"":"","อาคาร":"อาคารเอ","ชั้น":"01","ประเภทห้อง":"ห้องแอร์","ชื่อห้อง":"101","ประเภทการเช่า":"รายเดือน"}]
    return (
        <div className = {styles.zone}>
            <div className = {styles.bigbox}>
                <div className = {styles.flex}>
                    <lable className = {styles.head}>ออกใบแจ้งหนี้</lable>
                    <div className = {styles.topic}> รอบบิล <input></input>
                </div>
                </div>
                <div className = {styles.normalbox}>
                    
                    <div className = {styles.displaybox}>
                        <div className = {styles.display1}>       
                            <div className = {styles.topic}>รูปแบบออกใบแจ้งหนี้</div>
                        </div>
                        <div className = {styles.radio2} >
                            <input type = "radio"></input>
                            <lable>ออกตามรอบบิล</lable>

                            <input className = {styles.onerem} type = "radio"></input>
                            <lable>กำหนดเอง</lable>

                        </div>
                        <div className = {styles.day}>
                            รายเดือน
                        </div>
                        <div className = {styles.flex}>
                            <div className = {styles.lablebox}>
                                <p>วันที่คิดรอบบิล</p>
                                <p >วันที่ครบกำหนดชำระ</p>
                                <p >กรณีไม่พักเป็นเดือน</p>
                                <p>คิดค่าเช่า</p>
                            </div>
                            <div className = {styles.inputbox}>
                                <input></input>
                                <p></p>
                                <input></input>
                                <p></p>
                                <input type = "checkbox"></input>
                                <p></p>
                                <input></input>
                            </div>
                        </div>
                        
                       
                        
                        
                        
                        
                       
                        


                        
                        
                        
                    </div>
                    <div className = {styles.mainbox}>
                        <div className = {styles.topic}>
                            <div>รายการผู้เช่า</div>
                        </div>
                        <div  className = {styles.text}>
                            <div className = {styles.flex}>
                                
                                <input className = {styles.radio}  type = "checkbox"></input>
                                <div className = {styles.all} >เลือกทั้งหมด</div>

                            </div>
                           
        
                            <p className = {styles.flex}>
                                <input  className = {styles.select}></input>
                                
                                <button className = {styles.buttonmain}>กรอง</button> 
                                <button className = {styles.buttonmain}>ทั้งหมด</button>
                            </p>


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
                                </tr>
                            </thead>
                            <tbody className ={styles.body}>{sim_table.map( (data) =>
                                <tr>
                                    <td>    
                                        <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"></input>
                                        </td>
                                    <td>{data["อาคาร"]}</td>
                                    <td>{data["ชั้น"]}</td>
                                    <td>{data["ประเภทห้อง"]}</td>
                                    <td>{data["ชื่อห้อง"]}</td>
                                    <td>{data["ประเภทการเช่า"]}</td>
                                </tr>
                                    )
                                        }                
                            </tbody>




                        </table>
                        <div className = {styles.detail}>
                            ออกใบแจ้งหนี้ : คือการออกใบแจ้งหนี้ให้ผู้เช่าทราบก่อนถึงวันชำระ 
                            สามารถออกได้ตามรอบบิลและกำหนดเอง(กรีณีมีการพักไม่เต็มเดือน)
                            และสามารถเลือกใบแจ้งหนี้ได้ทั้งหมดพร้อมกันได้



                        </div>

                    </div>
                    
                    



                    



                </div>
                <div className={styles.lastbutton}>
                <button className = {styles.button}>
                    <i><CreateRoundedIcon/></i>
                    <div>ออกใบแจ้งหนี้</div>
                </button>
                <button className = {styles.button}>
                    <i><CancelRoundedIcon/></i>
                    <div>ยกเลิก</div>
                </button>
            </div>
                
            </div>



            








            
            
        </div>
    )
}