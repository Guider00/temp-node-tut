
import styles from './Receipt.module.css';
import { useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { API_GET_Receipt,API_ADD_Receipt,API_DELETE_Receipt,API_UPDATE_Receipt} from '../../API/Schema/Receipt/Receipt'
import { useQuery } from '@apollo/client';
import { set } from 'mongoose';

export const Receipt = () => {

    const Receipt = useQuery(API_GET_Receipt)
    console.log('Receipt',Receipt)
    
    const [receipt , setreceipt] = useState([])
    const [IDrooms , setIDrooms] = useState([])




     //** calculate function  */
    const Inputdatenow = ()=>{
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        let today = year + "-" + month + "-" + day;
        return today
    }
    const lengthdate = (Inputdate1 , Inputdate2) =>{
        const start_date =  new Date(Inputdate1) 
        const end_date =  new Date(Inputdate2) 
        const diffTime = Math.abs(start_date.getTime() - end_date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
    }
    /** ---------------  */

    const [ formsearch, setformsearch  ] = useState({
         startdate :Inputdatenow(),
         enddate:Inputdatenow(),
         lenghthdispaly:"",
         duedate:""

    })

    const handleChangeformsearch =(e) =>{
        let _formsearch = formsearch
		if (e.target.id && _formsearch.hasOwnProperty(e.target.id) ) {
			_formsearch[e.target.id] = e.target.value;  //<< set value by ID 
            if(e.target.id === 'startdate' )
            {
                _formsearch.lenghthdispaly  = lengthdate (e.target.value,_formsearch.enddate)
            }else if( e.target.id === 'enddate' ){
                 _formsearch.lenghthdispaly  = lengthdate (_formsearch.startdate,e.target.value)
            }
           
			setformsearch({ ..._formsearch });
		}
    }
    const building = () =>{


    }
    const status = () =>{

    }
    const detail = () => {



    }
    const round = () => {



    }

    useEffect(()=>{

        if(Receipt && Receipt.data && Receipt.data.Receipts){
            let _receipt = receipt
            _receipt = Receipt.data.Receipts
            setreceipt(_receipt)
            console.log("_receipt_receipt_receipt",_receipt)

        }

        

    },[Receipt])





    let header_table = ["","เลขที่ใบเสร็จ","เลขที่ใบแจ้งหนี้","วันที่ออกบิล","ชื่อห้อง","ชื่อผู้..","สถานะ","สถานะการพิมพ์","รอบบิล"]
    let sim_table = [{"เลือก":"","เลขที่ใบเสร็จ":"PEM12345678910","เลขที่ใบแจ้งหนี้":"DEV12345678910","วันที่ออกบิล":"1/2/2021","ชื่อห้อง":"205","ชื่อผู้จ..":"","สถานะ":"ปกติ","สถานะการพิมพ์":"พิมพ์แล้ว","รอบบิล":"02/2022"}]

    let header_table2 = ["รายการ","ชื่อรายการใช้จ่าย","จำนวน","จำนวนเงิน","ราคา","ภาษีมูลค่าเพิ่ม","จำนวนเงิน","ภาษี"]
    let sim_table2 = [{"รายการ":"1","ชื่อรายการใช้จ่าย":"ค่าเช่าห้อง","จำนวน":"1","จำนวนเงิน":"300.00","ราคา":"205","ภาษีมูลค่าเพิ่ม":"1","จำนวนเงิน2":"200.00"}]


    return (
        <>
        
            <div className={styles.zone1}>
                <div className={styles.bigbox}>
                    <div className={styles.formtableInvoice} >
                        <div className={styles.card}>
                            <div className={styles.cardheader}>
                                <label> ตารางใบเสร็จ</label>
                            </div>
                            <div className={styles.cardbody}>
                                <div className={styles.row} >
                                    <label> วันที่ </label>
                                    <input className ={styles.spaceonerem} id="startdate" type="date" value={formsearch.startdate} onChange={handleChangeformsearch}></input>

                                    <label className ={styles.spaceonerem}> ถึง </label>
                                    <input className ={styles.spaceonerem} id="enddate" type="date"  value={formsearch.enddate} onChange={handleChangeformsearch} ></input>
                                    <label className ={styles.spaceonerem}> แสดงผล </label>
                                    <input className ={styles.spaceonerem}  id="lenghthdispaly" value={formsearch.lenghthdispaly} onChange={handleChangeformsearch} ></input>
                                </div>
                                <div>
                                    <label> รอบบิล </label>
                                    <input className ={styles.spaceonerem} id="duedate" type="date"  value={formsearch.duedate} onChange={handleChangeformsearch} ></input>
                                    <label className ={styles.spaceonerem}> ถึง </label>
                                    <input className ={styles.spaceonerem} id="enddate" type="date"  value={formsearch.enddate} onChange={handleChangeformsearch} ></input>
                                </div>
                                <p>
                                    <lable >อาคาร</lable>
                                    <input className ={styles.Building}  value ={formsearch.building} onChange={handleChangeformsearch} ></input>
                                </p>
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
                                            <td>{header_table[7]}</td>
                                            <td>{header_table[8]}</td>
                                        </tr>
                                    </thead>
                                    <tbody className ={styles.body}>
                                        {receipt.map( (data) =>
                                        <tr>
                                            <td>    
                                                <input type="checkbox" 
                                                name = "myCheckboxName" 
                                                id="myCheckboxId" 
                                                onChange={(e)=>{
                                                    const checked = e.target.checked
                                                    const id = data.id
                                                    if(checked){
                                                        let _IDrooms = IDrooms
                                                        _IDrooms = [..._IDrooms,id]
                                                        setIDrooms(_IDrooms)
                                                        console.log("check",_IDrooms)
                                                    }else{
                                                        let _IDrooms = IDrooms.filter(item => item != id)
                                                        setIDrooms(_IDrooms)
                                                        console.log('uncheck',_IDrooms)
                                                    }

                                                }}
                                                ></input>
                                            </td>
                                            <td width={'100px'}>{data.id ? data.id : "---"}</td>
                                            <td width={'120px'} hover onClick={()=>{
                                                console.log(data.id)
                                            }}>{data.monthlybilling ? data.monthlybilling : "---"}</td>
                                            <td width={'80px'}>{data.note ? data.note : "---"}</td>
                                            <td width={'50px'}>{data.lists[0].number ? data.lists[0].number : "---"}</td>
                                            <td width={'100px'}>{data.lists[0].name ? data.lists[0].name : "---"}</td>
                                            <td width={'50px'}>{data.status ? data.status : "---"}</td>
                                            <td width={'50px'}>{data.status ? data.status : "---"}</td>
                                            <td width={'50px'}>{data.lists[0].selectvat ? data.lists[0].selectvat : "---"}</td>


                                            
                                            
                                        </tr>
                                        )
                                        }                
                                    </tbody>
                                    







                                </table>
                                <div className={styles.button}>
                                    <button className={styles.press} >พิมพ์ใบเสร็จที่เลือก</button>
                                    <button className={styles.press}>พิมพ์ใบกำกับภาษีที่เลือก</button>

                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bigbox} >
                    <div className={styles.formdetailsInvoice}>
                        <div className={styles.card}>
                            <div className={styles.cardheader}>
                                <label> ข้อมูลใบเสร็จ</label>
                            </div>
                            
                            <div className={styles.cardbody}>
                                <p className={styles.row} >
                                    <label > รอบบิล </label>
                                    <input className ={styles.spaceonerem} id="round" type="date" value={formsearch.round} onChange={handleChangeformsearch}></input>
                                    
                                </p>
                                <p>
                                <label> สถานะใบเสร็จ </label>
                                <input className ={styles.spaceonerem} id = "statusbill"  value={formsearch.status} onChange={handleChangeformsearch} ></input>
                                </p>
                                <p>
                                <label>รายละเอียดใบเสร็จ</label>
                                <input className={styles.text}></input>

                                <button className = {styles.button2} >
                                    <i className = {styles.icon}><EditOutlinedIcon/></i>
                                    <div>แก้ไข</div>
                                </button>
                                </p>

                                <div className={styles.menu}>รายการใบแจ้งหนี้</div>
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
                                    <tbody className ={styles.body}>
                                        {sim_table2.map( (data2) =>
                                        <tr>
                                            
                                            <td>{data2["รายการ"]}</td>
                                            <td>{data2["ชื่อรายการใช้จ่าย"]}</td>
                                            <td>{data2["จำนวน"]}</td>
                                            <td>{data2["จำนวนเงิน"]}</td>
                                            <td>{data2["ราคา"]}</td>
                                            <td>{data2["ภาษีมูลค่าเพิ่ม"]}</td>
                                            <td>{data2["จำนวนเงิน2"]}</td>
                                            
                                        
                                            <td>    
                                                <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"></input>
                                            </td>
                                        </tr>
                                        )
                                        }                
                                    </tbody>
                                    
                

                                </table>
                                <div className={styles.button}>
                                        <button className={styles.press}>เพิ่ม</button>
                                        <button className={styles.press}>ลบ</button>
                                </div>
                                <div className = {styles.result}>
                                        <p>
                                            <label>รวม : </label>
                                            <input></input>
                                            <label> บาท</label>
                                            
                                        </p>
                                        <p>
                                            <label>ภาษีมูลค่าเพิ่ม 7.00% : </label>
                                            <input></input>
                                            <label> บาท</label>

                                        </p>
                                        <p>
                                            <label>รวมยอดเงินสุทธิ : </label>
                                            <input></input>
                                            <label> บาท</label>


                                        </p>



                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.zone1}>
                        <div className={styles.buttonstyles} >
                            <button className = {styles.createbutton}>สร้างใบเสร็จ</button>
                            <button className = {styles.cancelbutton}>ยกเลิกใบเสร็จ</button>
                            <button className = {styles.editbutton}> แก้ไข</button>
                            <button className = {styles.savebutton}>บันทึก</button>
                            <button className = {styles.cancelbutton2}>ยกเลิก</button>
                            
                            
                        </div> 
                    </div>
                </div>
                
            </div>

        </>
    )
}