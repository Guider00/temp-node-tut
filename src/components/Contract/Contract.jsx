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


const filter_room = (rooms , options_search) =>{
    let _filter_table = []
    if(rooms && options_search){
        _filter_table = rooms.filter(room =>{
            if(room){
                if(options_search.keyword === 'ทั้งหมด'){
                    return (room.Contractnumber && room.Contractnumber.search(options_search.text) !== -1 ) ||
                    (room.RoomType && room.RoomType.search(options_search.text) !== -1 ) || 
                    (room.RoomName && room.RoomName.search(options_search.text) !== -1 ) ||
                    (room.RentType && room.RentType.search(options_search.text) !== -1 ) ||
                    (room.name && room.name.search(options_search.text) !== -1 ) ||
                    (room.surname && room.surname.search(options_search.text) !== -1 ) ||
                    (room.Check_in && room.Check_in.search(options_search.text) !== -1 ) ||
                    (room.status && room.status.search(options_search.text) !== -1 ) ||
                    (room.Check_out && room.Check_out.search(options_search.text) !== -1 ) ||
                    (options_search.text === '')	
                    ;

                }else if (options_search.keyword === 'ชื่อห้อง'){
                    return (room.RoomName.search(options_search.text) !== -1 )||
                    (options_search.text === '')	
                }else if( options_search.keyword === 'สถานะ' ){
                    return (room.status.search(options_search.text) !== -1 )	||
                    (options_search.text === '')	
                }else if( options_search.keyword === 'ประเภทห้อง'){
                    return (room.RoomType && room.RoomType.search(options_search.text) !== -1 )	||
                    (options_search.text === '')		
                }else{
                    return false; 
                }
            }else{
                return false;
            }

        })
    }
    return _filter_table
}





