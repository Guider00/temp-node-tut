import { useState } from 'react'
import styles from './Submenudropdown.module.css'
import Icon from '@material-ui/core/Icon'

 /**
  * 
  * @param {*} links  is array  object  [{label  , icon  , herf} ]
  * @returns 
  */
export const Submenudropdown = ({label,links}) => {
   
    const [showdropdown, setshowdropdowm] = useState('none')
 
    window.addEventListener('click', function(e){   
        if (document.getElementById('submenudropdown') && document.getElementById('submenudropdown').contains(e.target)){
          // Clicked in box
        } else{
            setshowdropdowm('none')
          // Clicked outside the box
        }
      });
    return (
    <>
        <div id="submenudropdown"  className={styles.dropdown}>
            <button onClick={() => { setshowdropdowm(showdropdown === 'block' ? 'none' : 'block') }} 
            className={styles.dropbtn}> 
             <div> <Icon>settings</Icon> <label> {label}  </label>   <Icon>{showdropdown === 'none'?'arrow_drop_down':'arrow_drop_up' } </Icon> </div>
             </button>
          
            <div   style={{ display: showdropdown }} className={styles.dropdown_content} >
                {
                   links?  links.map(( link ,index ) => 
                        (
                            <div key={index} onClick={() => {
                                setshowdropdowm('none')
                                window.location.href = link.href ?  link.href :'#'
                            }}>  
                            <Icon>{link.icon}</Icon>
                            { link.label ?link.label : '---' } 
                            </div>
                        )
                    ): null
                }


            </div>
        </div>
    </>
    )
}