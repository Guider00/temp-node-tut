
import React  from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import styles from './Notifications.module.css'



export const Notifications = (   {number} ) =>{

    return (
        <div className={styles.body} onClick={()=>{
           window.location.pathname  = '/booking'
        }}>
           
             < NotificationsIcon className={styles.icon}/> 
             <div   className={styles.number} > {number > 99 ? "+99":number } </div>
           
        </div>

    )
}

