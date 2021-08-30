import { useEffect, useState } from "react"
import Add from '@material-ui/icons/Add';
import styles from "./Note.module.css"

import { Floormodal } from '../Setting/Floor/Floormodal'
import Table from '../../subcomponents/Table/Table'

import {  API_createNote, API_updateNote, API_deleteNote,   API_queryNotes } from '../../API/index'


export const Note = () =>{
    const [_members, setmember] = useState({
        topic: [],
        body: [],
        inputs: []

    })

    const [_load, setload] = useState(false);

    const [_showmodal, setshowmodal] = useState(false);
    const [_modaldata, setmodaldata] = useState({});
    const [_modalaction, setmodalaction] = useState("");

    const handleronchange = (value, index) => {
        _members.inputs = _members.inputs.map((item, _index) => {
            if (_index === index) {
                return { ...item, form: { ...item.form, "value": value } }; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
        });
        let catch_value = _members
        setmember({ ...catch_value })

    }
    const OnClickCreate = (data) => {
        let catch_value = _members
        if(catch_value && catch_value.inputs){
            catch_value.inputs =  catch_value.inputs.map( element =>{
                if(element.form){ element.form.value = "" }

                  return element 
            })
        }
        console.log('create' , catch_value)
        setmember({ ...catch_value })

        setmodaldata({ ...data })
        setmodalaction("Create")
        setshowmodal(true)

    }

    const onClickEdit = (id, data) => {
        console.log("Update", id, data)

        _members.inputs = _members.inputs.map((item, _index) => {
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


        let catch_value = _members
        setmember({ ...catch_value })
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
            return { [item.property]: item.form.value }
        }).reduce((accumulator, currentValue) => {
            return { ...accumulator, ...currentValue }
        })

        console.log('Update id data', id, data)

        let res
        if (action === "Update" && id) {
            res = await API_updateNote(id, data)
        } else if (action === "Create") {
            res = await API_createNote(data)
        }

        if (res && res.status === 200) {
            setshowmodal(false)
        } else {
            setshowmodal(false) // Alert
        }
        setload(false)
    }

    const Delete = (id) => {
        API_deleteNote(id)
        setload(false)
    }


    const API_query = async () =>{
        return new Promise( async (resolve , rejcet) =>{
            let res = await API_queryNotes()
            let table = []
            if (res && res.status === 200) {
               
                table = res.data.Members.map((data) => {
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
             


            setmember({
                showindex: true,
                topic: [ "วันที่","อาคาร","ชั้น","เลขที่ห้อง", "หัวข้อ","ข้อความ","แก้ไขล่าสุด"],
                body: table,
                inputs: [

                    {
                        label: "วันที่",
                        property: "name",
                        form: {
                            displayform: "textbox",
                            type: "date",
                            value: ""
                        }
                    },

                    {
                        label: "อาคาร",
                        property: "lastname",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "ชั้น",
                        property: "personalid",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "เลขที่ห้อง",
                        property: "tel",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "หัวข้อ",
                        property: "topic",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "ข้อความ",
                        property: "message",
                        form: {
                            displayform: "textarea",
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
                    <lable> Note  </lable>
                </div>

                <div className={styles.body}>

                    <div className={styles.row}>
                        <div className={styles.base40} ></div>
                        <div className={styles.base60} >
                            <div className={styles.text} >
                            <label> เพิ่มบันทึก</label>
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