
import { useEffect, useState } from 'react';

import {formatDate} from '../../../general_functions/convert'


export const Rowmeter =( { room ,index , _metertype, handler_onchnage , handler_meterid_to_value  ,handler_save}) =>{

    const [name , setname] = useState("")
    const [metername , setmetername] = useState("")
    const [device_model ,setdevice_model] = useState("")
    const [datestart , setdatestart] = useState("")
    const [unitstart , setunitstart] = useState("")
    const [datefinished , setdatefinished] = useState("")
    const [unitfinished , setunitfinished] = useState("")

    const [datelast , setdatelast] = useState("")
    const [unitlast , setunitlast] = useState("")


    const handler_click_update_last_to_finished = () =>{
        setdatefinished(datelast)
        setunitfinished(unitlast)
    }
    const handler_click_update_finished_to_start =() =>{
        console.log('yoyo update')
        setdatestart(datefinished)
        setunitstart(unitfinished)
    }

    const click_readmeter = (id)=>{
    if(handler_meterid_to_value){
    setdatelast( handler_meterid_to_value( id , _metertype ) ) 
    }
    let now = new Date()
    setdatelast( formatDate (now) )
    }

    
    useEffect(()=>{
       
    setname ( room.name ?room.name : '---')
    setmetername( room.meterroom.name ? room.meterroom.name : '---' )
    setdevice_model(  room.meterroom && room.meterroom.device_model ? room.meterroom.device_model : '---' )
    setdatestart(room.meterroom && room.meterroom.inmemory_kwh_date ?  _metertype === 'ค่าไฟ'  ? room.meterroom.inmemory_kwh_date : room.meterroom.inmemory_water_date: '')
    setunitstart( room.meterroom ? ( _metertype === 'ค่าไฟ'  ? 
                                    isNaN( room.meterroom.inmemory_kwh ) === false ? room.meterroom.inmemory_kwh  : "" :
                                    isNaN(  room.meterroom.inmemory_water  )  === false ?  room.meterroom.inmemory_water  :  ""): ''
                                )
     setdatefinished (           room.meterroom ? (
                                _metertype === 'ค่าไฟ'  ?  
                                ( room.meterroom.inmemory_finished_kwh_date ? room.meterroom.inmemory_finished_kwh_date : '' )  :
                                ( room.meterroom.inmemory_finished_water_date ?  room.meterroom.inmemory_finished_water_date   : '') 
                                    ) :  "---"
                        )
    setunitfinished( room.meterroom ? ( _metertype === 'ค่าไฟ'  ? 
                                    isNaN( room.meterroom.inmemory_finished_kwh ) === false ? room.meterroom.inmemory_finished_kwh  : "" :
                                    isNaN(  room.meterroom.inmemory_finished_water  )  === false ?  room.meterroom.inmemory_finished_water  :  ""): ''
                   )
    },[name , _metertype])
    return (
        <>

                    
                {  room ?
                <>
                        <tr key={index}>
                             {/* ชื่อห้อง	*/}
                        <td>
                            <div>
                                <input type="text" value={name} disabled="disabled" ></input>
                            </div>
                        </td>
                             {/* ชื่อมิตเตอร์*/}
                        <td>
                            <div>
                                <input type="text" value={metername}  disabled="disabled" ></input>
                            </div>
                        </td>
                            {/* รุ่น */}
                        <td>
                            <div>
                                <input type="text" disabled="disabled"  value={device_model} ></input>  
                            </div>
                        </td>
                            {/* วันเริ่มต้น	 */}
                        <td>
                            <div>
                                <input type="date" value={ datestart }  onChange={(e)=>{setdatestart(e.target.value)}} ></input> 
                            </div>
                        </td>
                             {/* หน่วยเริ่มต้น	 */}
                        <td>
                            <div>
                                <input type="text"
                                value={unitstart}
                                onChange={(e)=>{setunitstart(e.target.value)}}
                                ></input>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button onClick={()=>{ handler_click_update_finished_to_start() } }> {`<`} </button>
                            </div>
                        </td>
                            {/* วันสิ้นสุด */ }
                        <td>
                            <div>
                                <input type="date" value = { datefinished}   onChange={(e)=>{setdatefinished(e.target.value)}} ></input>
                            </div>
                        </td>
                         {/* หน่วยสิ้นสุด */ }
                        <td>
                            <div>
                                <input type="text" value= { unitfinished } onChange={(e)=>{setunitfinished(e.target.value)}}></input>
                            </div>
                        </td>
                         {/* ผลต่าง	 */}
                        <td>
                            <div>
                                <input type="text" value= {  unitfinished !== "" &&  unitstart !== "" ? unitfinished- unitstart : "" }  ></input>
                            </div>
                        </td>
                        {/* จำนวนหน่วย	 */}
                        <td>
                            <div>
                                <input type="text" value= {  unitfinished !== "" &&  unitstart !== "" ? Math.abs( unitfinished- unitstart) : "" }  ></input>
                            </div>
                        </td>

                        <td>
                        <div>
                                <button onClick={()=>{handler_click_update_last_to_finished()  } }> {`<`} </button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <input type="date" value={datelast} onChange= {(e)=>{setdatelast(e.target.value)}}></input>
                            </div>
                        </td>
                        
                        <td>
                            <div>
                                <input type="text" value={unitlast} onChange= {(e)=>{setunitlast(e.target.value)}} ></input>
                            </div>
                        </td>
        
                        <td>
                            <div>
                                <button onClick={()=>{ click_readmeter(room.meterroom.id)   }}> อ่านค่า </button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <label> {(true) ?  "OK" :"ERROR"}  </label>
                            </div>
                        </td>
                        <td>
                            <div>
                                <button onClick={()=>{ handler_save(room.meterroom.id) }}> Save</button>
                            </div>
                        </td>
                    </tr>
                 </>   
                   
                    
                :null
                }
            </>
    )
}