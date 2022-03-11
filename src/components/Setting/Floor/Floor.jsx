

import { useEffect,  useState } from "react"
import styles from "./Floor.module.css"
import Add from '@material-ui/icons/Add';
import Table from '../../../subcomponents/Table/Table'


import { API_queryFloors,API_createFloor,API_updateFloor,API_deleteFloor, API_queryBuildings } from '../../../API/index'

import {Floormodal } from './Floormodal'


export const Floor = () =>{

 
    const [_floors,setfloor] = useState({
        topic:[],
        body:[],
        inputs:[]
    
    })

    const handleronchange = (value ,index)=>{
         _floors.inputs = _floors.inputs.map( (item,_index) => 
            {
              if (_index === index){
                return {...item, form: {...item.form , "value": value} }; //gets everything that was already in item, and updates "done"
              }
              return item; // else return unmodified item 
        });
        let catch_value = _floors
        setfloor({...catch_value} )
        
    }
    
    const [_load,setload] = useState(false);

    const [_showmodal,setshowmodal] = useState(false);
    const [_modaldata,setmodaldata] = useState({});
    const [_modalaction,setmodalaction] = useState("");


    const OnClickCreate =  (data) =>{
        setmodaldata({...data})
        setmodalaction("Create")
        setshowmodal(true)
        
    }

    const onClickEdit = (id,data) =>{
        console.log("Update",id,data)
   
        _floors.inputs = _floors.inputs.map( (item,_index) => 
        {
                if(data.hasOwnProperty(item.property) && data.hasOwnProperty(item.property) ){
                    if( data[item.property] && typeof data[item.property] === 'object' && data[item.property].hasOwnProperty("id")  ){
                        return {...item, form: {...item.form , "value": data[item.property].id} }; //gets everything that was already in item, and updates "done"
                    }else{
                        return {...item, form: {...item.form , "value": data[item.property]} }; //gets everything that was already in item, and updates "done"
                    }
                }else{
                    return {...item,}
                }
        });

  
         let catch_value = _floors
        setfloor({...catch_value} )
        setmodaldata({...data})  // <<set id input
        setmodalaction("Update") // << action type
        setshowmodal(true)
    }
    const onClose = () =>{
        setshowmodal(false)
    }
    const onSave = async (id,inputs,action) =>{
        console.log(action ,inputs)
      let  data =  inputs.map(item => {
             let  property = item.property
             return { [property]: item.form.value}
        }).reduce((accumulator, currentValue)=>{
            return {...accumulator , ...currentValue}
        })
       
        console.log('Update id data',id ,data)

        let res
        if(action === "Update" && id){
            res  = await API_updateFloor(id,data)
        }else if(action === "Create"){
            console.log('create floor',data)
            res =  await API_createFloor(data)
        }
        
        if(res && res.status === 200){
            setshowmodal(false)
        }else{
            setshowmodal(false) // Alert
        }
        setload(false)
    }

    const Delete = (id) =>{
        API_deleteFloor(id)
        setload(false)
    }




    useEffect( ()=>{
        const getAPI = async () => {
            let res_building = await API_queryBuildings()
            let table_option =[]
   
            if(res_building && res_building.status === 200){
                table_option =  res_building.data.Buildings.map((data) =>{
                    return {value:data.id ,label:data.name}
                } )
                console.log(table_option)
            }
           
            let res = await API_queryFloors()
            let table =[]
            if(res && res.status === 200){
                table =  res.data.Floors.map((data) =>{
                    let _data = data
                    return {id:data.id ,data:_data ,name:data.name , building:data.building ? data.building.name:"---"}
                } )
            }



            setfloor({
                showindex: true,
                topic:["ชั้น","อาคาร"],
                body:table,
                inputs:[

                    { label:"floor",
                      property:"name",
                    form:{
                      displayform:"textbox",
                      type:"text" ,
                      value:""
                    } 
                  },
                  { label:"building",
                    property:"building",
                  form:{
                    displayform:"select",
                    options:table_option,
                    value:""
                      } 
                  }

                ]
            })
            setload(true)
        }
        getAPI()
    },[_load])

    
    return (
        <>
            {_showmodal? <Floormodal Data={_modaldata} onSave={onSave}  onClose={onClose} onchange={handleronchange} Action={_modalaction} Inputs={_floors.inputs}></Floormodal> :null} 
            <div className={styles.main} >
                    <div className={styles.header}>
                         <label> Floor </label> 
                    </div>
                   
                    <div className={styles.body}>

                        <div className={styles.row}>
                            <div className={styles.base40} ></div>
                            <div className={styles.base60} >
                                <div className={styles.text}>
                                    <label>เพิ่มจำนวนชั้น</label>
                                </div>
                                <div className={styles.btn}>
                                    <button onClick={OnClickCreate} ><Add/></button>
                                </div>

                            </div>
                        </div>
                        <div  className={styles.row}  >
                             <Table Data={_floors}  onClickDelete={Delete} onClickEdit={onClickEdit}></Table> 
                        </div>

                    </div>
            </div>
       
        </>
    )
}