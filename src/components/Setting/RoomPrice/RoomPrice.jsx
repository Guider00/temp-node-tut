import { useEffect, useState } from "react"
import { Input } from "../../../subcomponents/Input/Input"
// import { Select } from "../../../subcomponents/Select/select"
import { Table } from "../../../subcomponents/Table/Table"
import { Topic } from '../../../subcomponents/Topic/Topic'
import { EndButton } from "../../../subcomponents/EndButton/EndButton"
import { Loader } from "../../../subcomponents/loader/loader"


import Add from '@material-ui/icons/Add';


import styles from "./RoomPrice.module.css"

import { API_createroomprice ,API_queryroomprice , API_deleteroomprice , API_editroomprice } from  '../../../API/index'

// const opt_type_rent = ["รายเดือน","รายวัน"]
// const opt_type_utilities = ["ตามหน่วยการใช้งาน","เหมา"]

const default_data = {
    showindex: true,
topic:["รายการ","ราคา","รูปแบบ"],
body:[{name:"a",price:"a1",roomtype:""},{name:"b",price:"b1",roomtype:""}],
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
        label: "ราคา",
        property: "price",
        form: {
            displayform: "textbox",
            type: "text",
            value: ""
        }
    },
   
] 


}
    let default_data_RoomType ={
        showindex: true,
        topic:["ชื่อ","จำนวน"],
        body:[{name:"a",number:"20"},{name:"b",number:"30"}] ,
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
           
        ]
    }

var GB_value =  {
}






