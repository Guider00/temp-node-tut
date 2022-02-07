import React, { useEffect } from 'react';
import styles from './Calendar.module.css'
import { Calendar } from "react-modern-calendar-datepicker";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { useState } from 'react';
function CalendarPicker({onCalendar,start, selectedStartDate , selectedEndDate }) {

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
      useEffect(()=>{
           console.log( 'debug ',selectedStartDate , selectedEndDate)
        let _selectedDayRange =  JSON.parse( JSON.stringify(selectedDayRange ) ) 
        if( selectedStartDate === null ||  selectedEndDate === null  || selectedStartDate === ''  || selectedEndDate === ''){
           
        }else{
            _selectedDayRange ={
                from:{ 
                        day: selectedStartDate.getDate(),
                        month: selectedStartDate.getMonth()+1,
                        year: selectedStartDate.getFullYear()
                },
                to:{
                        day: selectedEndDate.getDate(),
                        month: selectedEndDate.getMonth()+1,
                        year: selectedEndDate.getFullYear()
                }
            }
        }

        setSelectedDayRange(_selectedDayRange)
      },[selectedStartDate , selectedEndDate ])
    //   useEffect(
	// 	() => {

    //         if(selectedDayRange.to){
    //             let confirm = document.getElementById('save')
    //             confirm.disabled=false;
    //             start(selectedDayRange)

    //         }else{
    //             let confirm = document.getElementById('save')
    //             confirm.disabled=true;

    //         }
            
            
            
    //         console.log('selectedDayRange',selectedDayRange)

            
           
	// 	},
	// 	[selectedDayRange]
	// );
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
                   <button className={styles.clear}
                     onClick={
                        ()=>{
                            setSelectedDayRange({
                                from: null,
                                to: null
                            })
                            onCalendar({
                                from: null,
                                to: null
                            })
                        }
                    }>clear</button>
                    <button  id = 'save' className={styles.confirm}
                    onClick={
                        ()=>{
                         onCalendar(selectedDayRange)
                        }
                        }>confirm</button>
                    <button className={styles.cancel}

                     onClick={
                        ()=>onCalendar(null)
                    }>cancel</button>
         
                </div>
            

            </div>

        </div>;
}

export default CalendarPicker;
