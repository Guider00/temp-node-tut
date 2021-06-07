import styles from './Overview.module.css'

import SettingsIcon from '@material-ui/icons/Settings';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ToysIcon from '@material-ui/icons/Toys';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Add from '@material-ui/icons/Add';

import { Topic } from '../../subcomponents/Topic/Topic'
import { useEffect, useState } from 'react';

import Createroommodal from './Createroommodal'

import { API_createroomprice ,API_queryroomprice , API_deleteroomprice , API_editroomprice } from  '../../API/index'



const color_roomstatur = (status) =>{
    switch (status)
    {
        case "ว่าง" :
        return 'rgb(90,90,90)'
        break;
        case"ไม่ว่าง" :
        case"แจ้งออก" :
        return 'red'
        break;
        case"จอง" :
        return 'yellow'
        break
        case"เช่า" :
        case"ย้ายเข้า" :
        return 'green'
        break
        default:
        return 'gray'
        break
    }

}
const get_option = (Rooms, key) => {
    let arr = []
    if (key) {
        arr = Rooms.map(room => room[key])
        arr = arr.filter(function (value, index, array) {    //<< uniqe type 
            return array.indexOf(value) == index;
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
    const [_optionprice,setoptionprice] = useState([])

    const [_showcreatemodal,setshowcreatemodal] = useState(false)

    const create_room =() =>{
        setshowcreatemodal(true)
        console.log('create')
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async ()=>{
        let res =  await API_queryroomprice()
        console.log(res)
        if( res && res.status === 200){
           let option =   get_option(res.data.roomprices,'name')
           setoptionprice(option)
        }
    },[])
    console.log( _showcreatemodal)
    return (
        <> 
            { _showcreatemodal? <Createroommodal CloseEvent={()=>{setshowcreatemodal(false)} }></Createroommodal> :null }
            <div className={styles.body}>
                <div className={styles.rowmenu}>
                    <div className={styles.option}>
                        <label> อาคาร</label>
                        <select>
                            <option> All </option>
                            {get_option(Rooms, 'building').map(build => <option>{build}</option>)}
                        </select>
                    </div>
                    <div className={styles.option} >
                        <label> ประเภทห้อง </label>
                        <select>
                             <option> All </option>
                            {_optionprice.map(build => <option>{build}</option>)}
                        </select>
                    </div>
                    <div className={styles.option} >
                        <label> สถานะห้อง </label>
                        <select>
                            <option> All </option>
                            {get_option(Rooms, 'status').map(build => <option>{build}</option>)}
                        </select>
                    </div>

                     <div className={styles.optionright} >
                        <div className={styles.red} > {5} </div>
                        <div>ย้ายออก </div>
                        <div className={styles.green} > {20} </div>
                        <div>มีคนอยู่</div>
                        <div className={styles.gray} > {3} </div>
                        <div>ห้องว่าง</div>
                        <div className={styles.yellow} > {1} </div>
                        <div>ย้ายเข้า</div>
                     </div>
                     <div className={styles.optionbtn} >
                        <button onClick={()=> create_room()}> 
                            <div> สร้างห้อง </div>
                             <div><Add/> </div> 
                        </button>
                     </div>


                   
                </div>
                {
                    group_by_floor.map( (group_floor ,index) => < >
                        <div key={ `floor_${index}}`}className={styles.line}> ชั้น {group_floor[0]['floor']} </div>
                        <div className={styles.row}>
                            {group_floor.map( (room,index) =>
                                <div key={`room_${index}`} className={styles.card}>
                                    <div>
                                        <div className={styles.topic} style={{
                                                backgroundColor: color_roomstatur (room.status)
                                            }}>
                                            <div className={styles.front} >  </div>
                                            <div className={styles.text} >{room.name} </div>
                                            <div className={styles.back} ><SettingsIcon /></div>
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
                                            <div className={styles.front}> {(room.type === "fan") ? <ToysIcon /> : <AcUnitIcon />} </div>
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
