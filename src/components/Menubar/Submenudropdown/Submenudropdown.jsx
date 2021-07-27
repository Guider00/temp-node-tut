import { useState } from 'react'
import styles from './Submenudropdown.module.css'
import Icon from '@material-ui/core/Icon'

 /**
  * 
  * @param {*} links  is array  object  [{label  , icon  , herf} ]
  * @returns 
  */
export const Submenudropdown = ({icon , label,links ,id}) => {
   
    const [showdropdown, setshowdropdowm] = useState('none')
 
    // window.addEventListener('click', function(e){   
    //     if (document.getElementById(id) && document.getElementById(id).contains(e.target)){
    //       // Clicked in box
    //     } else{
    //         console.log(' click outside box')
    //       //  setshowdropdowm('none')
    //       // Clicked outside the box
    //     }
    //   });
    return (
    <>
        <div id={id}  className={styles.dropdown}       onBlur={()=> {setTimeout(() => { setshowdropdowm('none')}, 150) } }  >
            <button onClick={() => { setshowdropdowm(showdropdown === 'block' ? 'none' : 'block') }}
      
            className={styles.dropbtn}> 
             <div> <Icon>{icon}</Icon> <label> {label}  </label>   <Icon>{showdropdown === 'none'?'arrow_drop_down':'arrow_drop_up' } </Icon> </div>
             </button>
          
            <div   style={{ display: showdropdown }} className={styles.dropdown_content} >
                {
                   links?  links.map(( link ,index ) => 
                        (
                            <div key={index} onClick={ async () => {
                                setshowdropdowm('none')
                                if(link.middleware){
                                    await  link.middleware()
                                    window.location.href = link.href ?  link.href :'#'

                                }
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