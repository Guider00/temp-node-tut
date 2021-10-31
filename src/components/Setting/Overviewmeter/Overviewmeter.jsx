
import React from "react";
import {
  useSubscription,
  gql,
} from "@apollo/client";

import { useEffect, useState ,useRef } from 'react';


import styles from "./Overviewmeter.module.css"

import Icon from '@material-ui/core/Icon/'

import { API_queryRooms ,API_queryBuildings , API_updateMeterRoomkwh ,API_updateMeterRoomwater } from  '../../../API/index'

import {Rowmeter} from './Rowmeter'
import {Child} from './Child'


import { jsPDF } from "jspdf";
import {AddFont_jsPDF } from './AddFont'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'


AddFont_jsPDF(jsPDF);
const doc = new jsPDF();

const export_pdf  = ( timestart , timeend , building ,unitprice , roomstart , roomend) =>{
    console.log('export pdf ')
     let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
     let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
     doc.setFont("angsa",'normal');
     doc.setFontSize(36);
    doc.text('รายงานยอดรวมการใช้ไฟฟ้า', pageWidth / 2, 24, {align: 'center'});
    
    doc.setFontSize(24);

    doc.text(`เริ่ม ${timestart ? timestart :  "--/--/----  --:--" }`,pageWidth / 4,24*2 ,{align: 'center'})
    doc.text(`ถึง ${timeend ? timeend :"--/--/----  --:--" }`,3*pageWidth / 4,24*2 ,{align: 'center'})


    doc.text(`อาคาร ${building ? building :"---"}`,pageWidth / 4,24*3 ,{align: 'center'})
    doc.text(`ราคา/หน่วย ${unitprice ? unitprice :"---"}`,3*pageWidth / 4,24*3 ,{align: 'center'})

    doc.text(`ห้องเริ่มต้น ${roomstart ? roomstart:"---"}`,pageWidth / 4,24*4 ,{align: 'center'})
    doc.text(`ห้องสิ้นสุด ${roomend ? roomend : "---"}`,3*pageWidth / 4,24*4 ,{align: 'center'})


     let drawCell = function(data) {
        var doc = data.doc;
        var rows = data.table.body;
        if (rows.length === 1) {
        } else if (data.row.index === rows.length - 1) {
            doc.setFont("angsa",'normal');
            doc.setFontSize("10");
            doc.setFillColor(255, 255, 255);
        }
        };

    doc.autoTable({
    headStyles: { fillColor: '#bde4d1', textColor: '#333333' , fontStyle: 'angsa' },
    head: [['ห้อง', 'รุ่น', 'ชื่อมิตเตอร์','เริ่ม','สิ้นสุด','ผลต่าง','ราคา','อัตราส่วนต่อการใช้ไฟทั้งหมด (%)']],
    body: [
        ['209', 'KM-24-L', 'M209','150','200','50','250','20'],
      
    ],
    willDrawCell: drawCell,

    startY: 120
    })

/** Perview PDF  */
var string = doc.output('datauristring');
var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close();

  //  doc.save("สรุปค่าไฟ.pdf");
}




const GET_MESSAGES = gql`
  subscription {

    subdevicemeterrealtime{
        id
        port
        device
        tag
        value
    }
  }
`;
const getBuilding = async () =>{
     return new Promise(async (resolve,reject)=>{
        let res = await API_queryBuildings()
        console.log('query Building ',res)
        let table =[]
        if(res && res.status === 200){
            table =  res.data.Buildings.map((data) =>{
                let _data = data
                return {
                     id:data.id ,
                     name:data.name,
                     data:_data ,

                }
            } )
        }

        resolve(table)
     }).catch(e =>{
        console.log('Promise Error',e)
        return []
     })
}

const getRooms = async () =>{
    return new Promise(async (resolve,reject)=>{
        let res = await API_queryRooms()
        console.log('query Room ',res)
        let table =[]
        if(res && res.status === 200){
            table =  res.data.rooms.map((data) =>{
                let _data = data
                return {
                    id:data.id ,data:_data ,
                    building:data.building ? data.building.name:"---",
                    floor:data.floor ? data.floor.name:'---',
                    name:data.name, 
                    status:data.status ? data.status:'---',
                    member:data.member ? data.member.name : '---',
                    metername:data.meterroom ? data.meterroom.name : '---',
                    meterroom:data.meterroom ? data.meterroom : '---'
                }
            } )
        }

        resolve(table)
    }).catch(e =>{
        console.log('Promise Error',e)
        return []
    })
}



