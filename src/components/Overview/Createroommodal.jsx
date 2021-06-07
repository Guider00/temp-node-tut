import Save from '@material-ui/icons/Save';

import styles from './Createroommodal.module.css'

export const Createroommodal =({  CloseEvent })=>{
    return (
        <div className={styles.modal}>
                <div className={styles.body}>
                    <div  className={styles.card}>
                        <div  className={styles.header} > 
                            <div className={styles.closebtn}>
                                <button onClick={CloseEvent}   >X</button>
                           </div>
                            <div className={styles.text}>
                                <label>{"Create Room"}</label>
                            </div>

                        </div>
                        <div  className={styles.body}> 
                             <div className={styles.row}>
                                <div className={styles.label}>
                                        <label>name</label>
                                    </div>
                                    <div className={styles.input}>
                                        <input type="text"></input>
                                    </div>
                                </div>
                             <div className={styles.row}>
                                <div className={styles.label}>
                                    <label>floor</label>
                                 </div>
                                 <div className={styles.input}>
                                    <input type="text"></input>
                                 </div>
                             </div>
                             <div className={styles.row}>
                                 <div className={styles.label}>
                                    <label>status</label>
                                 </div>
                                 <div className={styles.input}>
                                    <input type="text"></input>
                                 </div>
                                 
                                
                             </div>
                             <div className={styles.row}>
                                 <label>meterID</label>
                                 <input></input>
                             </div>

                        </div>
                        <div  className={styles.footer}>
                            <div className={styles.menubtn}>
                                    <button className={styles.btnsave}>
                                        <div className={styles.label}>
                                            <label>Save</label>
                                        </div>
                                        <div  className={styles.icon}>
                                            <Save/>
                                        </div>
                                    </button>
                            </div>
                            <div className={styles.menubtn} >
                                    <button className={styles.btnclose} onClick={CloseEvent}>
                                        <div className={styles.label} >
                                            <label>close</label>
                                        </div>
                                        <div className={styles.icon}>
                                            <label>X</label>
                                        </div>
                                    </button>
                            </div>
                  
                        </div>
                    </div>
                    
                </div>
        </div>
    )
}

export default Createroommodal