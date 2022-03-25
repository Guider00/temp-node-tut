import styles from './Contract.module.css';
import SaveIcon from '@mui/icons-material/Save';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CalendarPicker from '../../subcomponents/Calendar/Calendar.js';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    API_GET_Contract,
    API_DELETE_Contract,
    API_UPDATE_Contract
} from '../../API/Schema/Contract/Contract'
import {
    API_GET_RoomType
} from '../../API/Schema/RoomType/RoomType'
import { API_GET_Rooms } from '../../API/Schema/Room/Room'
 import {  export_Contract } from '../../general_functions/pdf/export/export_pdf';

import { FileUploader } from './FileUploader/FileUploader'
import { filter_rooms, Rooms_to_table,  FormFilter } from './function';


import { toBase64 } from '../../general_functions/convert'


//address
// import { AddressData } from "../../subcomponents/AddressData/AddressData";

//confirmDialog
import Dialog from '../../subcomponents/ConfirmAlert/ConfirmAlert';


import { useMediaQuery } from 'react-responsive'




export const Contract = () => {

    

    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)"
    });
    const isTablet = useMediaQuery({
        query: "(max-width: 1224px)"
    });
    
    //address
    // const { defaultData } = AddressData();

    const getRooms = useQuery(API_GET_Rooms)
    const Contract = useQuery(API_GET_Contract);
    const [deleteContract] = useMutation(API_DELETE_Contract);
    const [updateContract] = useMutation(API_UPDATE_Contract);

    const query_RoomType = useQuery(API_GET_RoomType);
    const [roomtypes, setroomtypes] = useState([])
    const [loadingpage, setloadingpage] = useState(false)
    const [rooms, setrooms] = useState([])
    const [building, setbuilding] = useState([])
    const [filterrooms, setfilterrooms] = useState([]);
        const [IDrooms, setIDrooms] = useState([]);
        // const [dateRange, setdateRange] = useState([]);
    const [getStart, setgetStart] = useState({});
    const [getEnd, setgetEnd] = useState([]);
    const [tbsortingstyle_newmetoold, settbsortingstyle_newmetoold] = useState(true);
    const [selectedcontract, setselectedcontract] = useState(null)
    const { handleChangedformfilter, formfilter, hadleChangedformfilterTodefault, setformfilter } = FormFilter();
        const promiseconfirmcontract = async (contract) =>{
            return new Promise( async (resolve,rej)=>{
                try{
                let res =  await  updateContract({
                    variables:{
                        id:`${contract.id}`,
                        input: {
                            status:"สำเร็จ"
                        }
                     } })
                resolve(res)
                }catch(e){
                    resolve(null)
                }
               

            }).catch(e =>{
                return null 
            })
        }
        const handlerConfirmcontract = async (contracts) =>{
            try{
                console.log('contracts',contracts)
                let primus_funcs =contracts.map( contract =>{
                    return promiseconfirmcontract(contract)
                })
                
                let list_res =  await  Promise.all ( (primus_funcs) )
                console.log('list_res',list_res)
                list_res = list_res.filter(item => item)
                if(contracts && contracts.length &&contracts.length === list_res.length ){
                    Contract.refetch()
                }else{
                    console.error('เปลี่ยน สถานะล้มเหลว')
                }
            }catch(e){
                console.log(e)
            }
        }
        const promisedeletecontract = async (contract) =>{
            return new Promise( async (resolve,rej)=>{
                try{
                let res =  await  deleteContract({
                    variables:{
                        id:`${contract.id}`
                     } })
                resolve(res)
                }catch(e){
                    resolve(null)
                }
               

            }).catch(e =>{
                return null 
            })
        }
        const handlerDeleteContracts  =async (contracts) =>{
            try{
                let primus_funcs =contracts.map( contract =>{
                    return  promisedeletecontract(contract)
                })
                
                let list_res =  await  Promise.all ( (primus_funcs) )
              
                list_res = list_res.filter(item => item)
                if(contracts && contracts.length &&contracts.length === list_res.length ){
                    Contract.refetch()
                }else{
                    console.error('ยกเลิกสัญญา สถานะล้มเหลว')
                }
            }catch(e){
                console.log(e)
            }
        }

        const handlderSaveContract = async (contract) =>{
            try{
                console.log('update contract ',contract)
              let res =  await  updateContract({
                variables:{
                    id:`${contract.id}`,
                    input: {

                        typerent:contract.typerent,
                        mounthly_cost:contract.mounthly_cost,
                        insurance_cost:contract.insurance_cost,
                        depositrent_cost:contract.depositrent_cost,
                    
                        mounthly_type_electrical_cost:contract.mounthly_type_electrical_cost,
                        mounthly_rate_electrical:contract.mounthly_rate_electrical,
                        mounthly_minimum_cost_electrical:contract.mounthly_minimum_cost_electrical,
                        mounthly_buffet_cost_electrical:contract.mounthly_buffet_cost_electrical,
                        mounthly_type_water_cost:contract.mounthly_type_water_cost,
                        mounthly_rate_water:contract.mounthly_rate_water,
                        mounthly_minimum_cost_water:contract.mounthly_minimum_cost_water,
                        mounthly_buffet_cost_water:contract.mounthly_buffet_cost_water,
                        
                        daily_cost:contract.daily_cost,
                        daily_type_electrical_cost:contract.daily_type_electrical_cost,
                        daily_rate_electrical:contract.daily_rate_electrical,
                        daily_minimum_cost_electrical:contract.daily_minimum_cost_electrical,
                        daily_buffet_cost_electrical:contract.daily_buffet_cost_electrical,
                        daily_type_water_cost:contract.daily_type_water_cost,
                        daily_rate_water:contract.daily_rate_water,
                        daily_minimum_cost_water:contract.daily_minimum_cost_water,
                        daily_buffet_cost_water:contract.daily_buffet_cost_water,
                    
                        filecontract:contract.filecontract
                    }
                }
            })
            if(res && res.data){
                Contract.refetch()
            }
            }catch(error){

            }
        }

        const handlerEditContract = async (e,callback) =>{
            if(e && e.target && e.target.value && e.target.name ){
              
                if(selectedcontract){
                let _selectedcontract =  JSON.parse(JSON.stringify(  selectedcontract ) ) 
              
                _selectedcontract[e.target.name] = e.target.value
                console.log('update  _selectedcontract', _selectedcontract)
                setselectedcontract(_selectedcontract)
                }else{
                    // set Notifly
                    console.error("ต้องทำการเลือก สัญญา")
                }
            }
            if(callback){
                callback()
            }

        }

        

        

    const selectAll = () => {
            // let myCheckboxId = document.querySelector('#myCheckboxId')
            let myCheckboxMain = document.querySelector('#select-all');
            let myCheckboxName = document.getElementsByName('myCheckboxName');
            let myCheckboxNameLen = myCheckboxName.length

            if (myCheckboxMain.checked === true) {

                for (var x = 0; x < myCheckboxNameLen; x++) {
                    myCheckboxName[x].checked = true;

                }

                let _IDrooms = filterrooms.map((room) => {
                    return { ...room }
                })
                setIDrooms(_IDrooms);
                console.log("IDrooms-if", _IDrooms)

            }
            else {
                for (var z = 0; z < myCheckboxNameLen; x++) {
                    myCheckboxName[z].checked = false;
                }

            let _IDrooms = IDrooms.filter(item => item)
            setIDrooms(_IDrooms)
            console.log("IDrooms-else", _IDrooms)

            }

        }







    //Calendar


    const [defaultCalendar, setdefaultCalendar] = useState({
            isLoading: false
        });
        const [DateStart, setDateStart] = useState(null)
    const [DateEnd, setDateEnd] = useState(null)
    const [DateRange, setDateRange] = useState([])


    const handleCalendar = (isLoading) => {
            setdefaultCalendar({
                isLoading: isLoading,
            })
        }

    const handleStart = (data) => {
            setDateRange(data)
            console.log("DateRange", DateRange)
        }

    const CalendarDate = (selecteddate) => {
            console.log('debug', selecteddate)

            if (selecteddate) {
                if (selecteddate.from === null) {
                    setDateStart('')
                } else {
                    let iDay = parseInt(selecteddate.from.day, 10);
                    let iMonth = parseInt(selecteddate.from.month, 10);

                    if (iDay < 10 && iMonth < 10) {
                        let _DateStart = DateStart
                        _DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-0" + selecteddate.from.day
                        setDateStart(_DateStart)

                        let _formfilter = formfilter;
                        _formfilter['checkin_date'] = _DateStart
                        setformfilter({ ..._formfilter })


                    } if (iDay < 10 && iMonth >= 10) {
                        let _DateStart = DateStart
                        _DateStart = selecteddate.from.year + "-" + selecteddate.from.month + "-0" + selecteddate.from.day
                        setDateStart(_DateStart)

                        let _formfilter = formfilter;
                        _formfilter['checkin_date'] = _DateStart
                        setformfilter({ ..._formfilter })

                    } if (iDay >= 10 && iMonth < 10) {
                        let _DateStart = DateStart
                        _DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-" + selecteddate.from.day
                        setDateStart(_DateStart)

                        let _formfilter = formfilter;
                        _formfilter['checkin_date'] = _DateStart
                        setformfilter({ ..._formfilter })

                    }
                }

            }
            if (selecteddate) {
                if (selecteddate.to === null) {
                    setDateEnd('')
                } else {

                    let iDay = parseInt(selecteddate.to.day, 10);
                    let iMonth = parseInt(selecteddate.to.month, 10);

                    if (iDay < 10 && iMonth < 10) {
                        let _DateEnd = DateEnd
                        _DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-0" + selecteddate.to.day
                        setDateEnd(_DateEnd)

                        let _formfilter = formfilter;
                        _formfilter['checkin_date_exp'] = _DateEnd
                        setformfilter({ ..._formfilter })


                    } if (iDay < 10 && iMonth >= 10) {
                        let _DateEnd = DateEnd
                        _DateEnd = selecteddate.to.year + "-" + selecteddate.to.month + "-0" + DateRange.to.day
                        setDateEnd(_DateEnd)

                        let _formfilter = formfilter;
                        _formfilter['checkin_date_exp'] = _DateEnd
                        setformfilter({ ..._formfilter })

                    } if (iDay >= 10 && iMonth < 10) {
                        let _DateEnd = DateEnd
                        _DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-" + selecteddate.to.day
                        setDateEnd(_DateEnd)

                        let _formfilter = formfilter;
                        _formfilter['checkin_date_exp'] = _DateEnd
                        setformfilter({ ..._formfilter })

                    }


                }


            }
            if (selecteddate && selecteddate.from === null && selecteddate.to === null) {

            } else {
                handleCalendar(false);
            }


        }

    //Calendar


    //confirmDialog
    const [Confirm, setConfirm] = useState({
            isLoading: false,
            message: 'Sure?'
        })

    const handleConfirm = (message, isLoading) => {
            setConfirm({
                isLoading: isLoading,
                message: message

            })


        }
    //confrim
    //ฟังก์ชั่นเช็คการลบข้อมูลที่เลือก
    const checkstate = async (state) => {

            if (state) {

                handlerDeleteContracts([...IDrooms])
                handleConfirm('', false)
            } else {
                handleConfirm('', false)
            }

        }



    useEffect(() => {
    if (getRooms.data) {
        let Rooms = Rooms_to_table(getRooms.data.Rooms)
        let _building = building
        _building = [...new Set(Rooms.map(item => item.building))]
        setbuilding(_building)




    }
    if (formfilter) {
        const startDate = new Date(formfilter.checkin_date)
        const startEnd = new Date(formfilter.checkin_date_exp)

        let _getStart = getStart
        _getStart = startDate.getTime().toString()
        setgetStart(_getStart)

        let _getEnd = getEnd
        _getEnd = startEnd.getTime().toString()
        setgetEnd(_getEnd)

        console.log('_getStart', _getStart)
        console.log('_getEnd', _getEnd)

    }
        setloadingpage(true);
    }, [getRooms, loadingpage]) // eslint-disable-line react-hooks/exhaustive-deps





