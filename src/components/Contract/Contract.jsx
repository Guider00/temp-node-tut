import styles from './Contract.module.css';
import SaveIcon from '@mui/icons-material/Save';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CalendarPicker from '../../subcomponents/Calendar/Calendar.js';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {
    API_GET_Contract,
    API_DELETE_Contract
} from '../../API/Schema/Contract/Contract'
import {
    API_GET_RoomType
} from '../../API/Schema/RoomType/RoomType'
import { API_GET_Rooms } from '../../API/Schema/Room/Room'
// import { export_Contract } from '../../general_functions/pdf/export/export_pdf';

import { FileUploader } from './FileUploader/FileUploader'
import { filter_rooms, Rooms_to_table, ChangeRadio, FormFilter } from './function';


//address
// import { AddressData } from "../../subcomponents/AddressData/AddressData";

//confirmDialog
import Dialog from '../../subcomponents/ConfirmAlert/ConfirmAlert';


import { useMediaQuery } from 'react-responsive'

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


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
    // const updateContract = useMutation(API_UPDATE_Contract);
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
    const { handleChangeRadio, disabled } = ChangeRadio();
    const { handleChangedformfilter, formfilter, hadleChangedformfilterTodefault, setformfilter } = FormFilter();




    const handlerDeleteContract = async (contract) => {
        try {
            console.log(contract.id)
            let res = await deleteContract({
                variables: {
                    id: `${contract.id}`
                }
            })
            if (res && res.data) {
                Contract.refetch() //<<
            } else {
                // <<
            }
        } catch (e) {
            console.log(e)
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

            handlerDeleteContract(selectedcontract)
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
                                value={DateEnd ? DateStart : ''}
                                className={styles.inputdate}
                                onChange={(e) => {
                                    let { value } = e.target
                                    setDateEnd(value)

                                    let _formfilter = formfilter;
                                    _formfilter['checkin_date_exp'] = value
                                    setformfilter({ ..._formfilter })


                                }}
                            ></input>
                            <Tippy content='เลือกช่วงเวลาที่ต้องการให้แสดง'>
                                <button className={styles.to}
                                    onClick={() => {
                                        setdefaultCalendar({
                                            isLoading: true
                                        })
                                    }}><EventNoteIcon /></button>

                            </Tippy>
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
                                                background: (selectedcontract && selectedcontract.id === item.id) ? 'lightgray' : 'none', fontSize: isDesktop ? '' : isTablet ? '15px' : ''
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
                                            <td>{item && item.Contractnumber ? item.Contractnumber : "---"}</td>
                                            {/* <td>{ item && item.Room && item.Room.RoomType.name  ?  item.Room.RoomType.name :  "---"}</td> */}
                                            <td>{item && item.Room && item.Room.name ? item.Room.name : "---"}</td>
                                            <td>{item && item.Room && item.Room.checkin && item.Room.checkin.checkin_type ? item.Room.checkin.checkin_type : "---"}</td>
                                            <td>{item && item.Room && item.Room.members && item.Room.members.length > 0 && item.Room.members[0].name ? item.Room.members[0].name : "---"}</td>
                                            <td>{item && item.Room && item.Room.members && item.Room.members.length > 0 && item.Room.members[0].lastname ? item.Room.members[0].lastname : "---"}</td>
                                            <td>{item && item.Room && item.Room.checkin && item.Room.checkin.checkin_date ? item.Room.checkin.checkin_date : "---"}</td>
                                            <td>{item && item.status ? item.status : "---"}</td>
                                            <td>{item && item.Room && item.Room.checkout && item.Room.checkout.checkout_date ? item.Room.checkout.checkout_date : "---"}</td>

                                            <td>{item && item.Room && item.Room.checkout && item.Room.checkout.checkout_date ? item.Room.checkout.checkout_date : "---"}</td>

                                        </tr>
                                        ) : null)}



                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div className={styles.button}>
                        <button className={styles.print}
                            onClick={async () => {
                                try {

                                    if (IDrooms && IDrooms.length > 0) {
                                        //    export_Contract(IDrooms,defaultData)
                                        let res = await Promise.all(IDrooms).then((IDrooms) => {
                                            let listres = IDrooms.map(async contract => {
                                                try {
                                                    let res = await deleteContract({
                                                        variables: {
                                                            id: `${contract.id}`
                                                        }
                                                    })
                                                    if (res && res.data) {
                                                        return res
                                                    } else {
                                                        return ("ลบสัญญา Error ")
                                                    }
                                                } catch (e) {
                                                    return e
                                                }
                                            })

                                            return listres;
                                        })
                                        console.log(res)

                                        Contract.refetch()



                                    }
                                } catch (e) {
                                    console.error(e)

                                }
                            }}
                        >พิมพ์</button>
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
                            defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                selectedcontract.Room.RoomType.name ? selectedcontract.Room.RoomType.name : ""}
                        >
                            {console.log('roomtypes', roomtypes)}
                            {roomtypes.map((roomtype, index) => <option key={index.toString()}>{roomtype && roomtype.name ? roomtype.name : "---"}</option>)

                            }

                        </select>

                    </div>

                    <div className={styles.inputmonthandday} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                        {/* <h1 className={styles.line}></h1> */}
                        <div className={styles.month}>
                            <label className={styles.month}>รายเดือน :</label>
                            <input
                                id='month'
                                name='month'
                                type='radio'
                                className={styles.check}
                                onChange={handleChangeRadio}
                                checked={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType && selectedcontract.Room.RoomType.type &&
                                    selectedcontract.Room.RoomType.type === "รายเดือน" ?
                                    true : false
                                }
                            />
                            <div className={styles.input1}>
                                <label className={styles.inputtext1}>ค่าเช่าห้อง :</label>
                                <input
                                    placeholder='0.00'
                                    disabled={disabled.disabledMonth}
                                    className={styles.inputbox1}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.monthlyprice ? selectedcontract.Room.RoomType.monthlyprice : ""}
                                ></input>
                                <label className={styles.inputtext2}>ค่าประกัน :</label>
                                <input
                                    placeholder='0.00'
                                    disabled={disabled.disabledMonth}
                                    className={styles.inputbox2}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.checkin &&
                                        selectedcontract.Room.checkin.rental_deposit ? selectedcontract.Room.checkin.rental_deposit : ""}
                                ></input>
                                <br />
                                <label className={styles.inputtext3}>ค่าเช่าล่วงหน้า :</label>
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
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
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.inputtext6}
                                    type='checkbox'

                                />
                                {console.log('rate_electrical', selectedcontract)}
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.inputbox1}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.rate_electrical ? selectedcontract.Room.RoomType.rate_electrical : ""}
                                ></input>

                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.inputbox2} />
                                <label>บาท</label>
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.checkbox2} type='checkbox' />
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00' className={styles.inputbox3}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.totalprice_electrical ? selectedcontract.Room.RoomType.totalprice_electrical : ""}
                                />
                                <label>บาท</label>
                                <br />
                                <label className={styles.inputtext7}>น้ำ :</label>
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.inputtext6} type='checkbox' />
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.inputbox1}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.rate_water ? selectedcontract.Room.RoomType.rate_water : ""}
                                />
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00'
                                    className={styles.inputbox2}></input>
                                <label>บาท</label>
                                <input
                                    id='D12'
                                    placeholder='0.00' className={styles.checkbox2} type='checkbox' />
                                <input
                                    disabled={disabled.disabledMonth}
                                    placeholder='0.00' className={styles.inputbox3}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.totalprice_water ? selectedcontract.Room.RoomType.totalprice_water : ""}
                                />
                                <label>บาท</label>
                            </div>

                        </div>
                        {/* <h1 className={styles.line}></h1> */}
                        <div className={styles.day}>
                            <label className={styles.day}>รายวัน :</label>
                            <input
                                id='day'
                                name='day'
                                type='radio'
                                className={styles.check}
                                onChange={handleChangeRadio}
                                checked={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType && selectedcontract.Room.RoomType.type &&
                                    selectedcontract.Room.RoomType.type === "รายวัน" ? true : false}

                            />
                            <div className={styles.input1}>
                                <label className={styles.inputtext1}>ค่าเช่าห้อง :</label>
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox1}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.dailyprice ? selectedcontract.Room.RoomType.dailyprice : ""}
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
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00' className={styles.inputtext6} type='checkbox' />
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox1}></input>
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox2}></input>
                                <label>บาท</label>
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.checkbox2}
                                    type='checkbox' />
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox3}></input>
                                <label>บาท</label>
                                <br />
                                <label className={styles.inputtext7}>น้ำ :</label>
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputtext6} type='checkbox' />
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox1}></input>
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox2}></input>
                                <label>บาท</label>
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.checkbox2}
                                    type='checkbox' />
                                <input
                                    disabled={disabled.disabledDay}
                                    placeholder='0.00'
                                    className={styles.inputbox3}></input>
                                <label>บาท</label>
                            </div>
                            {/* <h1 className={styles.line}></h1> */}
                            <div className={styles.input3} >
                                <FileUploader handleFile={(file) =>
                                    console.log('file', file)
                                } />

                            </div>

                            <div className={styles.buttonzone}>

                                <button className={styles.save} disabled={(selectedcontract ? false : true)} >
                                    <SaveIcon />
                                    <br />
                                    บันทึก
                                </button>



                                <button className={styles.cancel} disabled={(selectedcontract ? false : true)}
                                    onClick={() => {
                                        if (selectedcontract) {
                                            handleConfirm('Are you sure to Delete?', true)

                                        } else {
                                            console.log('No select ID')
                                        }


                                    }}
                                >
                                    <CancelIcon />
                                    <br />
                                    ยกเลิกสัญญา
                                </button>

                            </div>

                        </div>






                    </div>


                </div>

            </div>
        </>
    )
}