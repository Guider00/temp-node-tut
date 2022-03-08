import styles from './Reportelectrical.module.css'
import { useEffect, useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ExplicitIcon from '@mui/icons-material/Explicit';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { API_queryBuildings } from '../../../API';

const filter_rooms = (rooms, formFilter, selectType) => {
    let _filter_rooms = []
    if (rooms && formFilter) {
        _filter_rooms = rooms.filter(room => {
            if (formFilter.building === 'เลือกอาคารทั้งหมด' && (selectType.sum === true)) {
                console.log('All')
            } else if (formFilter.building === 'A' && (selectType.sum === false)) {

            }
        })
    }



}






export const Reportelectrical = () => {


    //TableData

    const Table = [{ 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }, { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', },
    { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }, { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }
        , { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }, { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }
        , { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }, { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }
        , { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }, { 'room': 'A', 'name': '211', 'model': 'A-214', 'startingUnit': '100', 'terminationUnit': '100', 'difference': '100', 'sum': '800', 'percent': '7%', }]

    //StatusShowData
    const [showTablePrice, setShowTablePrice] = useState(false)
    //Status เลือกการกรอง
    const [selectType, setSelectType] = useState({
        'sum': false,
        'detail': false,
        'disabled1': true,
        'disabled2': true,
        'type': '0',

    })
    //Function รับค่า ERROR
    const [formErrors, setFormErrors] = useState({ 'default': 'nothingChange' })
    const [defaultFormErrors, setDefaultFormErrors] = useState({ 'default': 'nothingChange' })

    //Function เลือก disabled enable clearData รายละเอียดและผลรวม

    const handleSelectType = (e) => {
        let { name, checked } = e.target

        if (name === 'sum' && checked === true) {
            let checked = { ...selectType, sum: true, detail: false, disabled1: false, disabled2: true, type: '1' }
            setSelectType(checked)
            setFormErrors(defaultFormErrors)
            let clear = { ...formFilter, amount_rooms: 0, fromDate: '', fromTime: '', toDate: '', toTime: '', typeTime: '', date: '', price: 0 }
            setFormfilter(clear)

        }
        if (name === 'sum' && checked === false) {
            let checked = { ...selectType, sum: false, detail: false, disabled1: true, type: '0' }
            setSelectType(checked)
            setFormErrors(defaultFormErrors)
            let clear = { ...formFilter, amount_rooms: 0, fromDate: '', fromTime: '', toDate: '', toTime: '', typeTime: '', date: '', price: 0 }
            setFormfilter(clear)

        }
        if (name === 'detail' && checked === true) {
            let checked = { ...selectType, detail: true, sum: false, disabled1: true, disabled2: false, type: '2' }
            setSelectType(checked)
            setFormErrors(defaultFormErrors)
            let clear = { ...formFilter, amount_rooms: 0, fromDate: '', fromTime: '', toDate: '', toTime: '', typeTime: '', date: '', price: 0 }
            setFormfilter(clear)
        }
        if (name === 'detail' && checked === false) {
            let checked = { ...selectType, detail: false, sum: false, disabled2: true, type: '0' }
            setSelectType(checked)
            setFormErrors(defaultFormErrors)
            let clear = { ...formFilter, amount_rooms: 0, fromDate: '', fromTime: '', toDate: '', toTime: '', typeTime: '', date: '', price: 0 }
            setFormfilter(clear)


        }

    }
    //default Data
    const [formFilter, setFormfilter] = useState({
        building: 'ทั้งหมด',
        amount_rooms: 0,
        fromDate: '',
        fromTime: '',
        toDate: '',
        toTime: '',
        typeTime: '',
        date: '',
        price: 0,
    })


    //ตัวแปรรับค่าใส่ใน กรอบกรองฝั่งขวา
    const [showData, setShowData] = useState([])
    //ตัวแปรรับค่าจาก API BUILDINGS
    const [optionBuilding, setOptionBuilding] = useState([])
    //function รับค่าตอนกรอกค่า ***ยกเว้น ราคาต่อหน่วย-จำนวนห้อง
    const handleSetFormFilter = (e) => {
        let _formFilter = formFilter

        if (e.target.id === 'toTime' || e.target.id === 'toDate' || e.target.id === 'fromTime' || e.target.id === 'fromDate') {
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({ ..._formFilter })
            setFormErrors(validate(_formFilter))
            console.log('_formFilter', _formFilter)
        } else if (e.target.id === 'building') {
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({ ..._formFilter })
            console.log('_formFilter', _formFilter)
        } else if (e.target.id === 'amount_rooms' || e.target.id === 'price') {
            let text = /[^0-9]/ig;
            e.target.value = e.target.value.replace(text, '')
            _formFilter[e.target.id] = parseInt(e.target.value);
            setFormfilter({ ..._formFilter })
            setFormErrors(validate(_formFilter))
            console.log('_formFilter', _formFilter)

        }
    }
    //function รับค่าตอนกรอกค่า  ***ราคาต่อหน่วย-จำนวนห้อง
    const handleSetFormFilterDate = (e) => {
        let _formFilter = formFilter

        if (e.target.id === 'date' || e.target.id === 'typeTime') {
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({ ..._formFilter })
            setFormErrors(validateDate(_formFilter))
            console.log('_formFilter', _formFilter)
        } else if (e.target.id === 'amount_rooms' || e.target.id === 'price') {
            let text = /[^0-9]/ig;
            e.target.value = e.target.value.replace(text, '')
            _formFilter[e.target.id] = parseInt(e.target.value);
            setFormfilter({ ..._formFilter })
            setFormErrors(validateDate(_formFilter))
            console.log('_formFilter', _formFilter)

        } else if (e.target.id === 'building') {
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({ ..._formFilter })
            console.log('_formFilter', _formFilter)
        }

    }
    //function ตรวจสอบ ***ผลรวม
    const validate = (e) => {
        const errors = {}
        if (!e.amount_rooms || e.amount_rooms === '') {
            errors.amount_rooms = 'amount is not required!'
        }
        if (!e.price) {
            errors.price = 'price/unit is not required!'
        }
        if (!e.fromDate || !e.fromTime || !e.toDate || !e.toTime) {
            errors.period = 'period is not required!'
        }

        console.log('Error1', errors)
        return errors
    }
    //function ตรวจสอบ ***รายละเอียด
    const validateDate = (e) => {
        const errors = {}
        if (!e.date || e.date === '' || !e.typeTime) {
            errors.date = 'period is not required!'
        }
        if (!e.price) {
            errors.price = 'price/unit is not required!'
        }
        if (!e.amount_rooms || e.amount_rooms === '') {
            errors.amount_rooms = 'amount is not required!'
        }

        console.log('Error2', errors)
        return errors

    }
    //function รับค่า option
    const getBuilding = async () => {
        return new Promise(async (resolve, reject) => {
            let res = await API_queryBuildings()
            let building = [];
            if (res && res.status === 200) {
                building = res.data.Buildings.map(e => ({ label: e.name, value: e.id }))
            }

            resolve({ 'building': building })
        }).catch((e) => {
            console.log('Promis Error', e);
            return ({ building: [] })

        })
    }

    useEffect(() => {
        const initial_data = async () => {
            let data = await getBuilding()
            setOptionBuilding(data.building)

            console.log("data.building", data.building)

        }
        initial_data()



    }, [])



    return (
        <>
            <div className={styles.container}>
                <div className={styles.headText}>
                    <h2>Report electrical</h2>
                </div>
                <div className={styles.cardMain}>
                    <div className={styles.cardData}>
                        <div className={styles.header}>
                            <h3>ยอดรวมไฟฟ้า</h3>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.selectBuilding}>
                                <div>
                                    <label>อาคาร</label>
                                    <select
                                        id='building'
                                        onChange={selectType.type === '1' ? handleSetFormFilter : selectType.type === '2' ? handleSetFormFilterDate : null}
                                    >
                                        <option>ทั้งหมด</option>
                                        {
                                            optionBuilding.map((item, index) =>
                                                <option key={index}>{item.label}</option>
                                            )
                                        }

                                    </select>

                                    <label>จำนวนห้อง</label>
                                    <input placeholder='0'
                                        id='amount_rooms'
                                        value={formFilter.amount_rooms ? formFilter.amount_rooms : 0}
                                        disabled={selectType.type === '1' ? false : selectType.type === '2' ? false : true}
                                        onChange={selectType.type === '1' ? handleSetFormFilter : selectType.type === '2' ? handleSetFormFilterDate : null}
                                    ></input>

                                </div>
                                <label style={{ color: 'red' }} >{formErrors.amount_rooms ? formErrors.amount_rooms : null}</label>
                            </div>


                            <div className={styles.selectDate}>
                                <div className={styles.head}>
                                    <label>ผลรวม</label>
                                    <input
                                        checked={selectType.sum}
                                        type='checkbox'
                                        name='sum'
                                        onChange={handleSelectType}
                                    />
                                </div>
                                <div>
                                    <label>จาก วันที่-เวลา</label>
                                    <div>
                                        <input
                                            className={styles.datePicker}
                                            type='date'
                                            id='fromDate'
                                            value={formFilter.fromDate ? formFilter.fromDate : ''}
                                            max={formFilter.toDate}
                                            disabled={selectType.disabled1}
                                            onChange={handleSetFormFilter}
                                        />
                                    </div>
                                    <input
                                        type='time'
                                        id='fromTime'
                                        value={formFilter.fromTime ? formFilter.fromTime : ''}
                                        max={formFilter.toTime}
                                        disabled={selectType.disabled1}
                                        onChange={handleSetFormFilter}
                                    />

                                    <label>ถึง วันที่-เวลา</label>
                                    <div>
                                        <input
                                            className={styles.datePicker}
                                            type='date'
                                            id='toDate'
                                            value={formFilter.toDate ? formFilter.toDate : ''}
                                            min={formFilter.fromDate}
                                            disabled={selectType.disabled1}
                                            onChange={handleSetFormFilter}
                                        />

                                    </div>

                                    <input
                                        type='time'
                                        id='toTime'
                                        value={formFilter.toTime ? formFilter.toTime : ''}
                                        disabled={selectType.disabled1}
                                        onChange={handleSetFormFilter}
                                    />

                                </div>
                                <label style={{ color: 'red' }}>{formErrors.period ? formErrors.period : null}</label>




                            </div>
                            <div className={styles.selectDefault}>
                                <div className={styles.head}>
                                    <label>รายละเอียด :</label>
                                    <input
                                        checked={selectType.detail}
                                        type='checkbox'
                                        name='detail'
                                        onChange={handleSelectType}
                                    />
                                </div>
                                <div>
                                    <select
                                        id='typeTime'
                                        value={formFilter.typeTime ? formFilter.typeTime : ''}
                                        disabled={selectType.disabled2}
                                        onChange={handleSetFormFilterDate}
                                    >   <option></option>
                                        <option>15 นาที</option>
                                        <option>ชั่วโมง</option>
                                        <option>วัน</option>
                                        <option>เดือน</option>
                                    </select>
                                    <input
                                        type='date'
                                        id='date'
                                        value={formFilter.date ? formFilter.date : ''}
                                        disabled={selectType.disabled2}
                                        onChange={handleSetFormFilterDate}
                                    />
                                    <label style={{ color: 'red' }} >{formErrors.date ? formErrors.date : null}</label>


                                </div>
                                <div className={styles.head}>
                                    <label>ทดสอบประเมินราคา :</label>
                                </div>
                                <div>
                                    <label>ราคาหน่วย :</label>
                                    <input
                                        placeholder='0.00'
                                        id='price'
                                        value={formFilter.price ? formFilter.price : 0}
                                        disabled={(selectType.detail === true || selectType.sum === true) ? false : true}
                                        onChange={selectType.type === '1' ? handleSetFormFilter : selectType.type === '2' ? handleSetFormFilterDate : null}
                                    />
                                    <label>บาท</label>

                                </div>
                                <label style={{ color: 'red' }} >{formErrors.price ? formErrors.price : null}</label>

                            </div>
                            <div className={styles.button}>
                                <button
                                    className={styles.buttonStyles}
                                    onClick={() => {

                                        if ((selectType.detail === false || selectType.sum === false) && Object.keys(formErrors).length != 0 && selectType.type === '1') {
                                            setFormErrors(validate(formFilter))
                                            setShowTablePrice(false)
                                            console.log('Type 1')
                                        }
                                        else if ((selectType.detail === false || selectType.sum === false) && Object.keys(formErrors).length != 0 && selectType.type === '2') {
                                            setFormErrors(validateDate(formFilter))
                                            setShowTablePrice(false)
                                            console.log('Type 2')
                                        }
                                        else if ((selectType.detail === false || selectType.sum === false) && Object.keys(formErrors).length === 0 && (selectType.type === '1' || selectType.type === '2')) {
                                            setShowData(formFilter)
                                            setShowTablePrice(true)
                                        }
                                        else if ((selectType.detail === false && selectType.sum === false) && Object.keys(formErrors).length != 0 && selectType.type === '0') {
                                            setShowTablePrice(false)
                                            console.log('โปรเลือก Type by checkbox')
                                        }
                                        else {
                                            setShowTablePrice(false)
                                        }
                                    }}
                                >
                                    <LocalPrintshopIcon
                                        className={styles.LocalPrintshopIcon}
                                    />
                                    <div>พิมพ์รายงาน</div>
                                </button>

                            </div>

                        </div>
                    </div>
                    <div className={styles.cardSelect}>
                        {showTablePrice ? <div className={styles.cardBox}>
                            <div className={styles.header}>
                                <h3>รายการยอดรวมไฟฟ้า</h3>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.resultData}>
                                    <div>
                                        <label className={styles.frontBold}>วันที่-เวลา</label>
                                        <div>
                                            <label>{showData.fromDate ? showData.fromDate : '-'}</label>
                                            <label className={styles.value} >{showData.fromTime === '' ? null : showData.fromTime}</label>
                                        </div>

                                        <label className={styles.frontBold}>ถึงวันที่-เวลา</label>
                                        <div>
                                            <label>{showData.toDate ? showData.toDate : '-'}</label>
                                            <label className={styles.value} >{showData.toTime === '' ? null : showData.toTime}</label>
                                        </div>

                                        <label className={styles.frontBold}>อาคาร</label>
                                        <label>{showData.building}</label>

                                        <label className={styles.frontBold}>ประมาณราคาโดย ราคา/หน่วย</label>
                                        <div>
                                            <label>{showData.price}</label>
                                            <label className={styles.frontBold}>บาท</label>
                                        </div>

                                        <label className={styles.frontBold}>จำนวนห้อง</label>
                                        <label>{showData.amount_rooms}</label>

                                        <label className={styles.frontBold}>รายละเอียด</label>
                                        <div>
                                            <label>{showData.typeTime ? showData.typeTime : '-'}</label>
                                            <label className={styles.value} >{showData.date}</label>
                                        </div>


                                    </div>

                                </div>
                                <div className={styles.tableContent}>
                                    <table>
                                        <thead className={styles.header}>
                                            <tr>
                                                <td>อาคาร</td>
                                                <td>ชื่อห้อง</td>
                                                <td>รุ่นมิเตอร์</td>
                                                <td>
                                                    <label>หน่วยเริ่มต้น</label>
                                                    <br />
                                                    <label>(Kwk)</label>
                                                </td>
                                                <td><label>หน่วยสิ้นสุด</label>
                                                    <br />
                                                    <label>(Kwk)</label>
                                                </td>
                                                <td><label>ผลต่าง</label>
                                                    <br />
                                                    <label>(Kwk)</label>
                                                </td>
                                                <td><label>ราคารวม</label>
                                                    <br />
                                                    <label>(Kwk)</label>
                                                </td>
                                                <td>คิดเป็นร้อยละ</td>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.body}>
                                            {Table.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{item.room}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.model}</td>
                                                    <td>{item.startingUnit}</td>
                                                    <td>{item.terminationUnit}</td>
                                                    <td>{item.difference}</td>
                                                    <td>{item.sum}</td>
                                                    <td>{item.percent}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={styles.button}>
                                <button >
                                    <ExplicitIcon
                                        className={styles.ExplicitIcon}
                                    />
                                    <div>EXCEL</div>
                                </button>
                                <button >
                                    <PictureAsPdfIcon
                                        className={styles.PictureAsPdfIcon}
                                    />
                                    <div>PDF</div>
                                </button>

                            </div>

                        </div> : <div className={styles.cardBox}>
                            <div className={styles.header}>
                                <h3>รายการยอดรวมไฟฟ้า</h3>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.resultDataTest}>
                                    <div>
                                        <label className={styles.frontBold}>วันที่-เวลา</label>
                                        <label>-</label>

                                        <label className={styles.frontBold}>ถึงวันที่-เวลา</label>
                                        <label>-</label>

                                        <label className={styles.frontBold}>อาคาร</label>
                                        <label>-</label>

                                        <label className={styles.frontBold}>ประมาณราคาโดย ราคา/หน่วย</label>
                                        <div>
                                            <label>-</label>
                                            <label className={styles.frontBold}>บาท</label>
                                        </div>

                                        <label className={styles.frontBold}>จำนวนห้อง</label>
                                        <label>-</label>

                                        <label className={styles.frontBold}>รายละเอียด</label>
                                        <label>-</label>

                                    </div>

                                </div>
                                <div className={styles.tableContent}>
                                </div>
                            </div>
                            <div className={styles.button}>
                                <button
                                    disabled
                                >
                                    <ExplicitIcon />
                                    <div>EXCEL</div>
                                </button>
                                <button
                                    disabled
                                >
                                    <PictureAsPdfIcon />
                                    <div>PDF</div>
                                </button>

                            </div>

                        </div>}


                    </div>

                </div>


            </div>
        </>
    )
}