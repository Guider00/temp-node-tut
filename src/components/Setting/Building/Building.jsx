
import { useEffect,  useState } from "react"

import styles from "./Building.module.css"
import Add from '@material-ui/icons/Add';
import Table from '../../../subcomponents/Table/Table'

import {API_queryBuildings,API_createBuilding,API_updateBuilding,API_deleteBuilding} from '../../../API/index'


import {Buildingmodal} from './Buildingmodal'





export const Building = () =>{
    const [_building,setbuilding] = useState({
        topic:[],
        body:[]
    
    })
    const [_load,setload] = useState(false);

    const [_showmodal,setshowmodal] = useState(false);
    const [_modaldata,setmodaldata] = useState({});
    const [_modalaction,setmodalaction] = useState("");


    const Add_building =  (data) =>{

        setmodaldata({...data })
        setmodalaction("Create")
        setshowmodal(true)
        
    }

    const onClickEdit = (id,data) =>{
        setmodalaction("Update")
        setmodaldata(data)
        setshowmodal(true)
    }
    const onClose = () =>{
        setshowmodal(false)
    }
    const onSave = async (id,data,action) =>{
        
        let res
        if(action === "Update"){
            res  = await API_updateBuilding(id,data)
        }else if(action === "Create"){
           
            res =  await API_createBuilding(data)
        }
        if(res && res.status === 200){
            setshowmodal(false)
        }else{
            setshowmodal(false) // Alert
        }
        setload(false)
    }


    
    const Delete = (id) =>{

        API_deleteBuilding(id)
        setload(false)
    }

    useEffect( ()=>{
        const getAPI = async () => {
            let res = await API_queryBuildings()
            let table =[]
            if(res && res.status === 200){
                table =  res.data.Buildings.map((data) =>{
                    let _data = data
                    return {id:data.id,data:_data ,name:data.name}
                } )
            }

            setbuilding({
                showindex: true,
                topic:["อาคาร"],
                body:table,
                inputs: [

                    {
                        label: "building",
                        property: "name",
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
    },[_load])

    return (
        <>
              {_showmodal? <Buildingmodal Data={_modaldata} onSave={onSave}  onClose={onClose} Action={_modalaction}></Buildingmodal> :null} 
            <div className={styles.main} >
                    <div className={styles.header}>
                         <label> Building </label> 
                    </div>
                   
                    <div className={styles.body}>

                        <div className={styles.row}>
                            <div className={styles.base40} ></div>
                            <div className={styles.base60} >
                                <div className={styles.text}>
                                    <p> สร้างอาคาร </p>
                                </div>
                                <div className={styles.button} > 
                                    <button onClick={Add_building} ><Add/></button>
                                </div>
                            </div>
                        </div>
                        <div  className={styles.row}  >
                             <Table Data={_building}  onClickDelete={Delete} onClickEdit={onClickEdit}></Table> 
                        </div>

                    </div>
                    

            </div>
        </>
    )
}