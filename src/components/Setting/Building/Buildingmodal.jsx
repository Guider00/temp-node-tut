
import styles from "./Buildingmodal.module.css"
import Save from '@material-ui/icons/Save';

import { useEffect,  useState } from "react"


export const Buildingmodal =({  Data , onSave ,  onClose ,Action})=>{

    const [_name,setname] = useState( (Data && Data.name)? Data.name.toString() :""  )

    const close = onClose ? onClose: ()=>{console.log('close')}
    const save = onSave ? onSave: (id,data)=>{console.log('save',id,data)}


    useEffect(()=>{
        setname( (Data && Data.name)? Data.name.toString() :"" )
    },[Data])


    return(
    <div className={styles.modal}>
        <div className={styles.body}>
            <div  className={styles.card}>
                <div  className={styles.header} > 
                    <div className={styles.closebtn}>
                        <button onClick={()=>{close()} }  >X</button>
                   </div>
                    <div className={styles.text}>
                        <label>{`${Action} Building`}</label>
                    </div>

                </div>
                <div  className={styles.body}> 
                     <div className={styles.row}>
                        <div className={styles.label}>
                                <label>name</label>
                            </div>
                            <div className={styles.input}>
                                <input type="text"  value={_name} onChange={(e)=>{setname(e.target.value)}  }/>
                            </div>
                        </div>
                </div>
                <div  className={styles.footer}>
                    <div className={styles.menubtn}>
                            <button className={styles.btnsave} onClick={ ()=> {save(Data.id,{name:_name},Action )} }>
                                <div className={styles.label}>
                                    <label>Save</label>
                                </div>
                                <div  className={styles.icon}>
                                    <Save/>
                                </div>
                            </button>
                    </div>
                    <div className={styles.menubtn} >
                            <button className={styles.btnclose} onClick={()=>{close()} } >
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