useEffect(() => {
    if (Contract && Contract.data && Contract.data.Contracts) {
        let _contract = rooms
        _contract = [...Contract.data.Contracts]
        setrooms([..._contract]);
        setfilterrooms([..._contract])
    }
    if (query_RoomType && query_RoomType.data && query_RoomType.data.RoomTypes) {
        let _roomtypes = roomtypes
        _roomtypes = [...query_RoomType.data.RoomTypes]
        setroomtypes([..._roomtypes])
    } 
    setloadingpage(true);
    }, [loadingpage, Contract]) // eslint-disable-line react-hooks/exhaustive-deps







let head_table = ['', 'เลขที่สัญญา', 'ประเภทห้อง', 'ชื่อห้อง', 'ประเภทสัญญา', 'ชื่อผู้เช่า', 'นามสกุล', 'วันที่ขอสัญญา', 'สถานะ', 'ไฟล์เอกสารสัญญา', 'วันที่ปิดสัญญา']

return (
    <>
        {Confirm.isLoading && <Dialog onDialog={checkstate} message={Confirm.message} />}
        {defaultCalendar.isLoading && <CalendarPicker onCalendar={CalendarDate} start={handleStart}
            selectedStartDate={DateStart ? new Date(DateStart) : DateStart}
            selectedEndDate={DateEnd ? new Date(DateEnd) : DateEnd}
        />}
        <div className={styles.container}>
            <div className={styles.zone1}>
                <div className={styles.header} >
                    <div className={styles.title} >
                        <label className={styles.contract} style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }}>รายการสัญญา</label>
                    </div>
                    <div className={styles.dateinput} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                        <label className={styles.date}>วันที่ :</label>
                        <input
                            id='checkin_date'
                            type='date'
                            max={DateEnd}
                            value={DateStart ? DateStart : ''}
                            className={styles.inputdate}
                            onChange={(e) => {
                                let { value } = e.target
                                setDateStart(value)

                                let _formfilter = formfilter;
                                _formfilter['checkin_date'] = value
                                setformfilter({ ..._formfilter })


                            }}
                        ></input>
                        <label className={styles.to}>ถึง :</label>
                        <input
                            id='checkin_date_exp'
                            min={DateStart}
                            type='date'
                            value={DateEnd ? DateEnd : ''}
                            className={styles.inputdate}
                            onChange={(e) => {
                                let { value } = e.target
                                setDateEnd(value)

                                let _formfilter = formfilter;
                                _formfilter['checkin_date_exp'] = value
                                setformfilter({ ..._formfilter })


                            }}
                        ></input>
                        <button className={styles.to}
                            onClick={() => {
                                setdefaultCalendar({
                                    isLoading: true
                                })
                            }}><EventNoteIcon /></button>
                        <br />
                        <label className={styles.selectAll} >เลือกทั้งหมด</label>
                        <input type='checkbox' className={styles.checkbox} name="selectAll" id="select-all" onChange={selectAll}></input>
                        <label className={styles.building}>อาคาร :</label>
                        <select id='option_search' className={styles.select} onChange={handleChangedformfilter}>
                            <option> เลือกอาคารทั้งหมด </option>
                            {building.map((room, index) => room ? (
                                <option key={index.toString()} >{room}</option>
                            ) : null)

                            }

                        </select>
                    </div>


                </div>
                <div className={styles.body}>
                    <div className={styles.filter}>
                        <input id='text' className={styles.input} onChange={handleChangedformfilter}></input>
                        <button className={styles.button} onClick={
                            async () => {
                                let _filter_rooms = []
                                _filter_rooms = filter_rooms(rooms, formfilter, getStart, getEnd)
                                setfilterrooms(_filter_rooms)
                                console.log("_filter_rooms-1", _filter_rooms)

                            }
                        }>กรอง</button>
                        <button className={styles.button} onClick={hadleChangedformfilterTodefault}>ทั้งหมด</button>
                    </div>

                    <div className={styles.test} >


                        <table className={styles.table} >
                            <thead className={styles.head} >
                                <tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                    <td onClick={
                                        () => {
                                            let _tbsortingstyle_newtoold = tbsortingstyle_newmetoold
                                            settbsortingstyle_newmetoold(!_tbsortingstyle_newtoold)
                                        }
                                    }>{tbsortingstyle_newmetoold ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</td>
                                    <td>{head_table[1]}</td>
                                    <td>{head_table[2]}</td>
                                    <td>{head_table[3]}</td>
                                    <td>{head_table[4]}</td>
                                    <td>{head_table[5]}</td>
                                    <td>{head_table[6]}</td>
                                    <td>{head_table[7]}</td>
                                    <td>{head_table[8]}</td>
                                    <td>{head_table[9]}</td>
                                    <td>{head_table[10]}</td>

                                </tr>
                            </thead>
                            {console.log("filterrooms", filterrooms, [...filterrooms].reverse())}
                            <tbody className={styles.body}>{
                                (tbsortingstyle_newmetoold ? [...filterrooms].reverse() : filterrooms).map((item, index) => item ?
                                    (<tr 
                                        key={index.toString()}
                                        onClick={() => {
                                            let _selectedcontract = selectedcontract
                                            _selectedcontract = item
                                            setselectedcontract({ ..._selectedcontract })
                                            console.log(item)
                                        }}
                                        style={{
                                            background: (selectedcontract && selectedcontract.id === item.id) ? 'lightgray' : 'none',fontSize: isDesktop ? '' : isTablet ? '15px' : ''
                                        }}
                                    >
                                        <td>
                                            <input
                                                type='checkbox'
                                                name="myCheckboxName"
                                                id="myCheckboxId"
                                                checked={(IDrooms.findIndex(x => x.id === item.id) !== -1) ? true : false}
                                                onChange={(e) => {
                                                    const check = e.target.checked
                                                    const id = item.id
                                                    if (check) {
                                                        let _IDrooms = IDrooms
                                                        _IDrooms = [..._IDrooms, item]
                                                        setIDrooms(_IDrooms)
                                                        console.log('_IDrooms', _IDrooms)

                                                    } else {
                                                        let _IDrooms = IDrooms.filter(item => item.id !== id)
                                                        setIDrooms(_IDrooms)
                                                        console.log('_IDrooms', _IDrooms)
                                                    }

                                                }} />
                                        </td>
                                        <td>{item && item.id ? item.id.substring(item.id.length - 5) : "---"}</td>
                                        <td>{item && item.Room && item.Room.RoomType && item.Room.RoomType.name  ?  item.Room.RoomType.name :  "---"}</td>
                                        <td>{item && item.Room && item.Room.name ? item.Room.name : "---"}</td>
                                        <td>{item && item.Room && item.Room.checkin && item.Room.checkin.checkin_type ? item.Room.checkin.checkin_type : "---"}</td>
                                        <td>{item && item.Room && item.Room.members && item.Room.members.length > 0 && item.Room.members[0].name ? item.Room.members[0].name : "---"}</td>
                                        <td>{item && item.Room && item.Room.members && item.Room.members.length > 0 && item.Room.members[0].lastname ? item.Room.members[0].lastname : "---"}</td>
                                        <td>{item && item.Room && item.Room.checkin && item.Room.checkin.checkin_date ? item.Room.checkin.checkin_date : "---"}</td>
                                        <td>{item && item.status ? item.status : "---"}</td>
                                        <td>{item && item.filecontract? 
                                        <input type="image" src={item.filecontract}  alt="contract"  height={50} width={50} />
                                        
                                        :"---"}</td>
                                        <td>{item && item.Room && item.Room.checkout && item.Room.checkout.checkout_date ? item.Room.checkout.checkout_date : "---"}</td>
                                        
                                    </tr>
                                    ) : null)}



                            </tbody>
                        </table>
                    </div>


                </div>
                <div className={styles.button}>
                        <button className={styles.print}
                            onClick={async ()=>{
                                //TODO: Export PDF สัญญาณ หลายๆ หน้า 
                                console.log('IDrooms',...IDrooms)
                                try{
                                    export_Contract(IDrooms)
                                // let resulte = IDrooms.map(room =>{
                                
                                    
                                // })
                            }catch(e){
                                console.log('')
                            }
                        }}
                    > <PrintIcon/> พิมพ์</button>
                     <button className={styles.confirm}
                        onClick={()=>{
                      
                            handlerConfirmcontract([...IDrooms]  )
                        }}
                     >
                         <CheckCircleIcon/> ยืนยันสถานะสัญญา
                    </button>

                    <button className={styles.confirm}
                        onClick={()=>{
                            if (IDrooms && IDrooms.length > 0) {
                                handleConfirm('Are you sure to Delete?', true)

                            } else {
                                console.log('No select ID')
                            }
                           // handlerConfirmcontract([...IDrooms]  )
                        }}
                     >
                         <DeleteIcon/> ยกเลิกสัญญา
                    </button>
                </div>

            </div>
            <div className={styles.zone2}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div className={styles.contract} style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }}>รายละเอียดสัญญา</div>
                    </div>
                </div>
                <div className={styles.subheader} style={{ fontSize: isDesktop ? '' : isTablet ? '18px' : '' }} >
                    <label className={styles.subheadertext}>ชื่อประเภทห้อง :</label>
                    <select className={styles.subheaderselect}
                        name="typeroom"
                        onChange={(e)=>handlerEditContract(e) }
                        value={
                            selectedcontract && selectedcontract.typeroom ? selectedcontract.typeroom :""
                        }
                        defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                            selectedcontract.Room.RoomType.name ? selectedcontract.Room.RoomType.name : ""}
                    >
                        
                        {roomtypes.map((roomtype, index) => <option key={index.toString()}>{roomtype && roomtype.name ? roomtype.name : "---"}</option>)

                        }

                    </select>
                    <button 
                        disabled={selectedcontract ? false:true }
                        onClick={ () => {

                          
                        }}
                    >
                            ตั้งค่าจากประเภทห้อง
                    </button>
                </div>

                <div className={styles.inputmonthandday} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                    {/* <h1 className={styles.line}></h1> */}
                    <div className={styles.month}>
                        <label className={styles.month}>รายเดือน :</label>
                        <input
                            name='typerent'
                            type='radio'
                            className={styles.check}
                            
                            onClick={ ()=>{

                                handlerEditContract({target:{
                                    name:'typerent',
                                    value:'รายเดือน'
                                }})
                            }}
                            checked={ selectedcontract && selectedcontract.typerent === "รายเดือน"  ? true:false   }
                          
                        />
                        <div className={styles.input1}>
                            <label className={styles.inputtext1}>ค่าเช่าห้อง :</label>
                            <input
                                placeholder='0.00'
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                className={styles.inputbox1}

                                name='mounthly_cost'
                                value={
                                    selectedcontract && selectedcontract.mounthly_cost ? selectedcontract.mounthly_cost :"0"
                                }
                                onChange={handlerEditContract}

                               
                           
                            ></input>
                            <label className={styles.inputtext2}>ค่าประกัน :</label>
                            <input
                                placeholder='0.00'
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                className={styles.inputbox2}

                                name='insurance_cost'
                                value={
                                    selectedcontract && selectedcontract.insurance_cost ? selectedcontract.insurance_cost :"0"
                                }
                                onChange={handlerEditContract}

                            ></input>
                            <br />
                            <label className={styles.inputtext3}>ค่าเช่าล่วงหน้า :</label>
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                name='depositrent_cost'

                                value={
                                    selectedcontract && selectedcontract.depositrent_cost ? selectedcontract.depositrent_cost :"0"
                                }
                                onChange={handlerEditContract}

                                className={styles.inputtext3}></input>
                        </div>
                        <label className={styles.submonth}>ค่าสาธารณูปโภค</label>
                        <div className={styles.input2}>
                            <label className={styles.inputtext1}>คิดค่าใช้จ่าย</label>
                            <label className={styles.inputtext2}>อัตราบริการต่อหน่วย</label>
                            <label className={styles.inputtext3}>อัตราต่อขั้นต่ำ</label>
                            <label className={styles.inputtext4}>เหมาจ่าย</label>
                            <br />
                            <label className={styles.inputtext5}>ไฟฟ้า :</label>
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                className={styles.inputtext6}
                                name="mounthly_type_electrical_cost"
                                checked={selectedcontract && selectedcontract.mounthly_type_electrical_cost === 'type_perunit'? true:false }
                                onChange={()=>handlerEditContract(
                                    {
                                        target:{
                                        name:"mounthly_type_electrical_cost",
                                        value:"type_perunit",
                                        type:"checkbox"
                                        }
                                    }) 
                                }
                                type='checkbox'

                            />
                         
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                className={styles.inputbox1}
                                name='mounthly_rate_electrical'
                                value={
                                    selectedcontract && selectedcontract.mounthly_rate_electrical ? selectedcontract.mounthly_rate_electrical :"0"
                                }
                                onChange={handlerEditContract}
                               
                            ></input>

                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                
                                name='mounthly_minimum_cost_electrical'
                                value={
                                    selectedcontract && selectedcontract.mounthly_minimum_cost_electrical ? selectedcontract.mounthly_minimum_cost_electrical :"0"
                                }
                                onChange={handlerEditContract}

                                className={styles.inputbox2} />
                            <label>บาท</label>
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                name="mounthly_type_electrical_cost"
                                checked={selectedcontract && selectedcontract.mounthly_type_electrical_cost === 'type_buffet'? true:false }
                                onChange={()=>handlerEditContract(
                                    {
                                        target:{
                                        name:"mounthly_type_electrical_cost",
                                        value:"type_buffet",
                                        type:"checkbox"
                                        }
                                    }) 
                                }
                                
                                className={styles.checkbox2} type='checkbox' />
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                name="mounthly_buffet_cost_electrical"
                                value={selectedcontract && selectedcontract.mounthly_buffet_cost_electrical ? selectedcontract.mounthly_buffet_cost_electrical :'0' }
                                onChange={handlerEditContract}

                                placeholder='0.00' className={styles.inputbox3}
                               
                            />
                            <label>บาท</label>
                            <br />
                            <label className={styles.inputtext7}>น้ำ :</label>
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                name="mounthly_type_water_cost"
                                checked={selectedcontract && selectedcontract.mounthly_type_water_cost === 'type_perunit'? true:false }
                                onChange={()=>handlerEditContract(
                                    {
                                        target:{
                                        name:"mounthly_type_water_cost",
                                        value:"type_perunit",
                                        type:"checkbox"
                                        }
                                    }) 
                                }

                                className={styles.inputtext6} type='checkbox' />
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                                className={styles.inputbox1}
                                
                                name="mounthly_rate_water"
                                value={selectedcontract && selectedcontract.mounthly_rate_water ?  selectedcontract.mounthly_rate_water :'0'}
                                onChange={handlerEditContract}
                            />
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                placeholder='0.00'
                               
                                name="mounthly_minimum_cost_water"
                                value={selectedcontract && selectedcontract.mounthly_minimum_cost_water ?  selectedcontract.mounthly_minimum_cost_water :'0'}
                                onChange={handlerEditContract}
                                className={styles.inputbox2}></input>

                            <label>บาท</label>
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                name="mounthly_type_water_cost"
                                checked={selectedcontract && selectedcontract.mounthly_type_water_cost === 'type_buffet'? true:false }
                                onChange={()=>handlerEditContract(
                                    {
                                        target:{
                                        name:"mounthly_type_water_cost",
                                        value:"type_buffet",
                                        type:"checkbox"
                                        }
                                    }) 
                                }
    

                                 className={styles.checkbox2} type='checkbox' />
                            <input
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายเดือน")  ? false:true }
                                name="mounthly_buffet_cost_water"
                                value={selectedcontract && selectedcontract.mounthly_buffet_cost_water? selectedcontract.mounthly_buffet_cost_water:'0' }
                                onChange={handlerEditContract}
                                placeholder='0.00' className={styles.inputbox3}
                               
                            />
                            <label>บาท</label>
                        </div>

                    </div>
                    {/* <h1 className={styles.line}></h1> */}
                    <div className={styles.day}>
                        <label className={styles.day}>รายวัน :</label>
                        <input
                           
                            name='day'
                            type='radio'
                            className={styles.check}

                            onClick={ ()=>{

                                handlerEditContract({target:{
                                    name:'typerent',
                                    value:'รายวัน'
                                }})
                            }}
                            checked={ selectedcontract && selectedcontract.typerent === "รายวัน"  ? true:false   }

                            // onChange={handleChangeRadio}
                            // checked={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType && selectedcontract.Room.RoomType.type &&
                            //     selectedcontract.Room.RoomType.type === "รายวัน" ? true : false}

                        />
                        <div className={styles.input1}>
                            <label className={styles.inputtext1}>ค่าเช่าห้อง :</label>
                            <input
                            
                                disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                placeholder='0.00'
                                className={styles.inputbox1}
                                
                                name="daily_cost"
                                onChange={handlerEditContract}
                                value={selectedcontract && selectedcontract.daily_cost ? selectedcontract.daily_cost : '0'}

                           
                            />
                        </div>
                        <label className={styles.subday}>ค่าสาธารณูปโภค</label>
                            <div className={styles.input2}>
                                <label className={styles.inputtext1}>คิดค่าใช้จ่าย</label>
                                <label className={styles.inputtext2}>อัตราบริการต่อหน่วย</label>
                                <label className={styles.inputtext3}>อัตราต่อขั้นต่ำ</label>
                                <label className={styles.inputtext4}>เหมาจ่าย</label>
                                <br />
                                <label className={styles.inputtext5}>ไฟฟ้า :</label>
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                 
                                    name="daily_type_electrical_cost"
                                    checked={selectedcontract && selectedcontract.daily_type_electrical_cost === 'type_perunit'? true:false }
                                    onChange={()=>handlerEditContract(
                                        {
                                            target:{
                                            name:"daily_type_electrical_cost",
                                            value:"type_perunit",
                                            type:"checkbox"
                                            }
                                        }) 
                                    }
                                 
                                    className={styles.inputtext6} 
                                    type='checkbox' />
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    placeholder='0.00'
                                    name="daily_rate_electrical"
                                    value={selectedcontract && selectedcontract.daily_rate_electrical ? selectedcontract.daily_rate_electrical : '0'}
                                    onChange={handlerEditContract}
                                    className={styles.inputbox1}></input>
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    name="daily_minimum_cost_electrical"
                                    value={selectedcontract && selectedcontract.daily_minimum_cost_electrical ? selectedcontract.daily_minimum_cost_electrical : '0'}
                                    onChange={handlerEditContract}

                                    placeholder='0.00'
                                    className={styles.inputbox2}></input>
                                <label>บาท</label>
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    checked={selectedcontract && selectedcontract.daily_type_electrical_cost === 'type_buffet'? true:false }
                                    onChange={()=>handlerEditContract(
                                        {
                                            target:{
                                            name:"daily_type_electrical_cost",
                                            value:"type_buffet",
                                            type:"checkbox"
                                            }
                                        }) 
                                    }
                                    className={styles.checkbox2}
                                    type='checkbox' />
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    placeholder='0.00'

                                    name ="daily_buffet_cost_electrical"
                                    value ={selectedcontract && selectedcontract.daily_buffet_cost_electrical? selectedcontract.daily_buffet_cost_electrical:'0' }
                                    onChange={handlerEditContract}

                                    className={styles.inputbox3}></input>
                                <label>บาท</label>
                                <br />
                                <label className={styles.inputtext7}>น้ำ :</label>
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    checked={selectedcontract && selectedcontract.daily_type_water_cost === 'type_perunit'? true:false }
                                    onChange={()=>handlerEditContract(
                                        {
                                            target:{
                                            name:"daily_type_water_cost",
                                            value:"type_perunit",
                                            type:"checkbox"
                                            }
                                        }) 
                                    }
                                    className={styles.inputtext6} type='checkbox' />
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    placeholder='0.00'
                                    name = "daily_rate_water"
                                    value ={selectedcontract && selectedcontract.daily_rate_water? selectedcontract.daily_rate_water:'0' }
                            
                                    onChange={handlerEditContract}

                                    className={styles.inputbox1}></input>
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    placeholder='0.00'
                                    
                                    name = "daily_minimum_cost_water"
                                    value ={selectedcontract && selectedcontract.daily_minimum_cost_water? selectedcontract.daily_minimum_cost_water:'0' }
                                    onChange={handlerEditContract}
                                    
                                    className={styles.inputbox2}></input>
                                <label>บาท</label>
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }

                                    checked={selectedcontract && selectedcontract.daily_type_water_cost === 'type_buffet'? true:false }
                                    onChange={()=>handlerEditContract(
                                        {
                                            target:{
                                            name:"daily_type_water_cost",
                                            value:"type_buffet",
                                            type:"checkbox"
                                            }
                                        }) 
                                    }

                                    className={styles.checkbox2}
                                    type='checkbox' />
                                <input
                                    disabled={  (  selectedcontract &&  selectedcontract.typerent === "รายวัน")  ? false:true }
                                    placeholder='0.00'

                                    name ="daily_buffet_cost_water"
                                    value ={selectedcontract && selectedcontract.daily_buffet_cost_water? selectedcontract.daily_buffet_cost_water:'0' }
                                    onChange={handlerEditContract}

                                    className={styles.inputbox3}></input>
                                <label>บาท</label>
                            </div>
                      
                            <div className={styles.input3} >
                               
                                <FileUploader 
                                 disabled={  (  selectedcontract)  ? false:true }
                                 name="filecontract" handleFile={ async (file) =>{
                                    
                                    let data  = await toBase64(file)
                                    handlerEditContract({target:{
                                        name:"filecontract",
                                        value:data
                                    }})
                               
                                    }
                                } />
                              
                              
                            </div>
                            <div className={styles.input3} >
                            { selectedcontract && selectedcontract.filecontract ?  <input type="image" src={selectedcontract.filecontract}  alt="upload Image"  height={100} width={100} /> : null }
                            </div>

                        <div className={styles.buttonzone}>

                            <button className={styles.save} disabled={(selectedcontract ? false : true)}
                                onClick={()=>{
                                    handlderSaveContract(selectedcontract)
                                }}
                             >
                                <SaveIcon />
                                <br />
                                บันทึก
                            </button>



                            <button className={styles.cancel} disabled={(selectedcontract ? false : true)}
                                onClick={() => {
                                    setselectedcontract(null)
                                }}
                            >
                                <CancelIcon />
                                <br />
                                ย้อนกลับ
                            </button>

                        </div>

                    </div>






                </div>


            </div>

        </div>
    </>
)
}