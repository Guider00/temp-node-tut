
import styles from "./Floormodal.module.css"
import Save from '@material-ui/icons/Save';

import { useEffect, useState } from "react"


export const Floormodal = ({ Data, onSave, onClose, onchange, Action, Inputs , Mobalname }) => {


    const close = onClose ? onClose : () => { console.log('close') }
    const save = onSave ? onSave : (id, data,action) => { console.log(`${action} save`, id, data) }


  

    return (
        <div className={styles.modal}>
            <div className={styles.body}>
                <div className={styles.card}>
                    <div className={styles.header} >
                        <div className={styles.closebtn}>
                            <button onClick={() => { close() }}  >X</button>
                        </div>
                        <div className={styles.text}>
                            <label>{`${Action} ${Mobalname?Mobalname:""}`}</label>
                        </div>

                    </div>

                    {
                        Inputs ? <>
                            {
                                Inputs.map( (e,index) => <>
                                    <div key={`Flooor_Inputs_map${index}`} className={styles.body}>
                                        <div className={styles.row}>
                                            <div className={styles.label}>
                                                <label>{e.label}</label>
                                            </div>
                                            {e.form.displayform === "textbox" ?
                                                <div className={styles.input}>
                                                    <input type={e.form.type ? e.form.type:"text"} value={e.form.value} onChange={(event) => { onchange(event.target.value ,index) }} />
                                                </div> : null
                                            }
                                            {e.form.displayform === "select" ?
                                                <div className={styles.input}>
                                                    <select value={e.form.value} onChange={event => onchange(event.target.value , index)} >
                                                        {
                                                          e.form.options.map( (opt,index) =>
                                                            <option value={opt.value} >
                                                                {opt.label}
                                                            </option>
                                                          )
                                                        }
                                                    </select>
                                                </div> : null
                                            }

                                        </div>
                                    </div>
                                </>
                                )
                            }
                        </> : null
                    }


                    <div className={styles.footer}>
                        <div className={styles.menubtn}>
                            <button className={styles.btnsave} onClick={() => { save(Data.id,  Inputs , Action) }}>
                                <div className={styles.label}>
                                    <label>Save</label>
                                </div>
                                <div className={styles.icon}>
                                    <Save />
                                </div>
                            </button>
                        </div>
                        <div className={styles.menubtn} >
                            <button className={styles.btnclose} onClick={() => { close() }} >
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

