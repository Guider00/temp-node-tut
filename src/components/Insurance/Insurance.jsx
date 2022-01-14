import React from "react";
import styles from './Insurance.module.css';
import { useEffect,useState } from "react";

export const  Insurance = () => {
    
    const [formFilter ,setFormfilter] = useState({
        id: null,
        option_search:'ทั้งหมด',
        text:'',
        
    })

    const [defaultformFilter ,setdefaultformFilter] = useState({
        id: null,
        option_search:'ทั้งหมด',
        text:'',
        
    })

    const handleChangeformFilterTodefault = () =>{

        setFormfilter(defaultformFilter)
        console.log('set-defaultFormFilter',defaultformFilter)
    }


    const handleChangedformFilter = (e) => {
        let _formFilter = formFilter
        
        if(e.target.id === 'text'){
            let text = /[^0-9a-zA-Zก-๙]/ig;
            e.target.value = e.target.value.replace(text,'')
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({..._formFilter})
            console.log('_formFilter',_formFilter)

        }else if(e.target.id === 'option_search'){
            _formFilter[e.target.id] = e.target.value;
            setFormfilter({..._formFilter})
            console.log('_formFilter',_formFilter)
        }
    }
    




    let head_table = ["อาคาร" ,"ชื่อห้อง" ,"เลขที่สัญญา" ,"เลขที่ใบแจ้งหนี้" ,"ชื่อผู้เช่า" ,"นามสกุล" ,"คืนเงิน" ,"สถานะ","วันที่คืน"]
    let body_table = [{"อาคาร":"A1","ชื่อห้อง":"112","เลขที่สัญญา":"F111111112","เลขที่ใบแจ้งหนี้":"H111111","ชื่อผู้เช่า":"ใจดี","นามสกุล":"มากมาย","คืนเงิน":"10000","สถานะ":"เช่า","วันที่คืน":"12/12/2550"}]
    return(
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h2 className={styles.headertext}>รายการคืนเงินประกัน</h2>
                    <input id = 'text' className={styles.headerselect} onChange={handleChangedformFilter}/>   
                    <select id = 'option_search'className={styles.headerfilter} onChange={handleChangedformFilter}>
                        <option>ทั้งหมด</option>
                        <option>อาคาร</option>
                        <option>ชื่อห้อง</option>
                        <option>ชื่อผู้เช่า</option>
                    </select>
                    <button className={styles.headerall}>กรอง</button>  
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
                                
                                <tbody className={styles.tbody}> {body_table.map( (data2) =>
                                        <tr>
                                            <td>    
                                                <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"
                                                onChange={(e)=>{
                                                    const check = e.target.checked
                                                    if(check){
                                                        console.log('check')
                                                    }else{
                                                        console.log('Uncheck')
                                                    }
                                                }}></input>
                                            </td>
                                            <td>{data2["อาคาร"]}</td>
                                            <td>{data2["ชื่อห้อง"]}</td>
                                            <td>{data2["เลขที่สัญญา"]}</td>
                                            <td>{data2["เลขที่ใบแจ้งหนี้"]}</td>
                                            <td>{data2["ชื่อผู้เช่า"]}</td>
                                            <td>{data2["นามสกุล"]}</td>
                                            <td>{data2["คืนเงิน"]}</td>
                                            <td>{data2["สถานะ"]}</td>
                                            <td>{data2["วันที่คืน"]}</td>
                                            
                                        
                                            
                                        </tr>
                                        )
                                        }
                                    
                                </tbody>
                        
                        
                    </table>
                   

                </div>
                <button className={styles.button}>คืนเงินประกันภัย</button>  
                
                          
                
                
                <div className={styles.footer}>
                    <h3 className={styles.footertext}>
                        <lable className={styles.highlight}> คืนเงินประกัน </lable>
                        : คือขั้นตอนการอัพเดตสถานะของห้องเช่าที่มีประกันห้องไว้ ขั้นตอนนี้ต้องทำหลังจากมีการย้ายออกและทำการชำระเงิน
                        และผู้ให้เช่าได้ทำการคืนเงินประกันเรียบร้อยแล้ว
                    </h3>

                </div>
                
            </div>
            
        </div>
    )
}