export const RoomPrice = () => {
    const [_id,setid] = useState("");
    const [_name,setname] = useState("");
    const [_type, setrent_type] = useState("รายเดือน");

    const [_monthlyprice,setmonthlyprice] = useState("");
    const [_forehandrent,setforehandrent] = useState("");
    const [_insurance,setinsurance] = useState("");

    const [_dayilyprice,setdayilyprice] = useState("");

    const [_type_price_electrical, settype_price_electrical] = useState("ตามหน่วยการใช้งาน");

    const [_unit_electrical,setunit_electrical] = useState('');
    const [_rate_electrical,setrate_electrical] = useState('');


    const [_totalprice_electrical,settotalprice_electrical] = useState('');

    const [_type_price_water, settype_price_water] = useState("ตามหน่วยการใช้งาน");

    const [_unit_water,setunit_water] = useState('');
    const [_rate_water,setrate_water] = useState('');

    const [_totalprice_water,settotalprice_water] = useState('');

    const [_load,setload] = useState(false);
    const [_inital,setinitial] = useState(false);

    const [_showedit,setshowedit] = useState(false);


    const onClickAddRoomPrice = async () =>{
       
        setid("")
        setname("")
        setrent_type("รายเดือน")
        setforehandrent("")
        setinsurance("")
        setmonthlyprice("")
        setdayilyprice("")
        settype_price_electrical("ตามหน่วยการใช้งาน")
        setunit_electrical("")
        setrate_electrical("")
        settotalprice_electrical("")

        settype_price_water("ตามหน่วยการใช้งาน")
        setunit_water("")
        setrate_water("")
        settotalprice_water("")
        

        setshowedit(true)

    }
    const onClickDeleteRoomPrice = async (id)=>{
        let resulted = await API_deleteroomprice(id)
        console.log('resulted',resulted)
        setload(false)
        setinitial(false)
     }
    const onClickEditRoomPrice = async (id ,data )=>{

        setid(id)
        setname(data.name);
        setrent_type(data.type)
        setmonthlyprice(data.monthlyprice)
        setforehandrent(data.forehandrent)
        setinsurance(data.insurance)
        setdayilyprice(data.dayilyprice)
        settype_price_electrical(data.type_price_electrical)
        setunit_electrical(data.unit_electrical)
        setrate_electrical(data.rate_electrical)
        settotalprice_electrical(data._totalprice_electrical)

        settype_price_water(data.type_price_water)
        setunit_water(data.unit_water)
        setrate_water(data.rate_water)
        settotalprice_water(data.totalprice_water)

        setshowedit(true)
    }

    const _buttons =[ 
        { 
          label:"Save",
          onClick: async ()=>{
            let  resulted
           if(_id !== "")
           {
            console.log('Edit',GB_value)
            resulted =  await API_editroomprice(_id,GB_value)
               
           }else{
            console.log('Add',GB_value)
             resulted  =  await API_createroomprice(GB_value)
               
           }
        
           if(resulted.statusText === 'OK'){
                // << Edit or Save sucess 
            //  setshowedit(false) //<< close edit
           }

            // setload(false)
            setinitial(false)
            }  
        },
        { 
            label:"Close",
            onClick:()=>{
         
                setshowedit(false)
              }  
          },

        ]

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
         // initial mode 
         let table  =[]
        let res =  await API_queryroomprice()
        if(res && res.status === 200){
            table =  res.data.roomprices.map((data) =>{
                let _data = data
                return {id:data.id,data:_data ,รายการ:data.name,ราคา:data.monthlyprice}
            } )
        }

        console.log('table',table)
        default_data_RoomType.body = table
        setload(true)
        setinitial(true)
    }, [_inital])



      
    
    useEffect( ()=>{
        GB_value ={
            name:_name,
            type:_type,
            monthlyprice:_monthlyprice,
            forehandrent:_forehandrent,
            insurance:_insurance,
            dayilyprice:_dayilyprice,
            type_price_electrical:_type_price_electrical,
            unit_electrical:_unit_electrical,
            rate_electrical:_rate_electrical,
            totalprice_electrical:_totalprice_electrical,
            type_price_water:_type_price_water,
            unit_water:_unit_water,
            rate_water:_rate_water,
            totalprice_water:_totalprice_water
        }
        // code to run after every render/re-render
    });
   

  
    return (
        <>
            <div className={styles.mainbody}>

            
            <div  className={styles.bodytable}>
                
               
                <>
                    <div className={styles.header}> 
                        <label>รายการประเภทห้อง</label>
                    </div>
                    <div className={styles.ontable}>
                        <button onClick={()=>{onClickAddRoomPrice()}}> <Add/></button>
                    </div>
                   
                   
                    <div className={styles.table}>
                    { (_load)?
                        <Table Data={default_data_RoomType} onClickDelete={onClickDeleteRoomPrice} onClickEdit={onClickEditRoomPrice} >
                        </Table> 
                        :<Loader></Loader>}
                    </div>
                   
                </>
                
                
            </div>
            {_showedit ?
            <div className={styles.body}>
                <Topic label={"Room Price"} size={"larger"} fontWeight={"bolder"} ></Topic>

                <Input label="ชื่อ" type="text" defaultValue={_name}  value={_name} onChange={(e)=>{setname(e.target.value) } } ></Input>
                {/* <Select 
                label="ชนิดการเช่า"
                option={opt_type_rent}
                onChange={(e) => { setrent_type(e.target.value) }}>
                </Select> */}
                        <>
                            <Input label="ค่าเช่ารายเดือน" type="text"   defaultValue={_monthlyprice}  value={_monthlyprice} onChange={(e)=>{setmonthlyprice(e.target.value)} }></Input>
                            <Input label="ค่าเช่าล่วงหน้า" type="text"    defaultValue={_forehandrent} value={_forehandrent} onChange={(e)=>{setforehandrent(e.target.value)} }></Input>
                            <Input label="ค่าประกัน" type="text"       defaultValue={_insurance}  value={_insurance} onChange={(e)=>{setinsurance(e.target.value)} } ></Input>
                   
                          <Input label="ค่าเช่ารายวัน" type="text"  defaultValue={_dayilyprice}  value={_dayilyprice} onChange={(e)=>{setdayilyprice(e.target.value)} }  ></Input>
                        </>
            
                <Topic label={"ค่าไฟ"} size={"medium"} ></Topic>



                    <>
                         <Input label="อัตรา-ต่อหน่วย-รายเดือน" type="text" defaultValue={_unit_electrical}  value={_unit_electrical} onChange={(e)=>{setunit_electrical(e.target.value)}} ></Input>
                         <Input label="ค่าบริการ" type="text" defaultValue={_rate_electrical}   value={_rate_electrical} onChange={(e)=>{setrate_electrical(e.target.value)}} ></Input>
                    </>
                    <>
                     <Input label="เหมาราคา" type="text"  defaultValue={_totalprice_electrical}   value={_totalprice_electrical} onChange={(e)=>{settotalprice_electrical(e.target.value)}}  ></Input>
                    </>
                

                <Topic label={"ค่าน้ำ"} size={"medium"} ></Topic>

                    <>
                         <Input label="อัตรา-ต่อหน่วย-รายเดือน" type="text" defaultValue={_unit_water}  value={_unit_water} onChange={(e)=>{setunit_water(e.target.value)}}  ></Input>
                         <Input label="ค่าบริการ" type="text" defaultValue={_rate_water}   value={_rate_water} onChange={(e)=>{setrate_water(e.target.value)}}  ></Input>
                    </>
                    <>
                     <Input label="เหมาราคา" type="text"   defaultValue={_totalprice_water}   value={_totalprice_water} onChange={(e)=>{settotalprice_water(e.target.value)}}  ></Input>
                    </>
                <Topic label="การแสดงผล"/>
                    <>
                    <Input label="Select icon" type="icon"   defaultValue={_totalprice_water}   value={_totalprice_water} onChange={(e)=>{settotalprice_water(e.target.value)}}  ></Input>
                    </>
                <Topic label="รายการอื่นๆ"/>

                <Table Data={default_data}>

                </Table> 

                <EndButton buttons={_buttons}></EndButton>

            </div> :null}
            </div>
        </>
    )
}