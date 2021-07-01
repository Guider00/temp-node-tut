
import { useEffect, useState } from "react"
import styles from "./Portmeter.module.css"
import Add from '@material-ui/icons/Add';
import Table from '../../../subcomponents/Table/Table'

import { Floormodal } from '../Floor/Floormodal'


import {  API_createPortmeter, API_updatePortmeter, API_deletePortmeter,  API_queryPortmeterByid, API_queryPortmeters } from '../../../API/index'


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
        } else {
            setshowmodal(false) // Alert
        }
        setload(false)
    }

    const Delete = (id) => {
        API_deletePortmeter(id)
        setload(false)
    }

    const API_query = async () =>{
        return new Promise( async (resolve , rejcet) =>{
            let res = await API_queryPortmeters()
            let table = []
            if (res && res.status === 200) {
               
                table = res.data.Portmeters.map((data) => {
                    let _data = data
                   
                    return {...{ data: _data},  ...data }
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
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "protocol",
                        property: "protocol",
                        form: {
                            displayform:"select",
                            options:[

                                {value:`Modbus_Serial`,label:"Modbus_Serial"},
                                {value:`Modbus_TCP/IP`,label:`Modbus_TCP/IP`},
                                {value:`MQTT/Lora`,label:`MQTT/Lora`},
                             ],
                            value: "Modbus_TCP/IP"
                        }
                    },
                    {
                        label: "comport",
                        property: "comport",
                        form: {
                            displayform: "select",
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
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "stopbits",
                        property: "stopbits",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "databits",
                        property: "databits",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "autoreconnect",
                        property: "autoreconnect",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "ipaddress",
                        property: "ipaddress",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "tcp_port",
                        property: "tcp_port",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "topic",
                        property: "topic",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "readtimeout",
                        property: "readtimeout",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "writetimeout",
                        property: "writetimeout",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
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
    }, [_load])




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