export const Overviewmeter = () => {

    const { data } = useSubscription(GET_MESSAGES);
    const { mqtthistory_packets } = data? data:{ mqtthistory_packets : null}

    const [ _overviewmeter , setoverviewmeter] = useState([])

    const [ _metertype , setmetertype] = useState('ค่าไฟ')
    const [ _meterbuilding , setmeterbuilding] = useState('All')
    const [ _optinbuilding , setoptionbuilding] = useState([])


     const metertable = useRef(null);
    const itemEls = useRef(new Array())

    const [_loading ,setloading] = useState(false)
    useEffect(  ()=>{
        async function fetchData(){
         let Rooms = await getRooms()
         let Building = await getBuilding()

       console.log('Building' , Building)
       console.log('Rooms' , Rooms)

       setoverviewmeter(Rooms)
       setoptionbuilding(Building)
  
        }
        
        fetchData();
        setloading(true)
    },[_loading , _metertype])

    const handler_realmeter  = (id) =>{

    }
    const getmeter_data = ( fn ) =>{
        return  (fn)
    }
    const handler_saveallmeter = ( meters ) =>{
        console.log('_overviewmeter',_overviewmeter)
        let list_meter = itemEls.current.map(item => item.getdata() )

        console.log(list_meter)
        if(meters && meters.length )
        {

        } 

    }
    const handler_save = async ( meterid , data) =>
    {
        if(meterid  &&  data)
        {
            console.log('id',meterid )
            console.log('meter data ' , data)
             
            
            
              try{
             let input = {}
             let resulte ; 

             if(data._metertype === 'ค่าไฟ'){
                 input = { inmemory_kwh : data.unitstart  , inmemory_kwh_date : data.datestart ,  inmemory_finished_kwh : data.unitfinished , inmemory_finished_kwh_date : data.datefinished}
                 resulte  =   await API_updateMeterRoomkwh(meterid , input)
             }else if(data._metertype === 'ค่าน้ำ'){

                 input = { inmemory_water : data.unitstart  , inmemory_water_date : data.datestart ,  inmemory_finished_water : data.unitfinished , inmemory_finished_water_date : data.datefinished}
                 resulte  =   await API_updateMeterRoomwater(meterid , input)
             }
   
 
           
         
             console.log( 'sendupdate meter ' , resulte)
            }catch(e){
                console.log(e)
            }

        }else{
            console.log('error' , 'with out meter ')
        }
    }

    const handler_meterid_to_value = (id , type ) =>{
        if( type && id){
            
            console.log('meter id' ,id)
            console.log('type' , type)
            if(type === 'ค่าไฟ'){
                console.log('data',data)

            }else if(type === 'ค่าน้ำ'){
                
            }

        }else{
            return ""
        }
    }

      console.log('_overviewmeter',_overviewmeter)
    return (
        <>

        <div className={styles.menu_top} >
            <div>
                <label> หน่วย </label>
                <select value= {_metertype} onChange={(e)=>(setmetertype(e.target.value))} >
                     <option value="ค่าไฟ"> ค่าไฟ </option>
                    <option value="ค่าน้ำ"> ค่าน้ำ </option>
                </select>
            </div>

            <div>
                <label> อาคาร </label>
                <select value={_meterbuilding} onChange={(e)=>{ setmeterbuilding(e.target.value)   }}>
                <option value="ALL"> ทั้งหมด</option>
                {_optinbuilding.map(building =>( <option value={building.id} > {building.name} </option> ) )}
                </select>
            </div>

            <div>
                 <button> กำหนดค่าเริ่มต้นใหม่ </button>
            </div>
            <div>
                 <button>  กำหนดค่าสิ้นสุด  </button>
            </div>
            <div>
                <button  onClick={()=>{ console.log('read all meter ') } }> อ่านค่า ทั้งหมด</button>
            </div>
        </div>
        <div className={styles.table_body}>
            <div>
            <table   id="metertable">
                <tr>
                    <th>ชื่อห้อง</th>
                    <th>ชื่อมิตเตอร์</th>
                    <th>รุ่น</th>
                    <th>วันเริ่มต้น</th>
                    <th>หน่วยเริ่มต้น</th>
                    <th>update ค่าเริ่มต้น</th>
                    <th>วันสิ้นสุด</th>
                    <th>หน่วยสิ้นสุด</th>
                    <th>ผลต่าง</th>
                    <th>จำนวนหน่วย</th>
                    <th>update ค่าสิ้นสุด</th>
                    <th>วันที่</th>
                    <th>หน่วยล่าสุด</th>
                    <th>update หน่วยล่าสุด</th>
                    <th>สถานะ</th>
                    <th></th>
                </tr>
                 {  _overviewmeter.length > 0 ? _overviewmeter.map( (room,index) =>( 
                        <Rowmeter    room={room} index={index} _metertype={_metertype}  handler_meterid_to_value ={handler_meterid_to_value } handler_save={handler_save} />
                 )): null
                 
                }

                
            </table>
            </div>
        </div>
        {/* <div>
             {  _overviewmeter.length > 0 ? _overviewmeter.map( (room,index) =>( 
                        <Child  ref={(element) => itemEls.current[index] = element }  room={room} index={index} _metertype={_metertype}  handler_meterid_to_value ={handler_meterid_to_value } handler_save={handler_save} />
                 )): null
                 
            }
            
        </div> */}
        <div className={styles.menu_end}>
            <div className={styles.zone_right}>
                <div>
                    <button  onClick={()=>{}}>
                        ตั้งค่าเริ่มต้นจากข้อมูลใบแจ้งหนี้
                    </button>
                </div>
                <div>
                    <button onClick={()=>{handler_saveallmeter()}}>
                        <Icon>save</Icon>
                    </button>
                </div>
                <div>
                    <button  onClick={()=>{ export_pdf ()}} >
                        คำนวณค่าไฟ
                        <Icon>receipt</Icon>
                    </button>
                </div>
              
               
            </div>
        </div>

          
            
        {
         mqtthistory_packets ? mqtthistory_packets.map( ({topic,payload},index)=>(
                <div key={index}>
                     <p>topic = {topic}</p>
                     <p>payload = {payload}</p>
                </div>
            )):null
        }
        </>
    )
}