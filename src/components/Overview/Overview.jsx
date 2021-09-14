import styles from './Overview.module.css'

import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete'

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Add from '@material-ui/icons/Add';

import { useEffect, useState } from 'react';

import { Floormodal } from '../Setting/Floor/Floormodal'


import { API_queryroomprice  , API_queryBuildings , API_queryFloors, API_updateRoom, API_deleteRoom, API_queryMembers, API_queryRooms, API_createRoom , API_queryMeterRooms} from  '../../API/index'

import  { Inputconfig  , drowdownmenuroomconfig }  from './config'

const color_roomstatur = (status) =>{
    switch (status)
    {
        case "จอง" :
        return 'cornflowerblue'   
        case "ว่าง" :
        return 'rgb(90,90,90)'
        case"ไม่ว่าง" :
        return 'red'
        case"ย้ายออก" :
        return 'red'
        case"ย้ายเข้า" :
        return 'yellow'
        case"เช่า" :
        case"มีคนอยู่" :
        return 'green'
        default:
        return 'gray'
    }

}

const get_option = (Rooms, key) => {
    let arr = []
    if (key) {
        arr = Rooms.map(room => room[key])
        arr = arr.filter(function (value, index, array) {    //<< uniqe type 
            return array.indexOf(value).toString() === index.toString();
        });
        arr.sort()
    }
    return (arr)
}





const Rooms = [
    {
        status: "ว่าง",
        building: "A",
        floor: "1",
        metername: "A001",
        name: "104",
        number: "",
        type: "aircondition"
    },
    {
        status: "เช่า",
        building: "A",
        floor: "1",
        metername: "A002",
        name: "105",
        number: "",
        type: "aircondition"
    },
    {
        status: "แจ้งออก",
        building: "A",
        floor: "2",
        metername: "A003",
        name: "202",
        number: "",
        type: "aircondition"
    },
    {
        status: "ย้ายเข้า",
        building: "I3",
        floor: "2",
        metername: "A003",
        name: "203",
        number: "",
        type: "aircondition"
    },
    {
        status: "แจ้งออก",
        building: "I1",
        floor: "2",
        metername: "A003",
        name: "204",
        number: "",
        type: "aircondition"
    },
    {
        status: "ว่าง",
        building: "I2",
        floor: "2",
        metername: "A003",
        name: "205",
        number: "",
        type: "aircondition"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "2",
        metername: "A003",
        name: "206",
        number: "",
        type: "fan"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "2",
        metername: "A003",
        name: "207",
        number: "",
        type: "fan"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "2",
        metername: "A003",
        name: "208",
        number: "",
        type: "fan"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "2",
        metername: "A003",
        name: "209",
        number: "",
        type: "fan"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "2",
        metername: "A003",
        name: "210",
        number: "",
        type: "fan"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "2",
        metername: "A003",
        name: "211",
        number: "",
        type: "fan"
    },
    {
        status: "เช่า",
        building: "C",
        floor: "3",
        metername: "A008",
        name: "301",
        number: "",
        type: "fan"
    },
    {
        status: "จอง",
        building: "C",
        floor: "4",
        metername: "A008",
        name: "301",
        number: "",
        type: "fan"
    },
    {
        status: "จอง",
        building: "C",
        floor: "ABC",
        metername: "A008",
        name: "301",
        number: "",
        type: "fan"
    },

]

let arr = Rooms.map(room => room.floor)
arr = arr.filter(function (value, index, array) {    //<< uniqe type 
    return array.indexOf(value) === index;
});
console.log(arr)
let uniqe_floors = get_option(Rooms, 'floor')
let group_by_floor = uniqe_floors.map(floor => {
    return Rooms.filter(room => room.floor === floor)
})

console.log(group_by_floor)


