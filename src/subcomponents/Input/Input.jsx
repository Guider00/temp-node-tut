import styles from './Input.module.css'
import theme from '../../theme/themes.module.css'
import { useEffect, useRef } from 'react'

export const Input =({label,type,key,onChange,defaultValue,value}) =>{
   
    let _label =  useRef(label?label:"label")
    useEffect(()=>{
        
    },[])
    return(
        <div className={styles.input}>
            <div className={styles.divlabel}>
                <label>{label}</label>
            </div>
            <div className={styles.divinput} >
                <input type="text" value={value} defaultValue={defaultValue?defaultValue:""} onChange={onChange?onChange:()=>{}} ></input>
            </div>

        </div>
    )
}

export default Input