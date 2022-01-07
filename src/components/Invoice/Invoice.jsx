
import styles from './Invoice.module.css';
import PaymentIcon from '@mui/icons-material/Payment';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import { API_GET_Invoice,API_ADD_Invoice,API_DELETE_Invoice,API_UPDATE_Invoice} from '../../API/Schema/Invoice/Invoice'
import { useQuery , useMutation } from '@apollo/client';
import { useEffect , useState } from 'react';


const filter_rooms = (rooms , options_search) =>{
    let _filter_table = []
    if(rooms && options_search){
        _filter_table = rooms.filter(room =>{
            if(room){
                if(options_search.keyword === 'ทั้งหมด'){
                    return (room.id && room.id.search(options_search) !== -1) ||
                    (room.monthlybilling && room.monthlybilling.search(options_search.text) !== -1 ) ||
                    (room.room.name && room.room.name.search(options_search.text) !== -1 ) ||
                    (room.status && room.status.search(options_search.text) !== -1 ) ||
                    (room.printstatus && room.printstatus.search(options_search.text) !== -1 ) ||
                    (room.duedateinvoice && room.duedateinvoice.search(options_search.text) !== -1 ) ||
                    (options_search.text === '')	
                }else if(options_search.keyword === 'ชื่อห้อง'){
                    return (room.room.name.search(options_search.text) !== -1 )||
                    (options_search.text === '')

                }else if(options_search.keyword === 'รอบบิล'){
                    return (room.monthlybilling.search(options_search.text) !== -1 )||
                    (options_search.text === '')

                }else{
                    return false;
                }
            }
            else{
                return false
            }
        })
    }
    return _filter_table



}