export const Overview = () => {

    const [_optionbuilding,setoptionbuilding] = useState([])
    const [_optionfloor,setoptionfloor] = useState([])
    const [_optionprice] = useState([])
    // const [_optionprice,setoptionprice] = useState([])
    const [_optionmember,setoptionmember] = useState([])
    const [_optionstatus,setoptionstatus] = useState([])
    const [_optionmeterroom,setoptionmeterroom] = useState([])
    console.log('_optionmember :',_optionmember)
    console.log('_optionstatus :',_optionstatus)
    console.log('_optionmeterroom :',_optionmeterroom)

     // drop dowm menu //
     const [_dropdowmmenu , setdropdownmenu] = useState(null)
 


    const [_showmodal,setshowmodal] = useState(false)
    const [_load,setload] = useState(false)
    const [_modalaction,setmodalaction] = useState("");
    const [_modaldata,setmodaldata] = useState({});

    const [_groupbyfloor,setgroupbyfloor] = useState([]);


    const [_rooms,setroom] =useState({
        topic:[],
        body:[],
        inputs:[]
    })

    const Onclick_create =(data) =>{


        setmodalaction('Create')
        setshowmodal(true)
        

    }
    const onClickEdit =(id ,data) =>{
        console.log("Update",id,data)
   
        _rooms.inputs = _rooms.inputs.map( (item,_index) => 
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

  
         let catch_value = _rooms
        setroom({...catch_value} )
        setmodaldata({...data})  // <<set id input
        setmodalaction("Update") // << action type
        setshowmodal(true)

    }
    const handleronchange = (value ,index)=>{
        _rooms.inputs = _rooms.inputs.map( (item,_index) => 
           {
             if (_index === index){
               return {...item, form: {...item.form , "value": value} }; //gets everything that was already in item, and updates "done"
             }
             return item; // else return unmodified item 
       });
       let catch_value = _rooms
       setroom({...catch_value} )
       
   }
    const Save = async (id,inputs,action) =>{
       
      let  data =  inputs.map(item => {
             return { [item.property]: item.form.value}
        }).reduce((accumulator, currentValue)=>{
            return {...accumulator , ...currentValue}
        })
       
        console.log('Update id data',id ,action,data)

        let res
        if(action === "Update" && id){
            res  = await API_updateRoom(id,data)
        }else if(action === "Create"){
            res =  await API_createRoom(data)
        }
        
        if(res && res.status === 200){
            setshowmodal(false)
        }else{
            setshowmodal(false) // Alert
        }
        setload(false)
    }
    
    const onClick_Delete = (id) =>{
       
        API_deleteRoom(id)
        setload(false)
    }
    
    const get_API_Inputoption = async () =>{
        return new Promise( async (resolve,rejcet) =>{
            let building = [],floor = [] ,member = [] , meterroom = [] ,type=[],status =[] 
            let res_building = await API_queryBuildings()
            if(res_building && res_building.status === 200)
            {
            
                 building =  res_building.data.Buildings.map(e =>  ({label:e.name , value:e.id})  )
            }
            let res_floor =  await API_queryFloors()
            if(res_floor && res_floor.status === 200)
            {
                floor =  res_floor.data.Floors.map(e =>  ({label:e.name , value:e.id})  )
            }

            let res_member = await API_queryMembers()
            if(res_member && res_member.status === 200){
                member =  res_member.data.Members.map(e =>  ({label:e.name , value:e.id})  )
            }
            let res =  await API_queryroomprice()
            if( res && res.status === 200){
                type =   get_option(res.data.roomprices,'name')
               type = type.map(e =>  ({label:e , value:e})  )
            }

            let res_meterroom = await API_queryMeterRooms()
            console.log('meter room',res_meterroom)
            if(res_meterroom && res_meterroom.status === 200){
                meterroom =  res_meterroom.data.MeterRooms.map(e =>  ({label:e.name , value:e.id})  )

            }

             // set Option form input
            status = [{value:"จอง",label:"จอง"},{value:"ย้ายเข้า",label:"ย้ายเข้า"},{value:"ย้ายออก",label:"ย้ายออก"},{value:"ห้องว่าง",label:"ห้องว่าง"},{value:"มีคนอยู่",label:"มีคนอยู่"} ]
            resolve({'building':building,'floor':floor,'member':member,'meterroom':meterroom,'type':type,status:status})
        }).catch(e=>{
            console.log('Promis Error',e);
           return({building:[],floor:[],member:[],type:[],status:[]})
        })
    }
    const getRooms = async () =>{
        return new Promise(async (resolve,reject)=>{
            let res = await API_queryRooms()
            console.log('query Room ',res)
            let table =[]
            if(res && res.status === 200){
                table =  res.data.rooms.map((data) =>{
                    let _data = data
                    return {
                        id:data.id ,data:_data ,
                        building:data.building ? data.building.name:"---",
                        floor:data.floor ? data.floor.name:'---',
                        name:data.name, 
                        status:data.status ? data.status:'---',
                        member:data.member ? data.member.name : '---',
                        metername:data.meterroom ? data.meterroom.name : '---'
                    }
                } )
            }

            resolve(table)
        }).catch(e =>{
            console.log('Promise Error',e)
            return []
        })
    }
  
   
    useEffect(  ()=>{
        const inital_data = async ()=>{
            let option  =  await  get_API_Inputoption();
            let table = await getRooms()
            console.log('table',table)
            setoptionbuilding(option.building)
            setoptionfloor(option.floor)
            setoptionmember(option.member)
            setoptionstatus(option.status)
            setoptionmeterroom(option.meterroom)
            
            let inputconfig = Inputconfig();
            console.log('inputconfig' ,inputconfig)
            inputconfig.inputs = inputconfig.inputs.map( (ele,_index)=>{
                switch (ele.property) {
                    case "building":
                        ele.form.options = option.building
                        ele.form.value =   option.building.length > 0 ? option.building[0].value : 'All'
                        break;
                    case "floor":
                        ele.form.options = option.floor
                        ele.form.value =  option.floor.length > 0 ? option.floor[0].value :'All'
                        break;
                    case "member":
                        ele.form.options = option.member
                        ele.form.value =  option.member.length > 0 ? option.member[0].value :'All'
                        break;
                    case "status":
                        ele.form.options = option.status
                        ele.form.value = option.status.length > 0 ? option.status[0].value : 'All'
                        break;
                    case "meterroom":
                        ele.form.options = option.meterroom
                        ele.form.value =  option.meterroom.length > 0 ? option.meterroom[0].value :'All'
                        break;
                    default:
                        break;
                }
                return ele
            })
            console.log( inputconfig.inputs)

            setroom({
                showindex: true,
                topic:inputconfig.topic,
                body:table,
                inputs:inputconfig.inputs
             })


             let uniqe_floors = get_option(table, 'floor')
             console.log('uniqe_floors',uniqe_floors)
              let group_by_floor = uniqe_floors.map(floor => {
                return table.filter(room => room.floor === floor)
             })
             setgroupbyfloor(group_by_floor)
             console.log('_groupbyfloor',group_by_floor)
             setload(true)


        }
        inital_data()
        
    },[_load])
        console.log(_optionbuilding )
    return (
        <> 
            { _showmodal? <Floormodal  onClose={ ()=>setshowmodal(false) } 

            Data={_modaldata}
            onSave={Save}  
            onchange={handleronchange}

            Action={_modalaction} 
            Inputs={_rooms.inputs}  

            ></Floormodal> :null }

            {/* <div className={styles.main} >
                    <div className={styles.header}>
                         <lable> Floor </lable> 
                    </div>
                   
                    <div className={styles.body}>

                        <div  className={styles.row}  >
                             <Table Data={_rooms}  onClickDelete={Delete} onClickEdit={onClickEdit}></Table> 
                        </div>

                    </div>
            </div> */}

            <div className={styles.body}>
             { _optionbuilding && _optionfloor && _optionprice ?
                <div className={styles.rowmenu}>
                    <div className={styles.option}>
                        <label> อาคาร</label>
                        <select onchange={(e)=>{console.log(e.target.value)}}>
                            <option> All </option>
                            {_optionbuilding.map(item => <option>{item.label}</option> )}
                        </select>
                    </div>
                    <div className={styles.option}>
                        <label> ชั้น</label>
                        <select onchange={(e)=>{console.log(e.target.value)}}>
                            <option> All </option>
                            {_optionfloor.map(item => <option>{item.label}</option>)}
                        </select>
                    </div>

                    <div className={styles.option} >
                        <label> ประเภทห้อง </label>
                        <select onchange={(e)=>{console.log(e.target.value)}}>
                             <option> All </option>
                            {_optionprice.map(item => <option>{item.label}</option>)}
                        </select>
                    </div>

                    <div className={styles.option} >
                        <label> สถานะห้อง </label>
                        <select  onchange={(e)=>{console.log(e.target.value)}}>
                            <option> All </option>
                            {get_option(Rooms, 'status').map(build => <option>{build}</option>)}
                        </select>
                    </div>

                     <div className={styles.optionright} >
                        <div className={styles.cornflowerblue} > {   _rooms.body.filter(room=> room.status === 'จอง').length} </div>
                        <div>จอง </div>
                        <div className={styles.red} > {   _rooms.body.filter(room=> room.status === 'ย้ายออก').length} </div>
                        <div>ย้ายออก </div>
                        <div className={styles.green} > { _rooms.body.filter(room=> room.status === 'มีคนอยู่').length } </div>
                        <div>มีคนอยู่</div>
                        <div className={styles.gray} > { _rooms.body.filter(room=> room.status === 'ห้องว่าง').length } </div>
                        <div>ห้องว่าง</div>
                        <div className={styles.yellow} > {  _rooms.body.filter(room=> room.status === 'ย้ายเข้า').length } </div>
                        <div>ย้ายเข้า</div>
                     </div>
                     <div className={styles.optionbtn} >
                        <button onClick={()=> Onclick_create()}> 
                            <div> สร้างห้อง </div>
                             <div><Add/> </div> 
                        </button>
                     </div>


                   
                </div>
                 :
                 null }
                {
                    _groupbyfloor.map( (group_floor ,index) => < >
                        <div key={ `floor_${index}}`}className={styles.line}> ชั้น {group_floor[0]['floor']} </div>
                        <div className={styles.row}>
                            {group_floor.map( (room,index) =>
                                <div key={`room_${index}`} className={styles.card}>
                                    <div>
                                        <div className={styles.topic} style={{
                                                backgroundColor: color_roomstatur (room.status)
                                            }}>
                                            <div className={styles.front} >  
                                                <div  className={styles.btn} onClick={()=>{ 
                                                    setdropdownmenu(  _dropdowmmenu === null  ? room.id :   _dropdowmmenu !== room.id  ? room.id : null  );
                                                      console.log( "Room ID ",room.id , room.data  ) 
                                                      console.log(" Room index",index , _dropdowmmenu) }} >
                                                    <ArrowDropDownIcon />
                                                   
                                                </div  >
                                                 { _dropdowmmenu === room.id ? <div className={styles.dropdownmenu}>
                                                    {
                                                     drowdownmenuroomconfig.map(menu =>
                                                     (  
                                                        <div onClick={()=>{ window.location.href = `/${menu.link}` }}>
                                                            <span>{menu.label}</span>
                                                        </div>
                                                        )
                                                     )
                                                    }
                                                      
                                                </div> :null}

                           
                                            </div>
                                            <div className={styles.text} >{room.name} </div>
                                            
                                    
                                            <div className={styles.back}   >
                                                <div  className={styles.btn} onClick={()=>{ onClickEdit(room.id,room.data)  }} >
                                                <SettingsIcon />
                                                </div  >

                                                 
                                                <div  className={styles.btn} onClick={()=>{ onClick_Delete(room.id)  }} >
                                                    <DeleteIcon/>
                                                </div>
                                              
                                            </div>

                                        </div>
                                        
                                        <div className={styles.body} >
                                            <div  className={styles.image}>
                                                <img src="./image/powermeter.jpg" alt="Trulli" width="60" height="60"/>
                                            </div>
                                            
                                            <div className={styles.text}>
                                            {room.metername}
                                            </div>
                                           
                                        </div>
                                        <div className={styles.footer}>
                                            <div className={styles.front}> {(room.type === "fan") ? 
                                           
                                                                                       null     :  <img src="./image/powermeter.jpg" alt="Trulli" width="24" height="24"/>} 
                                            </div>
                                            <div className={styles.text} ></div>
                                            <div className={styles.back} > <MonetizationOnIcon /></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div> 
                    </>)
                }

            </div>
        </>
    )
}

export default Overview
