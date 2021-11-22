
import { useEffect, useState } from "react"
import styles from './TableRoomMember.module.css';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

import { formatDate } from '../../../general_functions/convert'
// import { Modalupload } from '../Modalupload/Modalupload'

export const TableRoomMember =(props)=>{
    const [loading,setloading] = useState(false)
    const [showmodal,setmodal] = useState(false)
    const [modalbooking,setmodalbooking] = useState(null)
   
    useEffect(()=>{
        async function fetchdata() {
            
            setloading(true)
        }
         fetchdata()
    },[loading])
    const handleSaveimage = ( booking,file) =>{

        if(props && props.handleSaveimage){
            props.handleSaveimage(booking,file)
        }
    }
    console.log('TableRoomMember',props.data)

    return  ( loading ?
    <div>
        <div className={styles.tablebooking}>
            <table >
                <tr>
                 
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>บัตรประชาชน</th>
                    <th>เบอร์ติดต่อ</th>
                    <th></th>
                </tr>
                { props &&  props.data &&  props.data.members ?
                    <> { props.data.members.map( member => 
                    <tr>
                            <td>{ member && member.name  ? member.name  : "---" }</td>
                            <td>{ member && member.lastname ?  member.lastname  :'---'}</td>
                            <td>{ member && member.personalid ?  member.personalid :'---'}</td>
                            <td>{ member && member.tel  ?  member.tel  :"---"}</td>
                           

                            <td>
                                <button onClick={ props.handlerdelete ?()=>props.handlerdelete(member) : ()=>{console.log('delete',member) }   }> <DeleteIcon/> </button>
                                <button onClick={ props.handleredit ?()=>props.handleredit(member) :()=>{console.log('edit',member)}  } > <EditIcon/> </button>
                            </td>

                            
                    </tr>)
                    }</> : 
                     <tr> 
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            <td>{"---"}</td>
                            
                            <td>
                                <button><DeleteIcon/></button>
                                <button><EditIcon/> </button>
                        
                            </td>

                    </tr>
                }
            </table>
        </div>
    </div> : null
    )
}