import React from "react";
import styles from './Reimbursement.module.css';
import { useEffect,useState } from "react";
import { useMutation,useQuery } from "@apollo/client";
import { API_GET_Reimbursement,API_ADD_Reimbursement,API_DELETE_Reimbursement,API_UPDATE_Reimbursement} from '../../API/Schema/Reimbursement/Reimbursement'

const filter_rooms = (rooms , formFilter) =>{
    let _filter_table = []
    if(rooms && formFilter){
        _filter_table = rooms.filter(room =>{
            if(room){
                if(formFilter.option_search === 'ทั้งหมด'){
                    console.log('All')
                    return(room.building && room.building.search(formFilter.text) !==1) ||
                    (room.building && room.building.search(formFilter.text) !==1) ||
                    (room.roomName && room.roomName.search(formFilter.text) !==1) ||
                    (room.contractID && room.contractID.search(formFilter.text) !==1) ||
                    (room.invoiceID && room.invoiceID.search(formFilter.text) !==1) ||
                    (room.name && room.name.search(formFilter.text) !==1) ||
                    (room.surname && room.surname.search(formFilter.text) !==1) ||
                    (room.cashBack && room.cashBack.search(formFilter.text) !==1) ||
                    (room.status && room.status.search(formFilter.text) !==1) ||
                    (room.cashBack_date && room.cashBack_date.search(formFilter.text) !==1) ||
                    (formFilter.text === '')
                    
                }else if(formFilter.option_search === 'อาคาร'){
                    console.log('Building')
                    return (room.building.search(formFilter.text) !== -1 )||
                    (formFilter.text === '')

                }else if(formFilter.option_search === 'ชื่อห้อง'){
                    console.log('RoomName')
                    return (room.roomName.search(formFilter.text) !== -1 )||
                    (formFilter.text === '')

                }else if(formFilter.option_search === 'วันที่คืน'){
                    console.log('Name')
                    return (room.cashBack_date.search(formFilter.text) !== -1 )||
                    (formFilter.text === '')

                }else{
                    return false
                }
            }else{
                return false
            }
        })
    }
    return _filter_table
}











