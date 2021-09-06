
import styles from "./Floormodal.module.css"
import Save from '@material-ui/icons/Save';


export const Floormodal = ({ Data, onSave, onClose, onchange, Action, Inputs, Mobalname }) => {


    const close = onClose ? onClose : () => { console.log('close') }
    const save = onSave ? onSave : (id, data, action) => { console.log(`${action} save`, id, data) }

    




    return (
        <div className={styles.modal}>
            <div className={styles.body}>
                <div className={styles.card}>
                    <div className={styles.header} >
                        <div className={styles.closebtn}>
                            <button onClick={() => { close() }}  >X</button>
                        </div>
                        <div className={styles.text}>
                            <label>{`${Action} ${Mobalname ? Mobalname : ""}`}</label>
                        </div>

                    </div>

                    {
                        Inputs ? <>
                            {
                                Inputs.map((e, index) => <>
                                    <div key={`Flooor_Inputs_map${index}`} className={styles.body}>
                                            
                                        <div className={styles.row}>
                                            { e.label  &&  (e.form.displayform === "textbox"  ||  e.form.displayform === "datalist" || e.form.displayform === "select")  ?
                                                <div className={styles.label}>
                                                    <label>{e.label}</label>
                                                </div> : null
                                            }

                                            { e.label  &&  (e.form.displayform === "textarea" )  ?
                                                <div className={styles.labelfullrow}>
                                                    <label>{e.label}</label>
                                                </div> : null
                                            }


                                            {e.form.displayform === "textbox" ?
                                                <div className={styles.input}>
                                               
                                                    <input type={e.form.type ? e.form.type : "text"}
                                                     value={  
                                                         e.form.value
                                                    }
                                                    style={{border: (e.form.validate ?   
                                                        e.form.validate(e.form.value) ||   // validate pass or disable  not red border

                                                        ((e.form.disablecondition === undefined ||
                                                            e.form.fn_compare === undefined)
                                                            ? false : e.form.disablecondition(
                                                                (e.form.compaer_property) ? Inputs.find(x => x.property === e.form.compaer_property).form.value : null
                                                                , e.form.fn_compare))
                                                   
                                                        
                                                        ?"":" 1px solid #FF0000" : "")   }}
                                                   
                                                        disabled=
                                                        {
                                                            ((e.form.disablecondition === undefined ||
                                                                e.form.fn_compare === undefined)
                                                                ? false : e.form.disablecondition(
                                                                    (e.form.compaer_property) ? Inputs.find(x => x.property === e.form.compaer_property).form.value : null
                                                                    , e.form.fn_compare))
                                                        }
                                                        onChange={(event) => { onchange(event.target.value, index) }
                                                        } />

                                                </div> : null
                                            }
                                            {e.form.displayform === "select" ?
                                                <div className={styles.input}>
                                                    <select value={e.form.value}
                                                        disabled=
                                                        {
                                                            ((e.form.disablecondition === undefined ||
                                                                e.form.fn_compare === undefined)
                                                                ? false : e.form.disablecondition(
                                                                    (e.form.compaer_property) ? Inputs.find(x => x.property === e.form.compaer_property).form.value : null
                                                                    , e.form.fn_compare))
                                                        }
                                                        onChange={event =>  {console.log('event.target.value',event.target.value,e.form.options) ; onchange(event.target.value, index) } } >
                                                        {
                                                            e.form.options.map((opt, index) =>
                                                                <option value={opt.value} >
                                                                    {opt.label}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div> : null
                                            }
                                            {e.form.displayform === "datalist" ?
                                                <div className={styles.input}>
                                                    <input type="text"  value={ e.form.options.find(opt => opt.value === e.form.value)  ? e.form.options.find(opt => opt.value === e.form.value).label : e.form.value } 
                                                     list={`datalist_${index}` }
                                                     disabled=
                                                     {
                                                         ((e.form.disablecondition === undefined ||
                                                             e.form.fn_compare === undefined)
                                                             ? false : e.form.disablecondition(
                                                                 (e.form.compaer_property) ? Inputs.find(x => x.property === e.form.compaer_property).form.value : null
                                                                 , e.form.fn_compare))
                                                     }
                                                     onChange={event =>  {console.log('event.target.value',
                                                     e.form.options.find( opt => opt.label === event.target.value ) ? 
                                                     e.form.options.find( opt => opt.label === event.target.value ).value :
                                                     event.target.value,
                                                    //  event.target.value

                                                     e.form.options) ; onchange(  
                                                         e.form.options.find( opt => opt.label === event.target.value ) ? 
                                                         e.form.options.find( opt => opt.label === event.target.value ).value   :
                                                         event.target.value , index) } } />
                                                     <datalist id={`datalist_${index}`}>
                                                    {       
                                                            e.form.options.map((opt, key) =>
                                                                <option  value ={opt.label} >
                                                                    
                                                                </option>
                                                            )
                                                    }
                                                    </datalist> 
                                                </div> : null
                                            }
                                            {e.form.displayform === "textarea" ? 
                                                <div className={styles.inputfullrow}>
                                                    <textarea 
                                                    value={e.form.value}
                                                    onChange={event =>  {console.log('event.target.value',e.form.options) ; onchange(event.target.value, index) } }
                                                    >
                                                    </textarea>
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
                            <button className={styles.btnsave} onClick={() => { save(Data.id, Inputs, Action) }}>
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

