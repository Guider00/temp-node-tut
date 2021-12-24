import styles from './Checkoutinform.module.css';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
    API_GET_Checkoutinform,
    API_CREATE_Checkoutinform,
    API_DELETE_Checkoutinform,
    API_UPDATE_Checkoutinform
} from '../../API/Schema/Checkoutinform/Checkoutinform'

import { API_UPDATE_Room ,API_GET_Rooms} from '../../API/Schema/Room/Room'
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import fetchData from '../../cores/axios';




const filter_rooms = (rooms , options_search) =>{
    let _filter_table = []
    if(rooms  &&  options_search){
        _filter_table = rooms.filter(room =>{
                if(room){
                    if(options_search.keyword === 'ทั้งหมด'){
                        console.log("all")
                        return (room.room && room.room.search(options_search.text) !== -1 ) ||
                        (room.building && room.building.search(options_search.text) !== -1 ) || 
                        (room.floor && room.floor.search(options_search.text) !== -1 ) ||
                        (room.RoomType && room.RoomType.search(options_search.text) !== -1 ) ||
                        (room.status && room.status.search(options_search.text) !== -1 ) ||
                        (room.name && room.name.search(options_search.text) !== -1 ) ||
                        (room.surname && room.surname.search(options_search.text) !== -1 ) ||
                        (room.checkout && room.checkout.search(options_search.text) !== -1 ) ||
                        (options_search.text === '')	
                        ;
                    }else if (options_search.keyword === 'ห้อง'){                      
                        return (room.room.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if (options_search.keyword === 'อาคาร'){
                        return (room.building.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ชั้น' ){
                        return (room.floor.search(options_search.text) !== -1 )	||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ประเภทห้อง'){
                        return (room.RoomType && room.RoomType.search(options_search.text) !== -1 )	||
                        (options_search.text === '')		
                    }else{
                        return false; 
                    }
                }else{
                    return false;
                }
            })
    }
    return _filter_table
    
}






export const Checkoutinform = () => {


    const getRooms = async () => {
        return new Promise(async (resolve, reject) => {
            
            let res = await API_queryRooms();
            console.log("get-first-res",res)
            let table = [];
            if (res && res.status === 200) {
                table = res.data.rooms.map((data) => {
                    let _data = data;
                    return {
                        id: data.id,
                        data: _data,
                        checkout:data.checkout_date,
                        room : data.name ? data.name : '---',
                        RoomType : data.RoomType ? data.RoomType.name : '---',
                        building:
                            data.floor && data.floor.building && data.floor.building.name
                                ? data.floor.building.name
                                : '---',
                        floor: data.floor ? data.floor.name : '---',
                        name : ( data.members && data.members.length > 0 ) ? data.members[0].name : '---',
                        surname : ( data.members && data.members.length > 0 ) ? data.members[0].lastname : '---',
                        status: data.status ? data.status : '---',
                        
                    };
                });
            }
    
            resolve(table);
        }).catch((e) => {
            console.log('Promise Error', e);
            return [];
        });
    };




    
    const [ checkboxs_select , setcheckboxs_select] = useState([])
    const [ options_search  ,setoptions_search] = useState({
		text:"",
		keyword:"ทั้งหมด"
	})
    const [rooms , setrooms] = useState([]);
    const [filterrooms , setfilterrooms] = useState([]);
    const [ loadingpage, setloadingpage ] = useState(false);

    const Checkoutinform = useQuery(API_GET_Rooms);

    const [checkoutinforms,setcheckoutinforms] = useState()
    const [updateStatus , mutationupdatestatus] = useMutation(API_UPDATE_Room)



   


    useEffect(() => {
        
        if(Checkoutinform && Checkoutinform.data && Checkoutinform.data.Rooms){
            console.log("checkinform-1",Checkoutinform.data.Rooms);
            let _checkoutinforms = checkoutinforms
            _checkoutinforms = Checkoutinform.data.Rooms

            setcheckoutinforms(_checkoutinforms)
            console.log("checkinform-2",checkoutinforms);
        }

    })

 
    useEffect(
        () => {
            async function fetchData() {
                let Rooms = await getRooms();
                setrooms(Rooms);
                setfilterrooms(Rooms);
            }
            fetchData();
            setloadingpage(true);
        },
        [ loadingpage,Checkoutinform ]
    );




    let head_table = ["ห้อง" ,"อาคาร" ,"ชั้น" ,"ประเภทห้อง" ,"สถานะ" ,"ชื่อ" ,"นามสกุล" ,"เวลาที่ต้องย้ายออก","แจ้งย้ายออก"]
    let body_table = [{"ห้อง":"226","อาคาร":"อาคาร B","ชั้น":"2","ประเภทห้อง":"ห้องแอร์","สถานะ":"เช่า","ชื่อ":"ใจดี","นามสกุล":"มากมาย","วันที่ต้องย้ายออก":"12/12/2564"}]
    return (
        
        
            <div className= {styles.container}>
            
                <div className= {styles.mainbox}>
                    <div className= {styles.headerstyles}>
                        <h1 className= {styles.header}>รายการห้องเช่า</h1>
                        <div className= {styles.subheader}>
                            <input className={styles.inputstyles}
										type="text"
										value={options_search.text}
										onChange={(e) => {
											let _options_search = options_search
											_options_search.text = e.target.value 
											setoptions_search({..._options_search})
										}}
									/>
                            <select className={styles.selectstyles}
                                        value={ options_search.keyword } 
									    onChange={ (e)=>{
										let _options_search = options_search
										_options_search.keyword = e.target.value 
										setoptions_search({..._options_search})
                                        console.log(options_search)
									}}

									>
                                <option>ทั้งหมด</option>
                                <option>ห้อง</option>
                                <option>อาคาร</option>
                                <option>ชั้น</option>
                                <option>ประเภทห้อง</option>
                            </select>
                            <button className= {styles.filterstyles}

                            onClick={ async () => {
                                        
										let _filter_rooms  =[]
										_filter_rooms = filter_rooms(rooms , options_search)

										setfilterrooms(_filter_rooms);
                                        console.log("filter",rooms);
                                        console.log("option",options_search)
									}}>กรอง</button>
                            {/* <button className= {styles.selectallstyles}>ทั้งหมด</button> */}
                        </div>
                    </div>
                    <div className={styles.table}>
                        <table className={styles.tablestyles}>
                            <thead className={styles.header}>
                                <tr>
                                    <td>{head_table[0]}</td>
                                    <td>{head_table[1]}</td>
                                    <td>{head_table[2]}</td>
                                    <td>{head_table[3]}</td>
                                    <td>{head_table[4]}</td>
                                    <td>{head_table[5]}</td>
                                    <td>{head_table[6]}</td>
                                    <td>{head_table[7]}</td>
                                    <td>{head_table[8]}</td>
                                </tr>

                            </thead>
                            <tbody className={styles.body}>
                            {filterrooms.map(
                                        (room) =>
                                            room ? (
                                                <tr>
                                                    <td width={'60px'}>{room.room ? room.room : '---'}</td>
                                                    <td width={'60px'} >{room.building ? room.building : '---'}</td>
                                                    <td width={'60px'} >{room.floor ? room.floor : '---'}</td>
                                                    <td width={'80px'} >{room.RoomType ? room.RoomType : '---'}</td>
                                                    <td width={'80px'} >{room.status ? room.status : '---'}</td>
                                                    <td width={'100px'} >{room.name}</td>
                                                    <td width={'100px'} >{room.surname}</td>
                                                    <td width={'80px'} >{room.checkout ? room.checkout : '---'}</td>
                                                    <td width={'60px'} >
                                                        <button 
                                                    className={styles.CheckButton}
                                                    onClick={() =>{
        
                                                        try{
                                                            let _res = updateStatus({
                                                            
                                                                variables: {
                                                                    id:`${room.id}`,
                                                                    input:{
                                                                        status: "ย้ายออก"
                                                                        }
                                                                    }});

                                                            if(_res){
                                                                Checkoutinform.refetch()
                                                            }
//                                                            window.location.reload();
                                    
                                                        }catch(error){
                                                            console.log(error)
                                                        }
                                                                
                                                                
                                                    }}
                                                    
                                                    ><CheckIcon/></button>
                                                    <button
                                                    className={styles.ClearButton}
                                                    onClick={() =>{
        
                                                        try{
                                                            let _res = updateStatus({
                                                            
                                                                variables: {
                                                                    id:`${room.id}`,
                                                                    input:{
                                                                        status: "มีคนอยู่"
                                                                        }
                                                                    }});

                                                            if(_res){
                                                                Checkoutinform.refetch()
                                                            }

                                    
                                                        }catch(error){
                                                            console.log(error)
                                                        }
                                                                
                                                                
                                                    }}
                                                    ><ClearIcon/></button>
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    </td>
                                                </tr>
                                            ) : null
                                    )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        
    )
}