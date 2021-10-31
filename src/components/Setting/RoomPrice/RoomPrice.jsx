import { useEffect, useState } from "react"
import { Input } from "../../../subcomponents/Input/Input"
// import { Select } from "../../../subcomponents/Select/select"
import { Table } from "../../../subcomponents/Table/Table"
import { Topic } from '../../../subcomponents/Topic/Topic'
import { EndButton } from "../../../subcomponents/EndButton/EndButton"
import { Loader } from "../../../subcomponents/loader/loader"


import Add from '@material-ui/icons/Add';


import styles from "./RoomPrice.module.css"

import {
	API_GET_RoomType,
	API_ADD_RoomType,
	API_DELETE_RoomType,
	API_UPDATE_RoomType
} from '../../../API/Schema/setting/RoomType/RoomType';
import {
    API_GET_Rooms,
   
} from '../../../API/Schema/Room/Room'
import { useQuery, useMutation } from '@apollo/client';



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
        body:[] ,
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
                label: "number",
                property: "number",
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
    const GET_Rooms = useQuery(API_GET_Rooms);
 
   	const GET_RoomType = useQuery(API_GET_RoomType);

	const [ createRoomType, mutation_createRoomType ] = useMutation(API_ADD_RoomType);

	const [ deleteRoomType, mutation_deleteRoomTyp ] = useMutation(API_DELETE_RoomType);

	const [ updateRoomType, mutation_updateRoomType ] = useMutation(API_UPDATE_RoomType);

    const [_roomtype , setroomtype] = useState({
                showindex: true,
        topic:["ชื่อ","จำนวน"],
        body:[] ,
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
                label: "number",
                property: "number",
                form: {
                    displayform: "textbox",
                    type: "text",
                    value: ""
                }
            },
           
        ]
    })

    const API_createRoomType = async (payload) =>{

            let  _res =  await createRoomType({
					variables: {
						input: {
								name:payload.name,
								type: payload.type,
								monthlyprice: payload.monthlyprice,
                                dailyprice :payload.dailyprice,
                                deposit_rent : payload.deposit_rent,
                                insurance: payload.insurance,
                                type_price_electrical: payload.type_price_electrical,
                                unit_electrical: payload.unit_electrical,
                                rate_electrical: payload.rate_electrical,
                                totalprice_electrical: payload.totalprice_electrical,
                                type_price_water: payload.type_price_water,
                                unit_water: payload.unit_water ,
                                rate_water: payload.rate_water,
                                totalprice_water: payload.totalprice_water
				            }
			}
		});     
         return _res
    }
    const API_DeleteRoomType = async (payload) =>{

         let  _res  = null
        _res  =  await deleteRoomType({
					 variables: { id: payload.id } 
		});
        return _res
    }
    const API_updateRoomType = async (payload) =>{
    let	_res = await updateRoomType({
                                variables: {
                                    id: payload.id,
                                    input: {
                                        name:payload.name,
                                        type: payload.type,
                                        monthlyprice: payload.monthlyprice,
                                        dailyprice :payload.dailyprice,
                                        deposit_rent : payload.deposit_rent,
                                        insurance: payload.insurance,
                                        type_price_electrical: payload.type_price_electrical,
                                        unit_electrical: payload.unit_electrical,
                                        rate_electrical: payload.rate_electrical,
                                        totalprice_electrical: payload.totalprice_electrical,
                                        type_price_water: payload.type_price_water,
                                        unit_water: payload.unit_water ,
                                        rate_water: payload.rate_water,
                                        totalprice_water: payload.totalprice_water
                                    }
                                }
                            });
            return _res
    }

    const [_id,setid] = useState("");
    const [_name,setname] = useState("");
    const [_type, setrent_type] = useState("รายเดือน");

    const [_monthlyprice,setmonthlyprice] = useState("");
    const [_deposit_rent,setdeposit_rent] = useState("");
    const [_insurance,setinsurance] = useState("");

    const [_dailyprice,setdailyprice] = useState("");

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

    const handlerclerforminput =  (showedit) =>{
          
        setid("")
        setname("")
        setdeposit_rent("")
        setinsurance("")
        setmonthlyprice("")
        setdailyprice("")
        setunit_electrical("")
        setrate_electrical("")
        settotalprice_electrical("")
        setunit_water("")
        setrate_water("")
        settotalprice_water("")
        setshowedit(showedit)
    }

    const onClickAddRoomPrice = async () =>{
       
       handlerclerforminput( true)
    }
    const onClickDeleteRoomPrice = async (id)=>{
  
        let  res = await API_DeleteRoomType({id:id})
        if(res){
            GET_RoomType.refetch(); // update room type
        }
      
        setload(false)
        setinitial(false)
     }
    const onClickEditRoomPrice = async (id ,data )=>{

        setid(id)
        setname(data.name);
        setrent_type(data.type)
        setmonthlyprice(data.monthlyprice)
        setdeposit_rent(data.deposit_rent)
        setinsurance(data.insurance)
        setdailyprice(data.dailyprice)
        settype_price_electrical(data.type_price_electrical)
        setunit_electrical(data.unit_electrical)
        setrate_electrical(data.rate_electrical)
        settotalprice_electrical(data.totalprice_electrical)

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
            console.log('Edit',_totalprice_electrical)
           // resulted =  await API_editroomprice(_id,GB_value)
             resulted = await API_updateRoomType({id:_id,
                                name:_name,
                                type:_type,
                                monthlyprice:_monthlyprice,
                                deposit_rent:_deposit_rent,
                                insurance:_insurance,
                                dailyprice:_dailyprice,
                                type_price_electrical:_type_price_electrical,
                                unit_electrical:_unit_electrical,
                                rate_electrical:_rate_electrical,
                                totalprice_electrical:_totalprice_electrical,
                                type_price_water:_type_price_water,
                                unit_water:_unit_water,
                                rate_water:_rate_water,
                                totalprice_water:_totalprice_water
                      
            })
               
           }else{
           // console.log('Add',GB_value)
             //resulted  =  await API_createroomprice(GB_value)
             // resulted =  await API_editroomprice(_id,GB_value)
             resulted = await API_createRoomType({
                                name:_name,
                                type:_type,
                                monthlyprice:_monthlyprice,
                                deposit_rent:_deposit_rent,
                                insurance:_insurance,
                                dailyprice:_dailyprice,
                                type_price_electrical:_type_price_electrical,
                                unit_electrical:_unit_electrical,
                                rate_electrical:_rate_electrical,
                                totalprice_electrical:_totalprice_electrical,
                                type_price_water:_type_price_water,
                                unit_water:_unit_water,
                                rate_water:_rate_water,
                                totalprice_water:_totalprice_water
                            
            })
               
           }
            console.log('resulted',resulted)
           if(resulted  && resulted.data){
                // << Edit or Save sucess 
            //  setshowedit(false) //<< close edit
            if(_id !== ""){
                    console.log('close edit')
                    handlerclerforminput(false); //<< clear form and close edit
            }else{
                 handlerclerforminput(true); //<< clear form 
            }
            GET_RoomType.refetch();
           
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



    useEffect (()=>{
        console.log('do this')
         if(GET_RoomType.loading === false && GET_Rooms.loading === false){
            let table  =[]
            if(GET_RoomType && GET_RoomType.data &&  GET_RoomType.data.RoomTypes){
                
                    table = GET_RoomType.data.RoomTypes.map((data) =>{
                        let _data = data
                        return {
                        id:data.id,data:_data ,
                        name:data.name,
                        number: GET_Rooms.data.Rooms.filter((room) => (room &&  room.RoomType  && room.RoomType.name === data.name) ).length
                        }
                    })
            }
            console.log('table',table)
            let  roomtype  = _roomtype 
            roomtype.body = [...table]
            setroomtype (roomtype)
            setload(true)
            setinitial(true)
         }
    },[GET_RoomType ,GET_Rooms])
      


     if (GET_RoomType.loading || GET_Rooms.loading){ return <Loader/> }
    return (
        <>
            <div className={styles.mainbody}>

            
            <div  >
                
               
                <div className={styles.bodytable} >
                    <div className={styles.header}> 
                        <label>รายการประเภทห้อง</label>
                       
                    </div>
                    <div className={styles.ontable}>
                        <button onClick={()=>{onClickAddRoomPrice()}}> <Add/></button>
                    </div>
                     
                    <div>
                        <div className={styles.table}>
                        
                        { (_load)?
                            <Table Data={_roomtype } onClickDelete={onClickDeleteRoomPrice} onClickEdit={onClickEditRoomPrice} >
                            </Table> 
                            :<Loader></Loader>}
                        </div>
                   </div>
                </div>
                
                
            </div>
            {_showedit ?
            <div className={styles.body}>

                <Topic label={"Room Price"} size={"larger"} fontWeight={"bolder"} ></Topic>
                
                <Input label="ชื่อ" type="text"   value={_name} onChange={(e)=>{setname(e.target.value) } } ></Input>
           
                        <>
                            <Input label="ค่าเช่ารายเดือน" type="text"   value={_monthlyprice} onChange={(e)=>{setmonthlyprice(e.target.value)} }></Input>
                            <Input label="ค่าเช่าล่วงหน้า" type="text"   value={_deposit_rent} onChange={(e)=>{setdeposit_rent(e.target.value)} }></Input>
                            <Input label="ค่าประกัน" type="text"       value={_insurance} onChange={(e)=>{setinsurance(e.target.value)} } ></Input>
                   
                          <Input label="ค่าเช่ารายวัน" type="text"    value={_dailyprice} onChange={(e)=>{setdailyprice(e.target.value)} }  ></Input>
                        </>
            
                <Topic label={"ค่าไฟ"} size={"medium"} ></Topic>



                    <>
                         <Input label="อัตรา-ต่อหน่วย-รายเดือน" type="text"  value={_unit_electrical} onChange={(e)=>{setunit_electrical(e.target.value)}} ></Input>
                         <Input label="ค่าบริการ" type="text"  value={_rate_electrical} onChange={(e)=>{setrate_electrical(e.target.value)}} ></Input>
                    </>
                    <>
                     <Input label="เหมาราคา" type="text"   value={_totalprice_electrical} onChange={(e)=>{settotalprice_electrical(e.target.value)}}  ></Input>
                    </>
                

                <Topic label={"ค่าน้ำ"} size={"medium"} ></Topic>

                    <>
                         <Input label="อัตรา-ต่อหน่วย-รายเดือน" type="text"   value={_unit_water} onChange={(e)=>{setunit_water(e.target.value)}}  ></Input>
                         <Input label="ค่าบริการ" type="text"  value={_rate_water} onChange={(e)=>{setrate_water(e.target.value)}}  ></Input>
                    </>
                    <>
                     <Input label="เหมาราคา" type="text"      value={_totalprice_water} onChange={(e)=>{settotalprice_water(e.target.value)}}  ></Input>
                    </>
                <Topic label="การแสดงผล"/>
                    <>
                    <Input label="Select icon" type="icon"    value={_totalprice_water} onChange={(e)=>{settotalprice_water(e.target.value)}}  ></Input>
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