export const Invoice = () => {

    const Invoice = useQuery(API_GET_Invoice)


    const [ options_search  ,setoptions_search] = useState({
		text:"",
		keyword:"ทั้งหมด"
	})
    const [ IDrooms, setIDrooms] = useState([])
    const [rooms , setrooms] = useState([])
    const [ filterrooms , setfilterrooms] = useState([])
    const [ deleteInvoice , mutationdeleteInvoice] = useMutation(API_DELETE_Invoice);
    const [ selectrooms , setselectrooms ] = useState([])

    const selectAll = () =>{
        let myCheckboxMain = document.querySelector('#select-all');
        let myCheckboxName = document.getElementsByName('myCheckboxName');
        let myCheckboxNameLen = myCheckboxName.length
        
        if(myCheckboxMain.checked == true  ){
            for (var x=0; x<myCheckboxNameLen; x++){
                myCheckboxName[x].checked=true;
                
                }

            let _IDrooms = filterrooms.map((room)=> {
                return {...room}
            })
            setIDrooms(_IDrooms);
            

        }
      
        
        else{
            for (var x=0; x<myCheckboxNameLen; x++){
                myCheckboxName[x].checked=false;
                }
            
            let _IDrooms = IDrooms.filter(item => item !== item)
            setIDrooms(_IDrooms)
           

            

        }

  

    }

    


    useEffect (()=>{

        if(Invoice && Invoice.data && Invoice.data.Invoices){
            let _rooms = rooms
            _rooms = Invoice.data.Invoices
            setrooms(_rooms)
            setfilterrooms(_rooms)
            console.log(Invoice.data.Invoices)
            
        }
        
        
        

    },[ Invoice ,rooms ,IDrooms])


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
                                    <input className = {styles.side1} type = 'date'/>

                                    <lable>ถึง</lable>
                                    <input className = {styles.side2} type = 'date'/>

                                    <lable>แสดงผล</lable>
                                    <input className = {styles.side3} placeholder='0.00'></input>
                                    <lable>เดือน</lable>
                                </div>
                                <div className = {styles.part2}>
                                <input  type = "radio"></input>
                                    <lable className = {styles.semirem}>รอบบิล</lable>
                                    <input className = {styles.side1} type = 'date'/>

                                    <lable>ถึง</lable>
                                    <input className = {styles.side2} type = 'date'/>

                                </div>
                                <div className = {styles.part3}>
                                    <input type = "checkbox" id = 'select-all' onChange={selectAll}/>
                                    <lable className = {styles.onerem}>เลือกทั้งหมด</lable>

                                </div>
                                
                            </div>
                            <div className = {styles.main}>
                                <div className = {styles.research}>
                                    <input className = {styles.input1}
                                    type="text"
                                    value={options_search.text}
                                    onChange={(e) => {
                                        let _options_search = options_search
                                        _options_search.text = e.target.value 
                                        setoptions_search({..._options_search})
                                    }}/>
                                    <select className = {styles.input3}
                                        value={options_search.keyword}
                                        onChange={(e)=>{
                                            let _options_search = options_search
                                            _options_search.keyword = e.target.value
                                            setoptions_search({..._options_search})
                                            
                                        }}
                                    
                                    
                                    >
                                        <option>ทั้งหมด</option>
                                        <option>ชื่อห้อง</option>
                                        <option>รอบบิล</option>
            
                                        
                                    </select>
                                    <button className = {styles.input2}
                                    onClick={ async () =>{
                                        let _filter_rooms = []
                                        _filter_rooms = filter_rooms(rooms , options_search)
                                        setfilterrooms(_filter_rooms);
                                        
                                    }}
                                    
                                    >กรอง</button>
                                    
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
                                <tbody className ={styles.body}>{filterrooms.map( (data) =>
                                    <tr
                                    onClick={()=>{

                                        let _selectrooms = selectrooms
                                        _selectrooms = data.id
                                        setselectrooms(_selectrooms)
                                        console.log(_selectrooms)
                                    }}
                                    style={{
                                        background: selectrooms === data.id ? 'lightgray' : 'none'

                                        
                                    }}>
                                        <td>    
                                            <input type="checkbox" 
                                            name = "myCheckboxName" 
                                            id="myCheckboxId"
                                            onChange={(e)=>{
                                                const checked = e.target.checked
                                                const id = data.id
                                                if(checked){
                                                    let _IDrooms = IDrooms
                                                    _IDrooms = [..._IDrooms,data]
                                                    setIDrooms(_IDrooms)
                                                    console.log("check",_IDrooms)

                                                    
                                                }
                                                else{
                                                    let _IDrooms = IDrooms.filter(item => item.id !== id)
                                                    setIDrooms(_IDrooms)
                                                    console.log('uncheck',_IDrooms)
                                                }
                                            }}
                                            />
                                            </td>
                                        <td>{data.id}</td>
                                        <td>{data.room.name ? data.room.name : '---'}</td>
                                        <td>{data.duedateinvoice ? data.duedateinvoice : '---'}</td>
                                        <td>{data.status ? data.status : '---'}</td>
                                        <td>{data.printstatus ? data.printstatus : '---'}</td>
                                        <td>{data.monthlybilling ? data.monthlybilling : '---'}</td>
                                        
                                    </tr>
                                        )
                                            }                
                                </tbody>




                            </table>
                            
                            
            
                        </div>
                        <div className = {styles.box3}> 
                            <button className = {styles.button1}>
                                <i><LocalPrintshopIcon/></i>
                                <div>พิมพ์ทั้งหมดที่เลือก</div>
                            </button>
                            <button className = {styles.button2}
                            >
                                <i><PaymentIcon/></i>
                                <div>ชำระทั้งหมดที่เลือก</div>
                                </button>
                            <button className = {styles.button3} 
                            onClick={ async ()=>{
                                let myCheckboxName = document.getElementsByName('myCheckboxName');
                                let myCheckboxNameLen = myCheckboxName.length
                
                                Promise.all(IDrooms).then((IDrooms)=>{
                                    IDrooms.map(async (room)=>{
                                   
                                        let _res = await deleteInvoice({
                                            variables:{
                                                id:`${room.id}`
                                                }
                                            })
                                            
                                        if(_res){
                                            
    
    
                                            for (var x=0; x<myCheckboxNameLen; x++){
                                                myCheckboxName[x].checked=false;
                                                }
                                            
                                            let _IDrooms = IDrooms.filter(item => item !== item)
                                            setIDrooms(_IDrooms)
    
                                            console.log('_IDrooms_IDrooms',_IDrooms)
                                            
                                            
    
                                            Invoice.refetch();
        
                                            }
                                        else{
                                            console.log('error')
                                            }
    
                                            
                                            
                                            
    
    
    
                                            
    
                                       
                                    }
                                    
                                    )

                                })
                            }
                            }
                            
                            >
                                <i><DoNotDisturbIcon/></i>
                                <div>ยกเลิกทั้งหมดที่เลือก</div>
                            </button>
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
                                        <input className = {styles.input1} placeholder='0.00'></input>
                                        <input className = {styles.input2} type = 'date' />
                                    </div>
                                    <div className = {styles.input}>
                                        <label className = {styles.rightrem}>น้ำ</label>
                                        <input className = {styles.input3} placeholder='0.00'></input>
                                        <input className = {styles.input2} type = 'date' />
                                    </div>

                                </div>
                                <div className = {styles.topic3}>
                                    <label className = {styles.text1} >ล่าสุด</label>
                                    <label className = {styles.text2}>วันที่บันทึก</label>
                                    <div className = {styles.input}>
                                        <input className = {styles.input1} placeholder='0.00'></input>
                                        <input className = {styles.input2} type = 'date' />
                                    </div>
                                    <div className = {styles.input}>
                                        <input className = {styles.input1} placeholder='0.00'></input>
                                        <input className = {styles.input2} type = 'date' />
                                    </div>

                                </div>                              
                            </div>
                            
                            <div className = {styles.topic4}>
                                <lable className = {styles.text1} >วันที่เริ่ม</lable>
                                <lable className = {styles.text2} >วันที่สิ้นสุด</lable>
                                <lable className = {styles.text3} >ค่าโทรศัพท์</lable>
                                <div className = {styles.input}>
                                    <lable className = {styles.text4} >โทรศัพท์</lable>
                                    <input className = {styles.input1} type = 'date'/>
                                    <input className = {styles.input2} type = 'date'/>
                                    <input className = {styles.input3} placeholder='0.00'/>
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
                                                <input type="checkbox" 
                                         
                                    
                                                
                                
                                                
                                                />
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
                                        <input className = {styles.onerem} placeholder='0.00'></input>
                                        <lable className = {styles.onerem}>บาท</lable>
                                    </div>
                                    <div className = {styles.head}>
                                        <lable>ภาษีมูลค่าเพิ่ม 7%</lable>
                                        <input className = {styles.onerem} placeholder='0.00'></input>
                                        <lable className = {styles.onerem}>บาท</lable>
                                    </div>
                                    <div className = {styles.head}>
                                        <lable>รวมยอกเงินสุทธิ</lable>
                                        <input className = {styles.onerem} placeholder='0.00'></input>
                                        <lable className = {styles.onerem}>บาท</lable>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                            
                            

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
                <div class = {styles.buttonzone}>



                </div>
            </div>
        </>
    )
}