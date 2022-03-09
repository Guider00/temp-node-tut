
import React from "react";

import styles from './ModalSelectMember.module.css';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import { API_GET_Members } from '../../../API/Schema/Member/Member'
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';



export const ModalSelectMember = ({ handleronselectmember, handlerclose }) => {
    const [Members, setMembers] = useState([])
    const [memberselected, setmemberselected] = useState(null)
    const GET_Members = useQuery(API_GET_Members);
    useEffect(() => {
        if (GET_Members.data) {

            console.log('Members', GET_Members.data.Members);
            setMembers(GET_Members.data.Members)

        }
    }, [GET_Members.data])
    console.log('Members', Members)
    return (

        <div className={styles.bgmodal}>
            <div className={styles.content} >
                <div className={styles.close}>
                    <CloseIcon onClick={handlerclose ? handlerclose : () => { }} />
                </div>
                <div className={styles.card}>
                    <div className={styles.header}>
                        Select Member
                    </div>
                    <div className={styles.textmessage}>
                        <div className={styles.tableselectmember} >
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ชื่อ</th>
                                        <th>นามสกุล</th>
                                        <th>บัตรประชาชน</th>
                                        <th>เบอร์ติดต่อ</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Members.length > 0 ?
                                        Members.map((member, index) =>
                                            <tr
                                                key={index}
                                                onClick={() => {
                                                    setmemberselected(member)
                                                }}
                                                style={{ backgroundColor: (memberselected && memberselected.id === member.id) ? 'lightgray' : 'white' }}
                                            >
                                                <td> {index}</td>
                                                <td> {member.name} </td>
                                                <td> {member.lastname} </td>
                                                <td> {member.personalid} </td>
                                                <td> {member.tel} </td>
                                            </tr>

                                        )


                                        : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <hr />
                    </div>

                    <div className={styles.card_menu}>
                        <button onClick={handleronselectmember ? () => handleronselectmember(memberselected) :
                            () => { console.log('memberselected', memberselected) }} >
                            Select <CheckIcon /></button>
                        <button onClick={handlerclose ? handlerclose : () => { }} > Cancel   <CancelIcon /></button>
                    </div>

                </div>


            </div>
        </div>
    )
}
