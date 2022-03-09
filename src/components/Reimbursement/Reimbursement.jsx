import React from "react";
import styles from './Reimbursement.module.css';
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { API_GET_Reimbursement,API_DELETE_Reimbursement, API_UPDATE_Reimbursement } from '../../API/Schema/Reimbursement/Reimbursement'
import { export_Reimbursement_pdf } from '../../general_functions/pdf/export/export_pdf';
import { toYYMMDD } from '../../general_functions/convert';
// import { Rooms_to_table, filter_rooms } from "./function";

//address
import { AddressData } from "../../subcomponents/AddressData/AddressData";



//confirmDialog
import Dialog from '../../subcomponents/ConfirmAlert/ConfirmAlert';

export const Reimbursement = () => {

    //address
    const { defaultData } = AddressData();

    const getReimbursement = useQuery(API_GET_Reimbursement)

    // const [rooms, setrooms] = useState([]);
    // const [FilterRooms, setFilterRooms] = useState([]);
    const [Reimbursements, setReimbursements] = useState([]);
    const [FilterReimbursements, setFilterReimbursements] = useState([]);
    const [selectedReimbursements, setselectedReimbursements] = useState([]);

    // const [IDrooms, setIDrooms] = useState([]);
    const [deleteReimbursement] = useMutation(API_DELETE_Reimbursement)
    const [updateReimbursement] = useMutation(API_UPDATE_Reimbursement)

    const [formFilter, setFormfilter] = useState({
        id: null,
        option_search: 'ทั้งหมด',
        text: '',

    })

    const [defaultformFilter] = useState({
        id: null,
        option_search: 'ทั้งหมด',
        text: '',

    })

    const handleChangeformFilterTodefault = () => {

        setFormfilter(defaultformFilter)

    }


    const handleChangedformFilter = (e) => {
        let _formFilter = formFilter

        if (e.target.id === 'text') {
            let text = /[^0-9_-a-zA-Zก-๙/]/ig;
            e.target.value = e.target.value.replace(text, '')
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({ ..._formFilter })
            console.log('_formFilter', _formFilter)

        } else if (e.target.id === 'option_search') {
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({ ..._formFilter })
            console.log('_formFilter', _formFilter)
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

            Promise.all(selectedReimbursements).then((selectedReimbursements) => {
                selectedReimbursements.map(async (Reimbursement) => {

                    let _res = await deleteReimbursement({
                        variables: {
                            id: `${Reimbursement.id}`
                        }
                    })

                    if (_res && _res.data) {
                        getReimbursement.refetch();

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






    useEffect(() => {

        if (getReimbursement && getReimbursement.data && getReimbursement.data.Reimbursements) {


            let _Reimbursements = [...getReimbursement.data.Reimbursements]
            setReimbursements(_Reimbursements)
            if (formFilter.option_search === 'อาคาร') {
                _Reimbursements = _Reimbursements.map(Reimbursement => {
                    if (Reimbursement.Contract.Room.floor.building.name.search(formFilter.text) !== -1) {
                        return Reimbursement
                    }
                    return null;
                })

            }
            else if (formFilter.option_search === 'ชื่อห้อง') {
                _Reimbursements = _Reimbursements.map(Reimbursement => {
                    if (Reimbursement.Contract.Room.name.search(formFilter.text) !== -1) {
                        return Reimbursement
                    }
                    return null;
                })
            }
            else if (formFilter.option_search === 'วันที่คืน') {
                _Reimbursements = _Reimbursements.map(Reimbursement => {
                    if (
                        toYYMMDD(Reimbursement.cashback_date).search(formFilter.text) !== -1
                    ) {
                        return Reimbursement
                    }
                    return null;
                })
            }
            console.log(_Reimbursements)
            setFilterReimbursements(_Reimbursements)
        }

    }, [getReimbursement, getReimbursement.data, formFilter])




    let head_table = ["อาคาร", "ชื่อห้อง", "เลขที่สัญญา", "เลขที่ใบแจ้งหนี้", "ชื่อผู้เช่า", "นามสกุล", "คืนเงิน", "สถานะ", "วันที่คืน"]
    // let body_table = [{ "อาคาร": "A1", "ชื่อห้อง": "112", "เลขที่สัญญา": "F111111112", "เลขที่ใบแจ้งหนี้": "H111111", "ชื่อผู้เช่า": "ใจดี", "นามสกุล": "มากมาย", "คืนเงิน": "10000", "สถานะ": "เช่า", "วันที่คืน": "12/12/2550" }]
    return (
        <div className={styles.container}>
            {Confirm.isLoading && <Dialog onDialog={checkstate} message={Confirm.message} />}
            <div className={styles.main}>
                <div className={styles.header}>
                    <h2 className={styles.headertext}>รายการคืนเงินประกัน</h2>
                    <input id='text' className={styles.headerselect} onChange={handleChangedformFilter} />
                    <select id='option_search' className={styles.headerfilter} onChange={handleChangedformFilter}>
                        <option>ทั้งหมด</option>
                        <option>อาคาร</option>
                        <option>ชื่อห้อง</option>
                        <option>วันที่คืน</option>
                    </select>
                    <button className={styles.headerall}
                        onClick={() => {
                            getReimbursement.refetch();
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
                        <tbody className={styles.tbody}>{FilterReimbursements.map(
                            (reimbursements) => reimbursements && reimbursements.Contract && reimbursements.Contract.Room ? (
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="myCheckboxName"
                                            id="myCheckboxId"
                                            onChange={(e) => {
                                                const check = e.target.checked
                                                let id = reimbursements.id
                                                if (check) {
                                                    let _selectedReimbursements = selectedReimbursements
                                                    _selectedReimbursements = [..._selectedReimbursements, reimbursements]
                                                    setselectedReimbursements(_selectedReimbursements)


                                                } else {
                                                    let _selectedReimbursements = selectedReimbursements.filter(Reimbursement => Reimbursements.id !== id)
                                                    setselectedReimbursements(_selectedReimbursements)

                                                }
                                            }}></input></td>
                                    <td>{reimbursements.Contract.Room.floor.building.name ? reimbursements.Contract.Room.floor.building.name : '---'}</td>
                                    <td>{reimbursements.Contract.Room.name ? reimbursements.Contract.Room.name : '---'}</td>
                                    <td>{reimbursements.Contract.id ? reimbursements.Contract.id : '---'}</td>
                                    <td>{reimbursements.Invoice && reimbursements.Invoice.id ? reimbursements.Invoice.id : '---'}</td>
                                    <td>{reimbursements.Contract.Room.members[0].name ? reimbursements.Contract.Room.members[0].name : '---'}</td>
                                    <td>{reimbursements.Contract.Room.members[0].lastname ? reimbursements.Contract.Room.members[0].lastname : '---'}</td>
                                    <td>{reimbursements.cashback ? reimbursements.cashback : '0'}</td>
                                    <td>{reimbursements.status ? reimbursements.status : '---'}</td>
                                    <td>{reimbursements.cashback_date ? toYYMMDD(reimbursements.cashback_date) : '---'}</td>
                                </tr>
                            ) : null
                        )}</tbody>


                    </table>


                </div>
                <div className={styles.buttonzone}>
                    <button className={styles.button}
                        onClick={() => {
                            if (selectedReimbursements.length > 0) {
                                Promise.all(selectedReimbursements).then((selectedReimbursements) => {
                                    selectedReimbursements.map(async (Reimbursement) => {
                                        let _Reimbursement = JSON.parse(JSON.stringify(Reimbursement))
                                        _Reimbursement.status = "สำเร็จ"
                                        try {
                                            let res = await updateReimbursement({
                                                variables: {
                                                    id: `${_Reimbursement.id}`,
                                                    input: {
                                                        status: "สำเร็จ"
                                                    }

                                                }
                                            })
                                            if (res && res.data) {
                                                getReimbursement.refetch()
                                            } else {

                                            }
                                        } catch (e) {
                                            console.error('เปลี่ยนสถานะคืนเงินไม่สำเร็จ');
                                        }

                                    })
                                })
                            } else {
                                console.log("empty select")
                            }


                        }}
                    >คืนเงินประกันภัย</button>

                    <button className={styles.button}
                        onClick={() => {
                            if (selectedReimbursements.length > 0) {
                                export_Reimbursement_pdf(selectedReimbursements, 'IDrooms', '', defaultData)

                            } else {
                                console.log("empty select")
                            }


                        }}
                    >Export pdf</button>


                    <button className={styles.buttonDelete}
                        onClick={() => {
                            if(selectedReimbursements.length > 0){
                                console.log(selectedReimbursements)
                                handleConfirm('Are you sure to Delete?', true)

                            }else{
                                console.log('No select data')
                            }

                            
                        }}
                    >ลบที่เลือก</button>
                </div>

                <div className={styles.footer}>
                    <h3 className={styles.footertext}>
                        <label className={styles.highlight}> คืนเงินประกัน </label>
                        : คือขั้นตอนการอัพเดตสถานะของห้องเช่าที่มีประกันห้องไว้ ขั้นตอนนี้ต้องทำหลังจากมีการย้ายออกและทำการชำระเงิน
                        และผู้ให้เช่าได้ทำการคืนเงินประกันเรียบร้อยแล้ว
                    </h3>

                </div>

            </div>

        </div>
    )
}
