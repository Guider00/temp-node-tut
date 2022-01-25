import React, { useEffect } from 'react';
import styles from './Calendar.module.css'
import { Calendar } from "react-modern-calendar-datepicker";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { useState } from 'react';
function CalendarPicker({onCalendar,start}) {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });

      const disabledDays = [
        {
          year: 2022,
          month: 1,
          day: 21,
        }
      ];
      useEffect(
		() => {

            if(selectedDayRange.to){
                let confirm = document.getElementById('save')
                confirm.disabled=false;
                start(selectedDayRange)

            }else{
                let confirm = document.getElementById('save')
                confirm.disabled=true;

            }
            
            
            
            console.log('selectedDayRange',selectedDayRange)

            
           
		},
		[selectedDayRange]
	);
  return <div className={styles.container}>
            <div className={styles.mainCalendar}>
                <div className={styles.titleClose}>
                    <button className={styles.close}
                     onClick={
                        ()=>onCalendar(false)
                        }>X</button>
                </div>
                <h2>โปรดเลือก วันที่เข้าพัก - วันที่ย้ายออก</h2>
                <div className={styles.Calendar}>

                    <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    shouldHighlightWeekends
                    minimumDate={selectedDayRange.from}
                    maximumDate={selectedDayRange.to}
                    />
                    
                </div>
                <div className={styles.footer}>
                    <button  id = 'save' className={styles.confirm}
                    onClick={
                        ()=>onCalendar(true)
                        }>confirm</button>
                    <button className={styles.cancel}

                     onClick={
                        ()=>onCalendar(false)
                    }>cancel</button>
                </div>
            

            </div>

        </div>;
}

export default CalendarPicker;
