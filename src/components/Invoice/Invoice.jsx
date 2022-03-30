
import styles from './Invoice.module.css';
import PaymentIcon from '@mui/icons-material/Payment';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DeleteIcon from '@mui/icons-material/Delete';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import { API_GET_Invoice, API_DELETE_Invoice, API_UPDATE_Invoice } from '../../API/Schema/Invoice/Invoice'
import { API_CREATE_Receipt } from '../../API/Schema/Receipt/Receipt'
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

//calendar
import CalendarPicker from '../../subcomponents/Calendar/Calendar.js';
import EventNoteIcon from '@mui/icons-material/EventNote';

// invoice 
import { export_Invoices_pdf } from '../../general_functions/pdf/export/export_pdf';
import { toDDMM, toYYMM, toYYMMDD } from '../../general_functions/convert';
import { filter_rooms } from './function';



//address
import { AddressData } from "../../subcomponents/AddressData/AddressData";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


//confirmDialog
import Dialog from '../../subcomponents/ConfirmAlert/ConfirmAlert';

import { useMediaQuery } from 'react-responsive'

export const Invoice = () => {

    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)"
    });
    const isTablet = useMediaQuery({
        query: "(max-width: 1224px)"
    });

    //address
    const { defaultData } = AddressData();

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

                } if (iDay < 10 && iMonth >= 10) {
                    let _DateStart = DateStart
                    _DateStart = selecteddate.from.year + "-" + selecteddate.from.month + "-0" + selecteddate.from.day
                    setDateStart(_DateStart)

                } if (iDay >= 10 && iMonth < 10) {
                    let _DateStart = DateStart
                    _DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-" + selecteddate.from.day
                    setDateStart(_DateStart)

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

                } if (iDay < 10 && iMonth >= 10) {
                    let _DateEnd = DateEnd
                    _DateEnd = selecteddate.to.year + "-" + selecteddate.to.month + "-0" + DateRange.to.day
                    setDateEnd(_DateEnd)

                } if (iDay >= 10 && iMonth < 10) {
                    let _DateEnd = DateEnd
                    _DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-" + selecteddate.to.day
                    setDateEnd(_DateEnd)

                }
            }

        }
        if (selecteddate && selecteddate.from === null && selecteddate.to === null) {

        } else {
            handleCalendar(false);
        }


    }
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

    //ฟังก์ชั่นเช็คการลบข้อมูลที่เลือก
    const checkstate = async (state) => {

        if (state) {
            Promise.all(IDrooms).then((IDrooms) => {
                IDrooms.map(async (room) => {

                    let _res = await deleteInvoice({
                        variables: {
                            id: `${room.id}`
                        }
                    })

                    if (_res) {
                        Invoice.refetch();

                    }
                    else {
                        console.log('error')
                    }
                }

                )

            })

            handleConfirm('', false)
        } else {
            handleConfirm('', false)
        }

    }
    //Calendar

    const Invoice = useQuery(API_GET_Invoice)


    const [options_search, setoptions_search] = useState({
        text: "",
        keyword: "ทั้งหมด"
    })
    const [IDrooms, setIDrooms] = useState([])
    const [rooms, setrooms] = useState([])
    const [filterrooms, setfilterrooms] = useState([])
    const [deleteInvoice] = useMutation(API_DELETE_Invoice);
    const [updateInvoice] = useMutation(API_UPDATE_Invoice);
    const [createReceipt] = useMutation(API_CREATE_Receipt);
    const [selectroom, setselectroom] = useState(null)
    const [editselectroom, seteditselectroom] = useState(false)

    const [formaddressinvoice , setformaddressinvoice]  = useState({
        name:"",
        lastname:"",
        personalid:"",
        taxnumber:"",
        address:"",
    })
    const handlerformaddressinvoice =(e) =>{
        if(e && e.target){
            let {value,name} = e.target
            if(formaddressinvoice.hasOwnProperty(name)){
                let _formaddressinvoice = {...formaddressinvoice}
                _formaddressinvoice[name]=value
                setformaddressinvoice(_formaddressinvoice)
            }else{
                console.error('formaddressinvoice with out  property')
            }
        }else{
            console.error('handlerformaddressinvoice input undefiend')
        }
    }

    const defaultformter = ({
        inmemory_kwh: "",
        inmemory_kwh_date: "",
        inmemory_finished_kwh: "",
        inmemory_finished_kwh_date: "",
        inmemory_water: "",
        inmemory_water_date: "",
        inmemory_finished_water: "",
        inmemory_finished_water_date: "",

        inmemory_phone_date: "",
        inmemory_finished_phone_date: "",
        phone_price: ""
    })
    const [formmeter, setformmeter] = useState(defaultformter)
    const handlerChangeformmeter = (e) => {
        let { name, value } = e.target
        let _formmeter = JSON.parse(JSON.stringify(formmeter))
        if (_formmeter.hasOwnProperty(name)) {
            _formmeter[name] = value
        }
        setformmeter(_formmeter)
    }

    const sumlists_to_show = (lists) => {
        if (lists && lists.length > 0) {
            let _totalprice = 0
            let _totalvat = 0
            let _grandtotal = 0
            lists.map(list => {
                _totalprice += Number(list_to_show(list).price)
                _totalvat += Number(list_to_show(list).vat)
                _grandtotal += Number(list_to_show(list).total)

                return null;
            })

            return ({ totalprice: Number(_totalprice).toFixed(2), totalvat: Number(_totalvat).toFixed(2), grandtotal: Number(_grandtotal).toFixed(2) })
        } else {
            return ({ totalprice: 0, totalvat: 0, grandtotal: 0 })
        }
    }
    const list_to_show = (list) => {
        let data = list
        let _price = Number((data && data.number_item ? Number(data.number_item) : 1) * (data && data.price ?
            Number(data.type_price === 'ราคารวมvat' ? Number(data.price) * 100 / 107 : Number(data.price)) : 0)).toFixed(2)

        let _vat = Number(data.selectvat === 'คิดvat' ? _price * Number(data.vat) / 100 : 0).toFixed(2)

        let total = Number(Number(_price) + Number(_vat)).toFixed(2)

        return ({ price: _price, vat: _vat, total: total })
    }

    const selectAll = () => {
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


        }


        else {
            for (var z = 0; z < myCheckboxNameLen; z++) {
                myCheckboxName[z].checked = false;
            }

            let _IDrooms = IDrooms.filter(item => item)
            setIDrooms(_IDrooms)




        }



    }
    const [tbsortingstyle_newmetoold, settbsortingstyle_newmetoold] = useState(true);
    const handlerchangesortingstyle = () => {
        let _tbsortingstyle_newtoold = tbsortingstyle_newmetoold
        settbsortingstyle_newmetoold(!_tbsortingstyle_newtoold)
    }
    const handlerchangelist = (e, index) => {
        let _selectroom = JSON.parse(JSON.stringify(selectroom))
        if (e.target.name === 'name') {
            // console.log(e.target.value)
        } else if (e.target.name === 'number_item') {
            // validate data 
        } else if (e.target.name === 'price') {
            // validate data 
        }
        _selectroom.lists[index][e.target.name] = e.target.value
        setselectroom(_selectroom)
    }
    useEffect( ()=>{
        if(selectroom){
            if (rooms && rooms.hasOwnProperty('length')  && IDrooms) {
                let _invoice_ids = IDrooms.map(_invoice => _invoice.id)
                let _IDrooms = rooms.filter(_room => _invoice_ids.findIndex(id => id === _room.id) !== -1)
                console.log('_IDrooms',IDrooms)
              //  setIDrooms(_IDrooms)
                setIDrooms(prevState =>(
                    [..._IDrooms]
                ))
            }else{
                console.error('Type not match')
            }
        }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectroom])
    useEffect(()=>{
        console.log('update selectroom ',rooms)
           if (selectroom) {
                let _selectroom = rooms.find(_room => _room.id === selectroom.id)
                if (_selectroom) {
                   setselectroom( prevState =>({..._selectroom})  ) 
                }
           }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[rooms])

    useEffect(()=>{
        console.log('update filter ')
        if(rooms.hasOwnProperty('length')){
            let _rooms = rooms
            setfilterrooms( JSON.parse(JSON.stringify( _rooms) ) ) 
        }
     
    },[rooms])

    useEffect(() => {
        console.log('update room ')
        if (Invoice && Invoice.data && Invoice.data.Invoices) {
            // let _rooms = rooms
            // _rooms = Invoice.data.Invoices
            console.log('update room Invoice.data.Invoices',Invoice.data.Invoices)
            // setrooms(_rooms)
            setrooms( prevState =>([
                ...Invoice.data.Invoices
            ]))
           

          

        }


    }, [Invoice, Invoice.data])


    let header_table = ["", "เลขที่ใบแจ้งหนี้", "ชื่อห้อง","ชื่อผู้อยู่อาศัย", "วันที่ออก", "สถานะ", "สถานะการพิมพ์", "รอบบิล"]
    // let sim_table = [{ "": "", "เลขที่ใบแจ้งหนี้": "INMV20190030000097", "ชื่อห้อง": "201", "วันที่ออก": "30/12/2021", "สถานะ": "รอชำระเงิน", "สถานะการพิมพ์": "ยังไม่พิมพ์", "รอบบิล": "04/2562" }]

    let header_table2 = ["รายการ", "ชื่อรายการค่าใช้จ่าย", "จำนวน", "จำนวนเงิน", "ราคา", "ภาษีมูลค่าเพิ่ม", "ผลรวม","ราคารวมvat", "vat"]
    // let sim_table2 = [{ "รายการ": "1", "ชื่อรายการค่าใช้จ่าย": "INMV20190030000097", "จำนวน": "1", "จำนวนเงิน": "1200.00", "ราคา": "100.00", "ภาษีมูลค่าเพิ่ม": "888.00", "จำนวนเงิน": "888.00", "ภาษี": "" }]




    return (
        <>
            {Confirm.isLoading && <Dialog onDialog={checkstate} message={Confirm.message} />}
            {defaultCalendar.isLoading && <CalendarPicker onCalendar={CalendarDate} start={handleStart}
                selectedStartDate={DateStart ? new Date(DateStart) : DateStart}
                selectedEndDate={DateEnd ? new Date(DateEnd) : DateEnd} />}
            <div className={styles.container}>
                <div className={styles.display}>
                    <div className={styles.zone1}>
                        <div className={styles.box1}>
                            <div className={styles.topic}>
                                <h3 style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }} >รายการใบแจ้งหนี้</h3>
                            </div>
                            <div className={styles.date} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                <div className={styles.part1}>
                                    <input type="radio"></input>
                                    <label className={styles.onerem}>วันที่</label>
                                    <input className={styles.side1}
                                        type='date'
                                        max={DateEnd}
                                        value={DateStart ? DateStart : ''}
                                        onChange={(e) => {
                                            let { value } = e.target
                                            setDateStart(value)
                                        }}
                                    />

                                    <label>ถึง</label>
                                    <input className={styles.side2}
                                        type='date'
                                        min={DateStart}
                                        value={DateEnd ? DateEnd : ''}
                                        onChange={(e) => {
                                            let { value } = e.target
                                            setDateEnd(value)
                                        }}
                                    />
                                    <Tippy content='เลือกช่วงเวลาที่ต้องการให้แสดง'>
                                        <button
                                            className={styles.calendar}
                                            onClick={() => {
                                                setdefaultCalendar({
                                                    isLoading: true
                                                })
                                            }}
                                        ><EventNoteIcon /></button>

                                    </Tippy>
                                    <label>แสดงผล</label>
                                    <input className={styles.side3} placeholder='0.00'></input>
                                    <label>เดือน</label>
                                </div>
                                <div className={styles.part2}>
                                    <input type="radio"></input>
                                    <label className={styles.semirem}>รอบบิล</label>
                                    <input className={styles.side1} type='date' />

                                    <label>ถึง</label>
                                    <input className={styles.side2} type='date' />

                                </div>
                                <div className={styles.part3}>
                                    <input type="checkbox" id='select-all' onChange={selectAll} />
                                    <label className={styles.onerem}>เลือกทั้งหมด</label>

                                </div>

                            </div>
                            <div className={styles.main} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                <div className={styles.research}>
                                    <input className={styles.input1}
                                        type="text"
                                        value={options_search.text}
                                        onChange={(e) => {
                                            let _options_search = options_search
                                            _options_search.text = e.target.value
                                            setoptions_search({ ..._options_search })
                                        }} />
                                    <select className={styles.input3}
                                        value={options_search.keyword}
                                        onChange={(e) => {
                                            let _options_search = options_search
                                            _options_search.keyword = e.target.value
                                            setoptions_search({ ..._options_search })

                                        }}


                                    >
                                        <option>ทั้งหมด</option>
                                        <option>ชื่อห้อง</option>
                                        <option>รอบบิล</option>
                                        <option>ชื่อผู้พักอาศัย</option>


                                    </select>
                                    <button className={styles.input2}
                                        onClick={async () => {
                                            let _filter_rooms = []
                                            _filter_rooms = filter_rooms(rooms, options_search)
                                            setfilterrooms(_filter_rooms);

                                        }}

                                    >กรอง</button>

                                </div>








                            </div>
                            <div className={styles.tablecontent} >
                                <table className={styles.table}>
                                    <thead className={styles.header}>
                                        <tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                            <td onClick={handlerchangesortingstyle}> {tbsortingstyle_newmetoold ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />} </td>
                                            <td>{header_table[1]}</td>
                                            <td>{header_table[2]}</td>
                                            <td>{header_table[3]}</td>
                                            <td>{header_table[4]}</td>
                                            <td>{header_table[5]}</td>
                                            <td>{header_table[6]}</td>
                                            <td>{header_table[7]}</td>
                                        </tr>
                                    </thead>

                                    <tbody className={styles.body}>{
                                        (tbsortingstyle_newmetoold ? [...filterrooms].reverse() : [...filterrooms]).map((data) =>
                                            <tr
                                                onClick={() => {

                                                   
                                                    let  _selectroom = data
                                                    setselectroom(_selectroom)
                                                    setformmeter({ ...defaultformter })
                                                    seteditselectroom(false)
                                                    console.log(  _selectroom.customer )
                                                    if( _selectroom.customer.name !== "")
                                                    {
                                                       
                                                        setformaddressinvoice({ ..._selectroom.customer })
                                           
                                                    }else{
                                                        setformaddressinvoice({
                                                            name:_selectroom.Room.members[0].name,
                                                            lastname:_selectroom.Room.members[0].lastname,
                                                            personalid:_selectroom.Room.members[0].personalid,
                                                            taxnumber:_selectroom.Room.members[0].taxnumber,
                                                            address:_selectroom.Room.members[0].address,
                                                        })
                                                    }

                                                }}
                                                style={{
                                                    background: (selectroom && (selectroom.id === data.id)) ? 'lightgray' : 'none'


                                                }}>
                                                <td style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                                    <input type="checkbox"
                                                        name="myCheckboxName"
                                                        id="myCheckboxId"
                                                        checked={( IDrooms.findIndex(x => x &&  x.id === data.id) !== -1) ? true : false}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked
                                                            const id = data.id
                                                            if (checked) {
                                                                let _IDrooms = JSON.parse(JSON.stringify(IDrooms))
                                                                _IDrooms = [..._IDrooms, data]
                                                                setIDrooms(_IDrooms)
                                                                console.log("check", _IDrooms)


                                                            }
                                                            else {
                                                                let _IDrooms = IDrooms.filter(item => item.id !== id)
                                                                setIDrooms(_IDrooms)
                                                                console.log('uncheck', _IDrooms)
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td>{data && data.id}</td>
                                                <td>{data && data.Room && data.Room.name ? data.Room.name : '---'}</td>
                                                <td>{data && data.Room && data.Room.members && data.Room.members[0] && data.Room.members[0].name ? data.Room.members[0].name : '---'}</td>
                                                <td>{data && data.duedateinvoice ? toYYMMDD(data.duedateinvoice) : '---'}</td>
                                                <td>{data && data.status ? data.status : '---'}</td>
                                                <td>{data && data.printstatus ? data.printstatus : '---'}</td>
                                                <td>{data && data.monthlybilling ? toYYMM(data.monthlybilling) : '---'}</td>


                                            </tr>
                                        )
                                    }
                                    </tbody>




                                </table>
                            </div>


                        </div>
                        <div className={styles.box3} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                            <button className={styles.button1}
                                onClick={() => {
                                    if (IDrooms && IDrooms.length > 0) {

                                        export_Invoices_pdf(IDrooms, defaultData)


                                        Promise.all(IDrooms).then((IDrooms) => {
                                            IDrooms.map(async (invoice) => {
                                                try {
                                                    let _res = await updateInvoice({
                                                        variables: {
                                                            id: invoice.id,
                                                            input: {
                                                                printstatus: "พิมพ์สำเร็จ"
                                                            }
                                                        }
                                                    })
                                                    if (_res && _res.data) {
                                                        console.log('เปลี่ยนสถานะการพิมพ์สำเร็จ')
                                                        Invoice.refetch();

                                                    } else {
                                                        console.error('ไม่สามารถ update สถานะ Invoice ')
                                                    }
                                                } catch (e) {
                                                    console.error('ไม่สามารถ update สถานะ Invoice ')
                                                }
                                            })
                                        })

                                    } else {
                                        console.error('ไม่ได้ทำการเลือกห้อง', IDrooms)
                                    }

                                }}
                            >
                                <i><LocalPrintshopIcon /></i>
                                <div>พิมพ์ทั้งหมดที่เลือก</div>
                            </button>
                            <button className={styles.button2}
                                onClick={async () => {

                                    Promise.all(IDrooms).then((IDrooms) => {
                                        IDrooms.map(async (invoice) => {
                                            try {
                                                console.log('debug invoice', invoice)
                                                /// create Receipt 
                                                let _res_Receipt = await createReceipt({
                                                    variables: {
                                                        input: {
                                                            status: "รอการพิมพ์",
                                                            invoiceid: invoice.id,
                                                            lists: invoice.lists.map(option => ({
                                                                name: option.name,
                                                                price: option.price,
                                                                number_item: option.number_item.toString(),
                                                                vat: option.vat,
                                                                type_price: option.type_price,
                                                                selectvat: option.selectvat
                                                            })),
                                                            customer:{
                                                                name: invoice.customer.name,
                                                                lastname: invoice.customer.lastname,
                                                                personalid: invoice.customer.personalid,
                                                                taxnumber: invoice.customer.taxnumber,
                                                                address: invoice.customer.address,
                                                                tel: invoice.customer.tel,
                                                                email: invoice.customer.email
                                                            },
                                                            monthlybilling:invoice.monthlybilling
                                                        }
                                                    }
                                                })
                                                if (_res_Receipt && _res_Receipt.data) {
                                                    console.log('สร้าง ใบเสร็จ สำเร็จ')
                                                } else {
                                                    console.error('ไม่สามารถ create  Receipt ')
                                                }

                                                /// create  update สถานะ Invoice 
                                                let _res = await updateInvoice({
                                                    variables: {
                                                        id: invoice.id,
                                                        input: {
                                                            status: "สำเร็จ"

                                                        }
                                                    }
                                                })
                                                if (_res && _res.data) {
                                                    console.log('เปลี่ยนสถานะสำเร็จ')
                                                    Invoice.refetch();

                                                } else {
                                                    console.error('ไม่สามารถ update สถานะ Invoice ')
                                                }



                                            } catch (e) {
                                                console.error('ไม่สามารถ update สถานะ Invoice ')
                                            }
                                        })
                                    })

                                }}
                            >
                                <i><PaymentIcon /></i>
                                <div>ชำระทั้งหมดที่เลือก</div>
                            </button>
                            <button className={styles.button3}
                                onClick={() => {
                                    handleConfirm('Are you sure to Delete?', true)
                                }
                                }

                            >
                                <i><DoNotDisturbIcon /></i>
                                <div>ยกเลิกทั้งหมดที่เลือก</div>
                            </button>
                        </div>




                    </div>
                    <div className={styles.zone2}>
                        <div className={styles.box2}>

                            <div className={styles.topic1}>

                                <h3 style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }} >บันทึกมิเตอร์</h3>
                            </div>
                            <div className={styles.topzone} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                 {/* //TODO: ทำเป็น form ที่อยู่ใบแจ้งหนี้แยก  */}
                                 <div className={styles.top}>
                                    <div className={styles.textX} >
                                        <h4 style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }} >ข้อมูลใบแจ้งหนี้</h4>
                                    </div>
                                 </div>
                                <div className={styles.top}>

                                    <div className={styles.textX} >ชื่อ</div>
                                    <div className={styles.inputX}>
                                        <input 
                                            disabled={ (selectroom)?false:true}
                                            name="name"
                                            value={formaddressinvoice.name} onChange={handlerformaddressinvoice}>
                                        </input>
                                    </div>
                                </div>
                                <div className={styles.top}>
                                    <div className={styles.textX} >นามสกุล</div>
                                    <div className={styles.inputX}>
                                        <input  
                                            disabled={ (selectroom)?false:true}
                                            name="lastname"
                                            value={formaddressinvoice.lastname} onChange={handlerformaddressinvoice} >
                                        </input>
                                    </div>
                                </div>
                                <div className={styles.top}>
                                    <div className={styles.textX} >บัตรประชาชน</div>
                                    <div className={styles.inputX}>
                                        <input 
                                            disabled={ (selectroom)?false:true}
                                            name="personalid"
                                            value={formaddressinvoice.personalid} onChange={handlerformaddressinvoice} >
                                        </input>
                                    </div>
                                </div>
                                <div className={styles.top}>
                                    <div className={styles.textX} >เลขประจำตัวผู้เสียภาษี</div>
                                    <div className={styles.inputX}>
                                        <input 
                                            disabled={ (selectroom)?false:true}
                                            name="texinvoice"
                                            value={formaddressinvoice.taxnumber} onChange={handlerformaddressinvoice}>
                                        </input>
                                    </div>
                                </div>
                                <div className={styles.top}>
                                    <div className={styles.textX} >ที่อยู่ตามบัตรประชาชน</div>
                                    <div className={styles.inputX}>
                                        <input 
                                            disabled={ (selectroom)?false:true}
                                            name="address"
                                            value={formaddressinvoice.address} onChange={handlerformaddressinvoice}>
                                        </input>
                                    </div>
                                </div>

                               
    
                            </div>
                 
                            <div className={styles.display} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>

                                <div className={styles.topic2}>
                                    <label className={styles.text1}>ครั้งก่อน</label>
                                    <label className={styles.text2}>วันที่บันทึก</label>
                                    <div className={styles.input}>
                                        <label className={styles.rightrem}>ไฟฟ้า</label>
                                        <input name="inmemory_kwh" value={formmeter.inmemory_kwh} onChange={handlerChangeformmeter} className={styles.input1} placeholder='0.00'></input>
                                        <input name="inmemory_kwh_date" value={formmeter.inmemory_kwh_date} onChange={handlerChangeformmeter} className={styles.input2} type='date' />

                                    </div>
                                    <div className={styles.input}>
                                        <label className={styles.rightrem}>น้ำ</label>
                                        <input name="inmemory_water" value={formmeter.inmemory_water} onChange={handlerChangeformmeter} className={styles.input3} placeholder='0.00'></input>
                                        <input name="inmemory_water_date" value={formmeter.inmemory_water_date} onChange={handlerChangeformmeter} className={styles.input2} type='date' />
                                    </div>

                                </div>
                                <div className={styles.topic3}>
                                    <label className={styles.text1} >ล่าสุด</label>
                                    <label className={styles.text2}>วันที่บันทึก</label>
                                    <div className={styles.input}>
                                        <input name="inmemory_finished_kwh" value={formmeter.inmemory_finished_kwh} onChange={handlerChangeformmeter} className={styles.input1} placeholder='0.00'></input>
                                        <input name="inmemory_finished_kwh_date" value={formmeter.inmemory_finished_kwh_date} onChange={handlerChangeformmeter} className={styles.input2} type='date' />
                                    </div>
                                    <div className={styles.input}>
                                        <input name="inmemory_finished_water" value={formmeter.inmemory_finished_water} onChange={handlerChangeformmeter} className={styles.input1} placeholder='0.00'></input>
                                        <input name="inmemory_finished_water_date" value={formmeter.inmemory_finished_water_date} onChange={handlerChangeformmeter} className={styles.input2} type='date' />
                                    </div>

                                </div>
                            </div>

                            <div className={styles.topic4} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                <label className={styles.text1} >วันที่เริ่ม</label>
                                <label className={styles.text2} >วันที่สิ้นสุด</label>
                                <label className={styles.text3} >ค่าโทรศัพท์</label>
                                <div className={styles.input}>
                             
                                    <button name="readmeter" className={styles.btnreadmeter}
                                            disabled={!editselectroom}
                                            onClick={() => {
                                                let _invoice = { ...selectroom }
                                                let _formmeter = JSON.parse(JSON.stringify(formmeter))
                                                console.log('debug inmemory_finished_water_date',_invoice.Room.meterroom)
                                                if (_invoice && _invoice.Room && _invoice.Room.meterroom) {
                                                    let { inmemory_kwh, inmemory_kwh_date, inmemory_water, inmemory_water_date,
                                                        inmemory_finished_kwh, inmemory_finished_kwh_date, inmemory_finished_water, inmemory_finished_water_date
                                                    } = _invoice.Room.meterroom
                                                    _formmeter['inmemory_kwh'] = inmemory_kwh
                                                    _formmeter['inmemory_kwh_date'] = inmemory_kwh_date
                                                    _formmeter['inmemory_water'] = inmemory_water
                                                    _formmeter['inmemory_water_date'] = inmemory_water_date
                                                    _formmeter['inmemory_finished_kwh'] = inmemory_finished_kwh
                                                    _formmeter['inmemory_finished_kwh_date'] = inmemory_finished_kwh_date
                                                    _formmeter['inmemory_finished_water'] = inmemory_finished_water
                                                    _formmeter['inmemory_finished_water_date'] = inmemory_finished_water_date
                                                }

                                                setformmeter(_formmeter)
                                            }}>อ่านจาก Meter</button>
                                  
                                    <label className={styles.text4} >โทรศัพท์</label>
                                    <input name="inmemory_phone_date" value={formmeter.inmemory_phone_date} onChange={handlerChangeformmeter} className={styles.input1} type='date' />
                                    <input name="inmemory_finished_phone_date" value={formmeter.inmemory_finished_phone_date} onChange={handlerChangeformmeter} className={styles.input2} type='date' />
                                    <input name="phone_price" value={formmeter.phone_price} onChange={handlerChangeformmeter} className={styles.input3} placeholder='0.00' />
                                </div>



                            </div>
                            <div className={styles.topic5} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                <button
                                    disabled={!editselectroom}
                                    onClick={() => {
                                        let _invoice = { ...selectroom }
                                        console.log('debug invoice', _invoice.Room.RoomType.rate_electrical)
                                        // เพิ่มค่า น้ำ ค่า ไฟ ไปยังรายการ 
                                        if (formmeter.inmemory_kwh !== "" && formmeter.inmemory_finished_kwh !== "") {

                                            // สร้างรายการค่าไฟ

                                            if (_invoice && _invoice.lists) {
                                                _invoice.lists = [..._invoice.lists, {
                                                    name: `ค่าไฟฟ้า ${Number(formmeter.inmemory_kwh)} [${toDDMM(formmeter.inmemory_kwh_date)} ] -->  ${Number(formmeter.inmemory_finished_kwh)} [${toDDMM(formmeter.inmemory_finished_kwh_date)} ]`,
                                                    price: _invoice && _invoice.Room && _invoice.Room.RoomType &&
                                                        _invoice.Room.RoomType.rate_electrical ? _invoice.Room.RoomType.rate_electrical : 0,
                                                    number_item: Number(formmeter.inmemory_finished_kwh) - Number(formmeter.inmemory_kwh),
                                                    type_price: "", vat: "7", selectvat: "คิดvat"
                                                }]
                                            }
                                        }
                                        if (formmeter.inmemory_water !== "" && formmeter.inmemory_finished_water !== "") {
                                            // สร้างรายการค่าน้ำ
                                            if (_invoice && _invoice.lists) {
                                                _invoice.lists = [..._invoice.lists, {
                                                    name: `ค่าน้ำ ${Number(formmeter.inmemory_water)} [${toDDMM(formmeter.inmemory_water_date)} ] -->  ${Number(formmeter.inmemory_finished_water)} [${toDDMM(formmeter.inmemory_finished_water_date)} ]`,
                                                    price: _invoice && _invoice.Room && _invoice.Room.RoomType
                                                        && _invoice.Room.RoomType.rate_water ? _invoice.Room.RoomType.rate_water : 0,
                                                    number_item: Number(formmeter.inmemory_finished_water) - Number(formmeter.inmemory_water),
                                                    type_price: "", vat: "7", selectvat: "คิดvat"
                                                }]
                                            }
                                        }

                                        if (formmeter.phone_price !== "") {
                                            if (_invoice && _invoice.lists) {
                                                _invoice.lists = [..._invoice.lists, {
                                                    name: `ค่าโทรศัพท์ [${toDDMM(formmeter.inmemory_phone_date)}] -->  [${toDDMM(formmeter.inmemory_finished_phone_date)}]`,
                                                    price: formmeter.phone_price ? formmeter.phone_price : 0,
                                                    number_item: 1,
                                                    type_price: "", vat: "7", selectvat: "คิดvat"
                                                }]
                                            }
                                        }
                                        setselectroom(_invoice)
                                        console.log(formmeter)
                                    }}> เพิ่มรายการ มิเตอร์</button>
                            </div>
                            <div className={styles.table}>
                                <table >
                                    <thead className={styles.header}>
                                        <tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                            <td> # </td>
                                            <td>{header_table2[1]}</td>
                                            <td>{header_table2[2]}</td>
                                            <td>{header_table2[3]}</td>
                                            <td>{header_table2[4]}</td>
                                            <td>{header_table2[5]}</td>
                                            <td>{header_table2[6]}</td>
                                            <td>{header_table2[7]}</td>
                                            <td>{header_table2[8]}</td>
                                            {editselectroom ? <td> </td> : null}

                                        </tr>
                                    </thead>
                                    <tbody className={styles.body}>{
                                        (selectroom ? selectroom.lists : []).map((data, index) =>
                                            <tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                                <td>{index + 1}</td>
                                                <td> <input type='text' name="name" onChange={(e) => handlerchangelist(e, index)}
                                                    disabled={!editselectroom}
                                                    value={data && data.name ? data.name : ""} /></td>
                                                <td> <input type='text' name="number_item" onChange={(e) => handlerchangelist(e, index)}
                                                    disabled={!editselectroom}
                                                    value={data && data.number_item ? data.number_item : 1} /></td>
                                                <td> <input type='text' name="price" onChange={(e) => handlerchangelist(e, index)}
                                                    disabled={!editselectroom}
                                                    value={data && data.price ? data.price : 0} /></td>
                                                <td>{list_to_show(data).price}</td>
                                                <td>{list_to_show(data).vat}</td>
                                                <td>{list_to_show(data).total}</td>
                                                <td>
                                                    <input type="checkbox"
                                                        onChange={(e) => {
                                                            let _invoice = JSON.parse(JSON.stringify(selectroom))
                                                           
                                                            _invoice.lists[index].type_price = (_invoice.lists[index].type_price === 'ราคารวมvat' ? "ราคาไม่รวมvat" : 'ราคารวมvat' ) 
                                                            if( _invoice.lists[index].type_price === 'ราคารวมvat'){
                                                                _invoice.lists[index].selectvat = 'คิดvat'
                                                            }
                                                            setselectroom({..._invoice})
                                                        }}
                                                        checked={data && data.type_price && data.type_price === 'ราคารวมvat' ? true : false}
                                                    />
                                                </td>
                                                <td>
                                                    <input type="checkbox"
                                                        onChange={(e) => {
                                                            let _invoice = JSON.parse(JSON.stringify(selectroom))
                                                            _invoice.lists[index].selectvat = _invoice.lists[index].selectvat === 'คิดvat' ? "ไม่คิดvat" : 'คิดvat'
                                                            if(_invoice.lists[index].selectvat === 'ไม่คิดvat' ){
                                                                _invoice.lists[index].type_price = 'ราคาไม่รวมvat';
                                                            }
                                                            setselectroom(_invoice)
                                                        }}
                                                        checked={data && data.selectvat && data.selectvat === 'คิดvat' ? true : false}
                                                    />
                                                </td>
                                                {editselectroom ?
                                                    <td>
                                                        <button
                                                            onClick={async () => {
                                                                let _invoice = JSON.parse(JSON.stringify(selectroom))

                                                                _invoice.lists.splice(index, 1)
                                                                setselectroom(_invoice)
                                                            }}
                                                        ><DeleteIcon style={{
                                                            'maxHeight': "1rem",
                                                            'maxWidth': "1rem"
                                                        }} /></button>
                                                    </td> : null
                                                }
                                            </tr>
                                        )
                                    }
                                    </tbody>




                                </table>
                            </div>
                            <div button className={styles.button} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>

                                <button className={styles.button1}
                                    disabled={!editselectroom}
                                    onClick={() => {
                                        console.log('selectroom', selectroom)
                                        let _invoice = { ...selectroom }
                                        if (_invoice && _invoice.lists) {
                                            _invoice.lists = [..._invoice.lists, {
                                                name: "", price: "", number_item: "", type_price: "", vat: "7", selectvat: "คิดvat"
                                            }]

                                            setselectroom(_invoice)
                                        }


                                    }}
                                >เพิ่มรายการ</button>

                                <div className={styles.lastresult} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                    <div className={styles.head} >
                                        <label>รวม</label>
                                        <input className={styles.onerem} placeholder='0.00' disabled={true}
                                             value = {sumlists_to_show(
                                                selectroom && selectroom.lists ? selectroom.lists : []
                                            ).totalprice}
                                             >
                                        </input>
                                        <label className={styles.onerem}>บาท</label>
                                    </div>
                                    <div className={styles.head}>
                                        <label>ภาษีมูลค่าเพิ่ม 7%</label>
                                        <input className={styles.onerem} placeholder='0.00' disabled={true}
                                            value = {sumlists_to_show(
                                            selectroom && selectroom.lists ? selectroom.lists : []
                                        ).totalvat}></input>
                                        <label className={styles.onerem}>บาท</label>
                                    </div>
                                    <div className={styles.head}>
                                        <label>รวมยอกเงินสุทธิ</label>
                                        <input className={styles.onerem} placeholder='0.00' disabled={true}
                                        value={sumlists_to_show(
                                            selectroom && selectroom.lists ? selectroom.lists : []
                                        ).grandtotal}></input>
                                        <label className={styles.onerem}>บาท</label>
                                    </div>

                                </div>
                           
                            </div>

                            <div className={styles.box4} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                <button className={styles.button1}
                                    onClick={() => {

                                        seteditselectroom(!editselectroom)
                                    }}
                                >
                                    <i><EditOutlinedIcon /></i>
                                    <div>{editselectroom ? "ยกเลิกแก้ไข" : "แก้ไข"}</div>
                                </button>
                                <button className={styles.button2} onClick={async () => {
                                    let _invoice = { ...selectroom }
                                    try {
                                        console.log('debug', _invoice.lists)
                                        let _res = await updateInvoice({
                                            variables: {
                                                id: _invoice.id,
                                                input: {
                                                    lists: _invoice.lists.map(option => ({
                                                        name: option.name,
                                                        price: option.price,
                                                        number_item: option.number_item.toString(),
                                                        vat: option.vat,
                                                        type_price: option.type_price,
                                                        selectvat: option.selectvat
                                                    })),
                                                    customer:{
                                                        name: formaddressinvoice.name,
                                                        lastname: formaddressinvoice.lastname,
                                                        personalid: formaddressinvoice.personalid,
                                                        taxnumber: formaddressinvoice.taxnumber,
                                                        address: formaddressinvoice.address,
                                                        tel: "",
                                                        email: ""
                                                    }
                                                }
                                            }
                                        })
                                        if (_res && _res.data) {
                                            console.log('เปลี่ยนสถานะการพิมพ์สำเร็จ')
                                            Invoice.refetch();

                                        } else {
                                            console.error('ไม่สามารถ update สถานะ Invoice ')
                                        }
                                    } catch (e) {
                                        console.error('ไม่สามารถ update สถานะ Invoice ')
                                    }
                                }}>
                                    <i><SaveOutlinedIcon /></i>
                                    <div>บันทึก</div>
                                </button>
                                <button className={styles.button3}
                                    onClick={() => {
                                        setselectroom(null)
                                        seteditselectroom(false)
                                    }}>
                                    <i><CancelOutlinedIcon /></i>
                                    <div>ยกเลิก</div>
                                </button>

                            </div>

                        </div>
                       
                    </div>
                </div>

            </div>
        </>
    )
}