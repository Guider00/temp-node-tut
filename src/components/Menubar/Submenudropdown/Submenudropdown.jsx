import { useEffect, useRef, useState } from 'react'
import styles from './Submenudropdown.module.css'
import Icon from '@material-ui/core/Icon'

 /**
  * 
  * @param {*} links  is array  object  [{label  , icon  , herf} ]
  * @returns 
  */
export const Submenudropdown = ({label,links}) => {
   
    const [showdropdown, setshowdropdowm] = useState('none')
 

    return (
    <>
        <div  className={styles.dropdown}>
            <button onClick={() => { setshowdropdowm(showdropdown === 'block' ? 'none' : 'block') }} 
            className={styles.dropbtn}> 
             <div> <Icon>settings</Icon> <label> {label}  </label>  <Icon>arrow_drop_down</Icon></div>
             </button>
          
            <div   style={{ display: showdropdown }} className={styles.dropdown_content} >
                {
                   links?  links.map(( link ,index ) => 
                    <>
                        <div onClick={() => {
                            setshowdropdowm('none')
                            window.location.href = link.href ?  link.href :'#'
                        }}>  
                          <Icon>{link.icon}</Icon>
                        { link.label ?link.label : '---' } 
                      
                        </div>
                    </>): null
                }


            </div>
        </div>
    </>
    )
}