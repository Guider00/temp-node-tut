
import { useEffect, useState } from "react"
import styles from "./Member.module.css"
import Add from '@material-ui/icons/Add';
import Table from '../../../subcomponents/Table/Table'

import { Floormodal } from '../Floor/Floormodal'


import {  API_createMember, API_updateMember, API_deleteMember,   API_queryMembers } from '../../../API/index'


export const Member = () => {
    const [_members, setmember] = useState({
        topic: [],
        body: [],
        inputs: []

    })


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
            res = await API_updateMember(id, data)
        } else if (action === "Create") {
            res = await API_createMember(data)
        }

        if (res && res.status === 200) {
            setshowmodal(false)
        } else {
            setshowmodal(false) // Alert
        }
        setload(false)
    }

    const Delete = (id) => {
        API_deleteMember(id)
        setload(false)
    }

    const API_query = async () =>{
        return new Promise( async (resolve , rejcet) =>{
            let res = await API_queryMembers()
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
                topic: [ "ชื่อ", "นามสกุล","บัตรประชาชน","เบอร์ติดต่อ"],
                body: table,
                inputs: [

                    {
                        label: "ชื่อ",
                        property: "name",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "นามสกุล",
                        property: "lastname",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "บัตรประชาชน",
                        property: "personalid",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "เบอร์ติดต่อ",
                        property: "tel",
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
                    <lable> Member </lable>
                </div>

                <div className={styles.body}>

                    <div className={styles.row}>
                        <div className={styles.base40} ></div>
                        <div className={styles.base60} >
                            <div className={styles.text} >
                            <label>เพิ่มจำนวนสมาชิก</label>
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