import { useEffect, useState } from "react"
import Add from '@material-ui/icons/Add';
import styles from "./Note.module.css"

import { Floormodal } from '../Setting/Floor/Floormodal'
import Table from '../../subcomponents/Table/Table'

import {  API_createNote, API_updateNote, API_deleteNote,   API_queryNotes  ,
          API_queryBuildings , API_queryFloors , API_queryRooms 



} from '../../API/index'

import {  uniqueArrayByProperty } from '../../general_functions/array'


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

    const [_queryrooms,setqueryrooms] = useState([]);

    const handleronchange = (value, index) => {
    
        _members.inputs = _members.inputs.map((item, _index) => {
            if (_index === index) {
                return { ...item, form: { ...item.form, "value": value } }; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
        });
        let catch_value = _members
         //** Filter select options */
        if( catch_value.inputs[index].property  === 'building' )
        {
            console.log('change' ,value,index)
            console.log('filter_options',catch_value  ,_queryrooms)

            let options_floor = _queryrooms.rooms.map((data)=>{
                if(data.floor.building.id === value){
                    return   {label:data.floor.name ,value: data.floor.id } 
                }else{
                    return null
                }
             }).filter(data => data)

             options_floor  = uniqueArrayByProperty(options_floor ,'label')
             options_floor = [{label:"",value:""},...options_floor]
             catch_value.inputs.find(x=> x.property=== 'floor').form.options = options_floor
             console.log('new floor',catch_value.inputs.find(x=> x.property=== 'floor').form.options)
           

        }else if( catch_value.inputs[index].property  === 'floor' ){
            let options_room = _queryrooms.rooms.map((data)=>{
                if(data.floor.id === value){
                    return   {label:data.name ,value: data.id } 
                }else{
                    return null 
                }
             }).filter(data => data)
             options_room  = uniqueArrayByProperty(options_room ,'label')
             options_room = [{label:"",value:""},...options_room]
             catch_value.inputs.find(x=> x.property=== 'room').form.options = options_room
        }
        else{

        }

   
        
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
        console.log('edit data' ,data , catch_value )
        if(catch_value.inputs.find(x => x.property === 'building')  ){

            let _building =  ( data && data.room && data.room.floor && data.room.floor.building && data.room.floor.building.id )? data.room.floor.building.id :""
            catch_value.inputs.find(x => x.property === 'building').form.value = _building

        }
        if( catch_value.inputs.find(x => x.property === 'floor') ){

            let _floor =  ( data && data.room && data.room.floor && data.room.floor.id )? data.room.floor.id :""
            catch_value.inputs.find(x => x.property === 'floor').form.value = _floor

        }

    

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

        console.log('id ', id , 'data ', data)

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
               
                table = res.data.Notes.map((data) => {
                    let _data = data
                    let _room  =  (data.room  &&  data.room.name )  ? data.room.name  :""
                    let _floor  =  (  data.room && data.room.floor && data.room.floor.name) ? data.room.floor.name  :""
                    let _building  =  ( data.room && data.room.floor &&  data.room.floor.building && data.room.floor.building.name ) ? data.room.floor.building.name  :""
              
                     let _event_date  =   ( data.event_date ? new Date( parseInt( data.event_date) ).toISOString().split('T')[0] :"")
                     _data = {..._data , ...{ event_date:_event_date }}
                    console.log('event my data',_data)
                    return {...{ data: _data},  ...data ,...{building :  _building , floor: _floor , room: _room  ,event_date:_event_date} }
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
    const API_query_buildingoptions = async ( ) =>{
        return new Promise ( async ( resolve ,reject ) => {
            let res = await API_queryRooms()
           
            if(res && res.status === 200){
                let options_building = res.data.rooms.map((data)=>{
                    return   {label:data.floor.building.name,value: data.floor.building.id } 
                 })
                 options_building  = uniqueArrayByProperty(options_building ,'label')
                 options_building = [{label:"",value:""},...options_building]

                 let options_floor = res.data.rooms.map((data)=>{
                    return   {label:data.floor.name ,value: data.floor.id } 
                 })
                 options_floor  = uniqueArrayByProperty(options_floor ,'label')
                 options_floor = [{label:"",value:""},...options_floor]


                 let options_room = res.data.rooms.map((data)=>{
                    return   {label:data.name ,value: data.id } 
                 })
                 options_room  = uniqueArrayByProperty(options_room ,'label')
                 options_room = [{label:"",value:""},...options_room]



                  resolve ({options_building : options_building , options_floor: options_floor ,options_room: options_room , data:res.data  })
            }else{
                resolve({ options_building:[],options_floor:[],options_room:[]  , })
            }
            
        }).catch(e =>{
            return ({ options_building:[],options_floor:[],options_room:[] } )
        })
    }

    


    useEffect(() => {
        const getAPI = async () => {
            
             const {options_building ,options_floor ,options_room  ,data } = await API_query_buildingoptions()


             console.log("logmember",_members.inputs)
           
            let table = await API_query()
             console.log('table',table)
            setqueryrooms(data);

            setmember({
                showindex: true,
                topic: [ "วันที่","อาคาร","ชั้น","เลขที่ห้อง", "หัวข้อ","ข้อความ","แก้ไขล่าสุด"],
                body: table,
                inputs: [

                    {
                        label: "วันที่",
                        property: "event_date",
                        form: {
                            displayform: "textbox",
                            type: "date",
                            value: ""
                        }
                    },

                    {
                        label: "อาคาร",
                        property: "building",
                        form: {
                            displayform: "datalist",
                            type: "text",
                            options:options_building,
                            value: ""
                        }
                    },
                    {
                        label: "ชั้น",
                        property: "floor",
                        form: {
                            displayform: "datalist",
                            type: "text",
                            options:options_floor,
                            value: ""
                        }
                    },
                    {
                        label: "เลขที่ห้อง",
                        property: "room",
                        form: {
                            displayform: "datalist",
                            type: "text",
                            options:options_room,
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