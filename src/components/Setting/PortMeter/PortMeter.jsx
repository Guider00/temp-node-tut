
import { useEffect, useState } from "react"
import styles from "./Portmeter.module.css"
import {  useQuery } from '@apollo/client';

import Add from '@material-ui/icons/Add';
import Table from '../../../subcomponents/Table/Table'

import { Floormodal } from '../Floor/Floormodal'
import { Validate } from '../../../subcomponents/Regex/Regex'


import {  API_createPortmeter, API_updatePortmeter, API_deletePortmeter} from '../../../API/index'


import {   API_GET_Portmeters   } from '../../../API/Schema/PortMeter/PortMeter'

export const Portmeter = () => {
    const [_portmeters, setportmeters] = useState({
        topic: [],
        body: [],
        inputs: []

    })


    const handleronchange = (value, index) => {
        _portmeters.inputs = _portmeters.inputs.map((item, _index) => {
            if (_index === index) {
                return { ...item, form: { ...item.form, "value": value } }; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
        });
        let catch_value = _portmeters
        setportmeters({ ...catch_value })

    }

     const Portmeters = useQuery(API_GET_Portmeters);


    const [_load, setload] = useState(false);

    const [_showmodal, setshowmodal] = useState(false);
    const [_modaldata, setmodaldata] = useState({});
    const [_modalaction, setmodalaction] = useState("");


    const OnClickCreate = (data) => {
        console.log('create')
        setmodaldata({ ...data })
        setmodalaction("Create")
        setshowmodal(true)

    }

    const onClickEdit = (id, data) => {
        console.log("Update", id, data)

        _portmeters.inputs = _portmeters.inputs.map((item, _index) => {
            if (data.hasOwnProperty(item.property) && data.hasOwnProperty(item.property)) {
                if (data[item.property] && typeof data[item.property] === 'object' && data[item.property].hasOwnProperty("id")) {
                    return { ...item, form: { ...item.form, "value": data[item.property].id } }; //gets everything that was already in item, and updates "done"
                } else {
                    return { ...item, form: { ...item.form, "value": data[item.property] } }; //gets everything that was already in item, and updates "done"
                }
            } else {
                return { ...item, }
            }
        });


        let catch_value = _portmeters
        setportmeters({ ...catch_value })
        setmodaldata({ ...data })  // <<set id input
        setmodalaction("Update") // << action type
        setshowmodal(true)
    }
    const onClose = () => {
        setshowmodal(false)
    }
    const onSave = async (id, inputs, action) => {
        let data = inputs.map(item => {
            return { [item.property]: item.form.value }
        }).reduce((accumulator, currentValue) => {
            return { ...accumulator, ...currentValue }
        })

        console.log(`${action} id data`, id, data)

        let res
        if (action === "Update" && id) {
            res = await API_updatePortmeter(id, data)
        } else if (action === "Create") {
            res = await API_createPortmeter(data)
        }

        if (res && res.status === 200) {
            setshowmodal(false)
            Portmeters.refetch()
        } else {
            setshowmodal(false) // Alert
        }
        setload(false)
       
    }

    const Delete = (id) => {
        API_deletePortmeter(id)
        Portmeters.refetch()
        setload(false)
    }

    // const API_query = async () =>{
    //     return new Promise( async (resolve , rejcet) =>{
    //         let res = await API_queryPortmeters()
    //         let table = []
    //         if (res && res.status === 200) {
               
    //             table = res.data.Portmeters.map((data) => {
    //                 let _data = data
                   
    //                 return {...{ data: _data},  ...data }
    //             })
    //             console.log('data',table)
    //             resolve (table)
    //         }else{
    //             resolve(table)
    //         }
    //     }).catch(e =>{
    //         console.log(e)
    //        return ([])
    //     })


    // }


    useEffect(() => {
        const getAPI = async () => {

          
           let  table = [] 
            if(Portmeters.data){
              
                table = [...Portmeters.data.Portmeters ]
                table = table.map(item=>{
                    return {...item,data:item}
                })
            }


            setportmeters({
                showindex: true,
                topic: [ "name", "protocol",
                        "comport","baudrate","stopbits","databits","autoreconnect",
                        "ipaddress","tcp_port",
                        "topic",
                        "readtimeout","writetimeout",
                        "version"
                       ],
                body: table,
                inputs: [

                    {
                        label: "name",
                        property: "name",
                        form: {
                            displayform: "textbox",
                            validate :  (x)=>(typeof x === 'string' && x.length < 16),
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "protocol",
                        property: "protocol",
                        form: {
                            displayform:"select",
                            validate :  (x)=>(x === 'Modbus_Serial' || x === 'Modbus_TCP/IP' || x=== 'MQTT/Lora'),
                            options:[
                                {value:`Modbus_Serial`,label:"Modbus_Serial"},
                                {value:`Modbus_TCP/IP`,label:`Modbus_TCP/IP`},
                                {value:`MQTT/Lora`,label:`MQTT/Lora`},
                                {value:`Simulator`,label:`Simulator`},
                             ],
                            value: "Simulator"
                        }
                    },
                    {
                        label: "comport",
                        property: "comport",
                        form: {
                            validate :  (x)=>(typeof x === 'string' &&  x.search("COM") !== -1 ),
                            displayform: "select",
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'Modbus_Serial' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            options:[
                                {value:`COM1`,label:"COM1"},
                                {value:`COM2`,label:`COM2`},
                                {value:`COM3`,label:`COM3`},
                                {value:`COM4`,label:`COM4`},
                                {value:`COM5`,label:`COM5`},
                                {value:`COM6`,label:`COM6`},
                                {value:`COM7`,label:`COM7`},
                                {value:`COM8`,label:`COM8`},
                                {value:`COM9`,label:`COM9`},
                                {value:`COM10`,label:`COM10`},
                                {value:`COM11`,label:`COM11`},
                                {value:`COM12`,label:`COM12`},
                                {value:`COM13`,label:`COM13`},
                                {value:`COM14`,label:`COM14`},
                                {value:`COM15`,label:`COM15`},
                                {value:`COM16`,label:`COM16`},
                                {value:`COM17`,label:`COM17`},
                                {value:`COM18`,label:`COM18`},
                                {value:`COM19`,label:`COM19`},
                                {value:`COM20`,label:`COM20`},
                             ],
                            value: ""
                        }
                    },
                    {
                        label: "baudrate",
                        property: "baudrate",
                        form: {
                            validate :  (x)=>(typeof x === 'string' &&  (x ==='4800' || x === '9600'  || x === '19200' || x === '38400' || x === '57600') ),
                            displayform: "select",
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'Modbus_Serial' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            options:[
                                {value:`4800`,label:"4800"},
                                {value:`9600`,label:"9600"},
                                {value:`19200`,label:"19200"},
                                {value:`38400`,label:"38400"},
                                {value:`57600`,label:"57600"},
                             ],
                            value: "9600"
                        }
                    },
                    {
                        label: "stopbits",
                        property: "stopbits",
                        form: {
                            displayform: "select",
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'Modbus_Serial' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            options:[
                                {value:`1`,label:"1"},
                                {value:`1`,label:"2"},
                             ],
                            value: "1"
                        }
                    },
                    {
                        label: "databits",
                        property: "databits",
                        form: {
                            displayform: "select",
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'Modbus_Serial' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            options:[
                                {value:`7`,label:"7"},
                                {value:`8`,label:"8"},
                             ],
                            value: "8"
                        }
                    },
                    {
                        label: "autoreconnect",
                        property: "autoreconnect",
                        form: {
                            displayform: "select",
                            options:[
                                {value:`enable`,label:"enable"},
                                {value:`disable`,label:"disable"},
                             ],
                            type: "text",
                            value: "enable"
                        }
                    },
                    {
                        label: "ipaddress",
                        property: "ipaddress",
                        form: {
                            displayform: "textbox",
                            validate :  (x)=>( typeof x === 'string' && Validate('ipaddress',x) ),
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'Modbus_TCP/IP' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "tcp_port",
                        property: "tcp_port",
                        form: {
                            displayform: "textbox",
                            validate :  (x)=>(  typeof x === 'string' &&  Number(x) <= 20000  && Number (x) >= 1   ),
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'Modbus_TCP/IP' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "topic",
                        property: "topic",
                  

                        form: {
                            displayform: "textbox",
                            validate :  (x)=>(typeof x === 'string' ),
                            compaer_property : 'protocol',
                            fn_compare: (value)=>{ return(  value  !== 'MQTT/Lora' )},
                            disablecondition: (x, fn)  =>( fn(x) ),
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "readtimeout",
                        property: "readtimeout",
                        form: {
                            displayform: "textbox",
                            validate :  (x)=>(typeof x === 'string' &&  Number(x) <= 10000  && Number (x) >= 100 ),
                            type: "text",
                            value: "100"
                        }
                    },
                    {
                        label: "writetimeout",
                        property: "writetimeout",
                        form: {
                            displayform: "textbox",
                            validate :  (x)=>(typeof x === 'string' &&  Number(x) <= 10000  && Number (x) >= 100 ),
                            type: "text",
                            value: "100"
                        }
                    },
                    {
                        label: "version",
                        property: "version",
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
    }, [_load , Portmeters.data])




    return (
        <>
            {_showmodal ? <Floormodal Data={_modaldata} onSave={onSave} onClose={onClose} onchange={handleronchange} Action={_modalaction} Inputs={_portmeters.inputs}></Floormodal> : null}
            <div className={styles.main} >
                <div className={styles.header}>
                    <lable> Port meter </lable>
                </div>

                <div className={styles.body}>

                    <div className={styles.row}>
                        <div className={styles.base40} ></div>
                        <div className={styles.base60} >
                            <div className={styles.text} >
                            <label>createport</label>
                            </div>
                            <div className={styles.btn}>
                            <button onClick={OnClickCreate} ><Add /></button>
                            </div>

                        </div>
                    </div>
                    <div className={styles.row}  >
                        <Table Data={_portmeters} onClickDelete={Delete} onClickEdit={onClickEdit}></Table>
                    </div>

                </div>


            </div>

        </>
    )
}