export const Contract = () => {


    const Contract = useQuery(API_GET_Contract);
    
    

    const monthPage = () => {
        let monthButton = document.querySelector('#month')
        let dayButton = document.querySelector('#day')
        let inputD1 = document.getElementById('D1')
        let inputD2 = document.getElementById('D2')
        let inputD3 = document.getElementById('D3')
        let inputD4 = document.getElementById('D4')
        let inputD5 = document.getElementById('D5')
        let inputD6 = document.getElementById('D6')
        let inputD7 = document.getElementById('D7')
        let inputD8 = document.getElementById('D8')
        let inputD9 = document.getElementById('D9')
        let inputD10 = document.getElementById('D10')
        let inputD11 = document.getElementById('D11')
        let inputD12 = document.getElementById('D12')
        let inputD13 = document.getElementById('D13')

        let inputD14 = document.getElementById('D14')
        let inputD15 = document.getElementById('D15')
        let inputD16 = document.getElementById('D16')
        let inputD17 = document.getElementById('D17')
        let inputD18 = document.getElementById('D18')
        let inputD19 = document.getElementById('D19')
        let inputD20 = document.getElementById('D20')
        let inputD21 = document.getElementById('D21')
        let inputD22 = document.getElementById('D22')
        let inputD23 = document.getElementById('D23')
        let inputD24 = document.getElementById('D24')

        if(monthButton.checked == true){
            dayButton.checked = false
            inputD1.disabled=false;
            inputD2.disabled=false;
            inputD3.disabled=false;
            inputD4.disabled=false;
            inputD5.disabled=false;
            inputD6.disabled=false;
            inputD7.disabled=false;
            inputD8.disabled=false;
            inputD9.disabled=false;
            inputD10.disabled=false;
            inputD11.disabled=false;
            inputD12.disabled=false;
            inputD13.disabled=false;

            inputD14.disabled=true;
            inputD15.disabled=true;
            inputD16.disabled=true;
            inputD17.disabled=true;
            inputD18.disabled=true;
            inputD19.disabled=true;
            inputD20.disabled=true;
            inputD21.disabled=true;
            inputD22.disabled=true;
            inputD23.disabled=true;
            inputD24.disabled=true;
        }

    }

    const dayPage = () => {
        let monthButton = document.querySelector('#month')
        let dayButton = document.querySelector('#day')

        let inputD1 = document.getElementById('D1')
        let inputD2 = document.getElementById('D2')
        let inputD3 = document.getElementById('D3')
        let inputD4 = document.getElementById('D4')
        let inputD5 = document.getElementById('D5')
        let inputD6 = document.getElementById('D6')
        let inputD7 = document.getElementById('D7')
        let inputD8 = document.getElementById('D8')
        let inputD9 = document.getElementById('D9')
        let inputD10 = document.getElementById('D10')
        let inputD11 = document.getElementById('D11')
        let inputD12 = document.getElementById('D12')
        let inputD13 = document.getElementById('D13')
        

        let inputD14 = document.getElementById('D14')
        let inputD15 = document.getElementById('D15')
        let inputD16 = document.getElementById('D16')
        let inputD17 = document.getElementById('D17')
        let inputD18 = document.getElementById('D18')
        let inputD19 = document.getElementById('D19')
        let inputD20 = document.getElementById('D20')
        let inputD21 = document.getElementById('D21')
        let inputD22 = document.getElementById('D22')
        let inputD23 = document.getElementById('D23')
        let inputD24 = document.getElementById('D24')

        if(dayButton.checked == true){
            monthButton.checked = false
            inputD14.disabled=false;
            inputD15.disabled=false;
            inputD16.disabled=false;
            inputD17.disabled=false;
            inputD18.disabled=false;
            inputD19.disabled=false;
            inputD20.disabled=false;
            inputD21.disabled=false;
            inputD22.disabled=false;
            inputD23.disabled=false;
            inputD24.disabled=false;

            inputD1.disabled=true;
            inputD2.disabled=true;
            inputD3.disabled=true;
            inputD4.disabled=true;
            inputD5.disabled=true;
            inputD6.disabled=true;
            inputD7.disabled=true;
            inputD8.disabled=true;
            inputD9.disabled=true;
            inputD10.disabled=true;
            inputD11.disabled=true;
            inputD12.disabled=true;
            inputD13.disabled=true;
            
        }

    }



    

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
                        <div  className={styles.month}>
                            <lable className={styles.month}>รายเดือน :</lable>
                            <input id = 'month' type = 'radio' checked = 'true' className={styles.check} onChange={monthPage}/>
                            <div className={styles.input1}>
                                <lable className={styles.inputtext1}>ค่าเช่าห้อง :</lable>
                                <input id = 'D1' placeholder='0.00' className={styles.inputbox1}></input>
                                <lable className={styles.inputtext2}>ค่าประกัน :</lable>
                                <input  id = 'D2' placeholder='0.00' className={styles.inputbox2}></input>
                                <br/>
                                <lable className={styles.inputtext3}>ค่าเช่าล่วงหน้า :</lable>
                                <input id = 'D3' placeholder='0.00' className={styles.inputtext3}></input>
                            </div>
                            <lable className={styles.submonth}>ค่าสาธารณูปโภค</lable>
                            <div className={styles.input2}>
                                <lable className={styles.inputtext1}>คิดค่าใช้จ่าย</lable>
                                <lable className={styles.inputtext2}>อัตราบริการต่อหน่วย</lable>
                                <lable className={styles.inputtext3}>อัตราต่อขั้นต่ำ</lable>
                                <lable className={styles.inputtext4}>เหมาจ่าย</lable>
                                <br/>
                                <lable className={styles.inputtext5}>ไฟฟ้า :</lable>
                                <input id = 'D4' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                <input id = 'D5' placeholder='0.00' className={styles.inputbox1}></input>
                                <input id = 'D6' placeholder='0.00' className={styles.inputbox2}></input>
                                <lable>บาท</lable>
                                <input id = 'D7' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                <input id = 'D8' placeholder='0.00' className={styles.inputbox3}></input>
                                <lable>บาท</lable>
                                <br/>
                                <lable className={styles.inputtext7}>น้ำ :</lable>
                                <input id = 'D9' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                <input id = 'D10' placeholder='0.00' className={styles.inputbox1}></input>
                                <input id = 'D11' placeholder='0.00' className={styles.inputbox2}></input>
                                <lable>บาท</lable>
                                <input id = 'D12' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                <input id = 'D13' placeholder='0.00' className={styles.inputbox3}></input>
                                <lable>บาท</lable>
                            </div>
               
                        </div>
                        <h1 className={styles.line}></h1>
                        <div className={styles.day}>
                                <lable className={styles.day}>รายวัน :</lable>
                                <input id = 'day' type='radio' className={styles.check} onChange={dayPage}/>
                                <div className={styles.input1}>
                                    <lable className={styles.inputtext1}>ค่าเช่าห้อง :</lable>
                                    <input id = 'D14' disabled = 'disabled' placeholder='0.00' className={styles.inputbox1}></input>
                                </div>
                                <lable className={styles.subday}>ค่าสาธารณูปโภค</lable>
                                <div className={styles.input2}>
                                    <lable className={styles.inputtext1}>คิดค่าใช้จ่าย</lable>
                                    <lable className={styles.inputtext2}>อัตราบริการต่อหน่วย</lable>
                                    <lable className={styles.inputtext3}>อัตราต่อขั้นต่ำ</lable>
                                    <lable className={styles.inputtext4}>เหมาจ่าย</lable>
                                    <br/>
                                    <lable className={styles.inputtext5}>ไฟฟ้า :</lable>
                                    <input id = 'D15' disabled = 'disabled' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                    <input id = 'D16' disabled = 'disabled' placeholder='0.00' className={styles.inputbox1}></input>
                                    <input id = 'D17' disabled = 'disabled' placeholder='0.00' className={styles.inputbox2}></input>
                                    <lable>บาท</lable>
                                    <input id = 'D18' disabled = 'disabled' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                    <input id = 'D19' disabled = 'disabled' placeholder='0.00' className={styles.inputbox3}></input>
                                    <lable>บาท</lable>
                                    <br/>
                                    <lable className={styles.inputtext7}>น้ำ :</lable>
                                    <input id = 'D20' disabled = 'disabled' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                    <input id = 'D21' disabled = 'disabled' placeholder='0.00' className={styles.inputbox1}></input>
                                    <input id = 'D22' disabled = 'disabled' placeholder='0.00' className={styles.inputbox2}></input>
                                    <lable>บาท</lable>
                                    <input id = 'D23' disabled = 'disabled' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                    <input id = 'D24' disabled = 'disabled' placeholder='0.00' className={styles.inputbox3}></input>
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