export const  Reimbursement = () => {

   

    const getReimbursement = useQuery(API_GET_Reimbursement)
    console.log("getReimbursement",getReimbursement)
    const [rooms , setrooms] = useState([]);
    const [FilterRooms,setFilterRooms] = useState([]);
    const [ IDrooms , setIDrooms]=useState([]);
    const [deleteReimbursement , mutationdeleteReimbursement] = useMutation(API_DELETE_Reimbursement)
    const [formFilter ,setFormfilter] = useState({
        id: null,
        option_search:'ทั้งหมด',
        text:'',
        
    })

    const [defaultformFilter ,setdefaultformFilter] = useState({
        id: null,
        option_search:'ทั้งหมด',
        text:'',
        
    })

    const handleChangeformFilterTodefault = () =>{

        setFormfilter(defaultformFilter)
        
    }


    const handleChangedformFilter = (e) => {
        let _formFilter = formFilter
        
        if(e.target.id === 'text'){
            let text = /[^0-9a-zA-Zก-๙/]/ig;
            e.target.value = e.target.value.replace(text,'')
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({..._formFilter})
            console.log('_formFilter',_formFilter)

        }else if(e.target.id === 'option_search'){
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({..._formFilter})
            console.log('_formFilter',_formFilter)
        }
    }
    

    const Rooms_to_table = (Rooms) =>{
        let table = [];
            table = Rooms.map((data)=>{
                return{
                    id:data.id,
                    building:
                    data.Invoice && data.Invoice.Room.floor && data.Invoice.Room.floor.building && data.Invoice.Room.floor.building.name ? 
                    data.Invoice.Room.floor.building.name : '---',
                    roomName: data.Contract && data.Contract.RoomName ? data.Contract.RoomName
                    : '---',
                    contractID: data.Contract && data.Contract.id ? data.Contract.id 
                    : '---',
                    invoiceID: data.Invoice && data.Invoice.id ? data.Invoice.id
                    : '---',
                    name:  data.Contract &&  data.Contract.name ? data.Contract.name 
                    : '---',
                    surname: data.Contract &&  data.Contract.surname ? data.Contract.surname 
                    : '---',
                    cashBack: data.cashback ? data.cashback : '---',
                    status: data.status ? data.status : '---',
                    cashBack_date: data.cashback_date ? data.cashback_date : '---',
                }
            })
            return table
    }


    useEffect(()=>{

        if(getReimbursement && getReimbursement.data && getReimbursement.data.Reimbursements){
            let _rooms = rooms
            _rooms = Rooms_to_table(getReimbursement.data.Reimbursements)
            setrooms([..._rooms])
            setFilterRooms([..._rooms])
            console.log('validateRoom',_rooms)
            
            
        }

    },[getReimbursement])




    let head_table = ["อาคาร" ,"ชื่อห้อง" ,"เลขที่สัญญา" ,"เลขที่ใบแจ้งหนี้" ,"ชื่อผู้เช่า" ,"นามสกุล" ,"คืนเงิน" ,"สถานะ","วันที่คืน"]
    let body_table = [{"อาคาร":"A1","ชื่อห้อง":"112","เลขที่สัญญา":"F111111112","เลขที่ใบแจ้งหนี้":"H111111","ชื่อผู้เช่า":"ใจดี","นามสกุล":"มากมาย","คืนเงิน":"10000","สถานะ":"เช่า","วันที่คืน":"12/12/2550"}]
    return(
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h2 className={styles.headertext}>รายการคืนเงินประกัน</h2>
                    <input id = 'text' className={styles.headerselect} onChange={handleChangedformFilter}/>   
                    <select id = 'option_search'className={styles.headerfilter} onChange={handleChangedformFilter}>
                        <option>ทั้งหมด</option>
                        <option>อาคาร</option>
                        <option>ชื่อห้อง</option>
                        <option>วันที่คืน</option>
                    </select>
                    <button className={styles.headerall}
                    onClick={() =>{
                        let _filter_rooms = []
                        _filter_rooms = filter_rooms(rooms, formFilter)
                        setFilterRooms(_filter_rooms)
                        console.log("_filter_rooms",_filter_rooms)
                    }}
                    
                    >กรอง</button>  
                    <button className={styles.headerdefault}
                    onClick={handleChangeformFilterTodefault}
                    >ทั้งหมด</button>
                </div>
                <div className={styles.table}>
                    <table className={styles.tablestyles}>
                     
                                <thead className={styles.thead}>
                                    <tr>
                                        <td></td>
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
                                
                                <tbody className={styles.tbody}> {FilterRooms.map( 
                                    (room) => room ? (
                                        <tr>
                                            <td>    
                                                <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"
                                                onChange={(e)=>{
                                                    const check = e.target.checked
                                                    let id = room.id
                                                    if(check){
                                                        let _IDrooms = IDrooms
                                                        _IDrooms = [..._IDrooms,room]
                                                        setIDrooms(_IDrooms)
                                                        console.log('_IDrooms',_IDrooms)

                                                    }else{
                                                        let _IDrooms = IDrooms.filter(room => room.id !== id)
                                                        setIDrooms(_IDrooms)
                                                        console.log('_IDrooms',_IDrooms)
                                    
                                                    }
                                                }}></input>
                                            </td>
                                            <td>{room.building ? room.building : '---'}</td>
                                            <td>{room.roomName ? room.roomName : '---'}</td>
                                            <td>{room.contractID ? room.contractID : '---'}</td>
                                            <td>{room.invoiceID ? room.invoiceID : '---'}</td>
                                            <td>{room.name ? room.name : '---'}</td>
                                            <td>{room.surname ? room.surname : '---'}</td>
                                            <td>{room.cashBack ? room.cashBack : '---'}</td>
                                            <td>{room.status ? room.status : '---'}</td>
                                            <td>{room.cashBack_date ? room.cashBack_date : '---'}</td>
                                            
                                        
                                            
                                        </tr>
                                    ) : null
                                        )}
                                    
                                </tbody>
                        
                        
                    </table>
                   

                </div>
                <button className={styles.button}>คืนเงินประกันภัย</button>  
                <button className={styles.buttonDelete}
                onClick={()=>{

                    let myCheckboxName = document.getElementsByName('myCheckboxName');
                                let myCheckboxNameLen = myCheckboxName.length
                
                                Promise.all(IDrooms).then((IDrooms)=>{
                                    IDrooms.map(async (room)=>{
                                   
                                        let _res = await deleteReimbursement({
                                            variables:{
                                                id:`${room.id}`
                                                }
                                            })
                                            
                                        if(_res){
                                            
    
    
                                            for (var x=0; x<myCheckboxNameLen; x++){
                                                myCheckboxName[x].checked=false;
                                                }
                                            
                                            let _IDrooms = IDrooms.filter(item => item !== item)
                                            setIDrooms(_IDrooms)
    
                                            console.log('_IDrooms_IDrooms',_IDrooms)
                                            
                                            
    
                                            getReimbursement.refetch();
        
                                            }
                                        else{
                                            console.log('error')
                                            }
    
                                            
                                            
                                            
    
    
    
                                            
    
                                       
                                    }
                                    
                                    )

                                })
                }}
                >ลบที่เลือก</button>
                
                
                <div className={styles.footer}>
                    <h3 className={styles.footertext}>
                        <lable className={styles.highlight}> คืนเงินประกัน </lable>
                        : คือขั้นตอนการอัพเดตสถานะของห้องเช่าที่มีประกันห้องไว้ ขั้นตอนนี้ต้องทำหลังจากมีการย้ายออกและทำการชำระเงิน
                        และผู้ให้เช่าได้ทำการคืนเงินประกันเรียบร้อยแล้ว
                    </h3>

                </div>
                
            </div>
            
        </div>
    )
}
