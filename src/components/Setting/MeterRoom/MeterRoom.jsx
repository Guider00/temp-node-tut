
import { useEffect, useState } from "react"
import styles from "./MeterRoom.module.css"
import Add from '@material-ui/icons/Add';
import Table from '../../../subcomponents/Table/Table'

import { Floormodal } from '../Floor/Floormodal'

import { Validate } from '../../../subcomponents/Regex/Regex'
// import { data_display } from '../../../subcomponents/Universal_function'

import {  API_createMeterRoom, API_updateMeterRoom, API_deleteMeterRoom,   API_queryMeterRooms } from '../../../API/index'
import {  API_queryPortmeters } from "../../../API/index";



export const MeterRoom = () => {
    const [_members, setmeterrooms] = useState({
        topic: [],
        body: [],
        inputs: []

    })


    const handleronchange = (value, index) => {
        console.log('on change')
        _members.inputs = _members.inputs.map((item, _index) => {
            if (_index === index) {
                console.log(value)
                return { ...item, form: { ...item.form, "value": value } }; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
        });
        let catch_value = _members
        setmeterrooms({ ...catch_value })

    }

    const [_load, setload] = useState(false);

    const [_showmodal, setshowmodal] = useState(false);
    const [_modaldata, setmodaldata] = useState({});
    const [_modalaction, setmodalaction] = useState("");


    const OnClickCreate = (data) => {
        console.log('create',data)
         setmodaldata({ ...data })
        setmodalaction("Create")
        setshowmodal(true)

    }

    const onClickEdit = (id, data) => {
        console.log("Update", id, data)
       
        _members.inputs = _members.inputs.map((item, _index) => {
            if (item.property && data.hasOwnProperty(item.property)) {
                if (data[item.property] && typeof data[item.property] === 'object' && data[item.property].hasOwnProperty("id")) {
                    
                    return { ...item, form: { ...item.form, "value": data[item.property].id } }; //gets everything that was already in item, and updates "done"
                } else {
                  
                    return { ...item, form: { ...item.form, "value": data[item.property] } }; //gets everything that was already in item, and updates "done"
                }
            } else if(  typeof item.property === 'object'  && item.property.length > 0 &&  data.hasOwnProperty(item.property[0])){
                 // cause multiple property 
                if (data[item.property[0]] && typeof data[item.property[0]] === 'object' && data[item.property[0]].hasOwnProperty("id")) {
                    return { ...item, form: { ...item.form, "value": data[item.property[0]].id } }; //gets everything that was already in item, and updates "done"
                }else{
                    return { ...item, form: { ...item.form, "value": data[item.property[0]] } }; //gets everything that was already in item, and updates "done"

                }
            }else {
                return { ...item, }
            }
        });
        let catch_value = _members
        setmeterrooms({ ...catch_value })
        setmodaldata({ ...data })  // <<set id input
        setmodalaction("Update") // << action type
        setshowmodal(true)
    }
    const onClose = () => {
        setshowmodal(false)
    }
    const onSave = async (id, inputs, action) => {
        console.log(action)
        let data = inputs.map(item => {
            if(typeof item.property === 'object' && item.property.length ){
                return { [item.property[0]]: item.form.value }
            }else{
                return { [item.property]: item.form.value }
            }

        }).reduce((accumulator, currentValue) => {
            return { ...accumulator, ...currentValue }
        })

        console.log('Update id data', id, data)

        let res
        if (action === "Update" && id) {
            res = await API_updateMeterRoom(id, data)
        } else if (action === "Create") {
            res = await API_createMeterRoom(data)
        }

        if (res && res.status === 200) {
            setshowmodal(false)
        } else {
            setshowmodal(false) // Alert
        }
        setload(false)
    }

    const Delete = (id) => {
        API_deleteMeterRoom(id)
        setload(false)
    }

    const API_query = async () =>{
        return new Promise( async (resolve , rejcet) =>{
            let res = await API_queryMeterRooms()
            let table = []
            if (res && res.data && res.data.MeterRooms && res.status === 200) {
      
                table = res.data.MeterRooms.map((data) => {
                    let _data = data
                    let _portmeter  =  (data.portmeter  &&  data.portmeter.name )  ? data.portmeter.name  :""
                    return {...{ data: _data},  ...data , ...{portmeter:_portmeter} }
                })
     
                console.log('data',table)
                resolve (table)
            }else{
                resolve(table)
            }
        }).catch(e =>{
            console.log(e)
           return ([])
        })


    }


    useEffect(() => {
        const getAPI = async () => {

            let table = await API_query()
            console.log('table',table)

        
            let  { data }           = await  API_queryPortmeters()
            let  { Portmeters }  = data ? data :{Portmeters:[] }
            let _option_ports  = Portmeters.map( _port => {
               return ( {'value': _port.id.toString() ,'label': _port.name , } )
            })
            _option_ports = [ {'value': "" ,'label':"" } , ..._option_ports ]
            console.log('_option_ports',_option_ports)
            setmeterrooms({
                showindex: true,
                topic: [ 
                          "metername", "port","model"," Address","deveui","appeui","appkey",
                          "kwh start","date" ,"real time kwh" ,
                          "water start","date" ,"real time water" ,
                          
                        ],
                body: table,
                inputs: [

                    {
                        label: "metername",
                        property: "name",
                        form: {
                            validate :  (x)=>( typeof x === 'string' && Validate('text',x) ),
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "port",
                        property: "portmeter",
                        form: {
                            displayform: "select",
                            type: "text",
                            options:  _option_ports,
                            value: ""
                        }
                    },
                    {
                        label: "model",
                        property: "device_model",
                        form: {
                            displayform: "select",
                            type: "text",
                            options:[
                                {value:``,label:""},
                                {value:`KM24L`,label:"KM24L"},
                                
                             ],
                            value: ""
                        }
                    },
 
                    {
                        label: "Address",
                        property: "device_address",
                        form: {
                            displayform: "textbox",

                            compaer_property : 'portmeter',
                            disablecondition: (x, fn)  =>( fn(x) ),
                            fn_compare: (id_portmeter)=>{   return(  
                                 Portmeters.find(x => x.id === id_portmeter ) &&  
                             Portmeters.find(x => x.id === id_portmeter ).protocol === 'MQTT/Lora' )},
                       

                            validate :  (x)=>( typeof x === 'string' && Validate('device_address',x) ),
                            type: "text",
                            value: ""
                        }
                    },

                    {
                        label: "deveui",
                        property: "deveui",
                        form: {
                            displayform: "textbox",
                            compaer_property : 'portmeter',
                            disablecondition: (x, fn)  =>( fn(x) ),
                            fn_compare: (id_portmeter)=>{   return(  
                                 Portmeters.find(x => x.id === id_portmeter ) &&  
                             Portmeters.find(x => x.id === id_portmeter ).protocol !== 'MQTT/Lora' )},

                            validate :   (x)=>( typeof x === 'string' && Validate('deveui',x) ),
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "appeui",
                        property: "appeui",
                        form: {
                            displayform: "textbox",
                            compaer_property : 'portmeter',
                            disablecondition: (x, fn)  =>( fn(x) ),
                            fn_compare: (id_portmeter)=>{   return(  
                            Portmeters.find(x => x.id === id_portmeter ) &&  
                            Portmeters.find(x => x.id === id_portmeter ).protocol !== 'MQTT/Lora' )},

                            validate :  (x)=>( typeof x === 'string' && Validate('appeui',x) ),
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "appkey",
                        property: "appkey",
                        form: {
                            displayform: "textbox",

                            compaer_property : 'portmeter',
                            disablecondition: (x, fn)  =>( fn(x) ),
                            fn_compare: (id_portmeter)=>{   return(  
                            Portmeters.find(x => x.id === id_portmeter ) &&  
                             Portmeters.find(x => x.id === id_portmeter ).protocol !== 'MQTT/Lora' )},
                             
                            validate :  (x)=>( typeof x === 'string' && Validate('appkey',x) ),
                            type: "text",
                            value: ""
                        }
                    },


                    {
                        label: "kwh start",
                        property: "inmemory_kwh",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "date",
                        property: "inmemory_kwh_date",
                        form: {
                            displayform: "textbox",
                            type: "date",
                            value: ""
                        }
                    },
                    {
                        label: "realtime kwh",
                        property: "realtime_kwh",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "water start",
                        property: "inmemory_water",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "date",
                        property: "inmemory_water_date",
                        form: {
                            displayform: "textbox",
                            type: "date",
                            value: ""
                        }
                    },
                    {
                        label: "realtime water",
                        property: "realtime_water",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    
                ]
            })
            setload(true)
        }
        getAPI()
    }, [_load])




    return (
        <>
            {_showmodal ? <Floormodal Data={_modaldata} onSave={onSave} onClose={onClose} onchange={handleronchange} Action={_modalaction} Inputs={_members.inputs}></Floormodal> : null}
            <div className={styles.main} >
                <div className={styles.header}>
                    <lable> Meter Room  </lable>
                </div>

                <div className={styles.body}>

                    <div className={styles.row}>
                        <div className={styles.base40} ></div>
                        <div className={styles.base60} >
                            <div className={styles.text} >
                            <label> สร้าง Meter </label>
                            </div>
                            <div className={styles.btn}>
                            <button onClick={OnClickCreate} ><Add /></button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}  >
                        <Table Data={_members} onClickDelete={Delete} onClickEdit={onClickEdit}></Table>
                    </div>

                </div>

            </div>

        </>
    )
}