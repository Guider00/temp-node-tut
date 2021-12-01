
import styles from './Invoice.module.css';
import { useEffect, useState } from 'react';
export const Invoice = () => {
     //** calculate function  */
    const Inputdatenow = ()=>{
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        let today = year + "-" + month + "-" + day;
        return today
    }
    const lengthdate = (Inputdate1 , Inputdate2) =>{
        const start_date =  new Date(Inputdate1) 
        const end_date =  new Date(Inputdate2) 
        const diffTime = Math.abs(start_date.getTime() - end_date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
    }
    /** ---------------  */

    const [ formsearch, setformsearch  ] = useState({
         startdate :Inputdatenow(),
         enddate:Inputdatenow(),
         lenghthdispaly:"",
         duedate:""

    })

    const handleChangeformsearch =(e) =>{
        let _formsearch = formsearch
		if (e.target.id && _formsearch.hasOwnProperty(e.target.id) ) {
			_formsearch[e.target.id] = e.target.value;  //<< set value by ID 
            if(e.target.id === 'startdate' )
            {
                _formsearch.lenghthdispaly  = lengthdate (e.target.value,_formsearch.enddate)
            }else if( e.target.id === 'enddate' ){
                 _formsearch.lenghthdispaly  = lengthdate (_formsearch.startdate,e.target.value)
            }
           
			setformsearch({ ..._formsearch });
		}
    }
    return (
        <>
           
            <div className={styles.zone1}>
                <div className={styles.bigbox}>
                    <div className={styles.formtableInvoice} >
                       <div className={styles.card}>
                            <div className={styles.cardheader}>
                                <label> ตรางใบเสร็จ</label>
                            </div>
                             <div className={styles.cardbody}>
                                <div className={styles.row} >
                                    <label> วันที่ </label>
                                     <input id="startdate" type="date" value={formsearch.startdate} onChange={handleChangeformsearch}></input>

                                    <label> ถึง </label>
                                     <input  id="enddate" type="date"  value={formsearch.enddate} onChange={handleChangeformsearch} ></input>
                                    <label> แสดงผล </label>
                                     <input id="lenghthdispaly" value={formsearch.lenghthdispaly} onChange={handleChangeformsearch} ></input>
                                </div>
                                <div>
                                     <label> รอบบิล </label>
                                     <input  id="duedate" type="date"  value={formsearch.duedate} onChange={handleChangeformsearch} ></input>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bigbox} >
                    <div className={styles.formdetailsInvoice}>
                         <div className={styles.card}>
                            <div className={styles.cardheader}>
                                <label> ข้อมูลใบเสร็จ</label>
                            </div>
                            <div className={styles.cardbody}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}