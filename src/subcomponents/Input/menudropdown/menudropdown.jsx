


import { useEffect, useRef, useState } from 'react'
import styles from './menudropdown.module.css'
import Icon from '@material-ui/core/Icon'

 import * as icons from '@material-ui/icons';




export const Menudropdown = ({ onChange  }) => {

    const [textdropdown, settextdropdown] = useState('none')
    const [showdropdown, setshowdropdowm] = useState('none')
    const [list_icon , setlisticon] = useState([])

    const wrapperRef = useRef(null);


    const toIcon = (str) =>{
        str = str.replace(/([A-Z])/g, '_$1').substring(1).toLowerCase()
        return str
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    console.log("You clicked outside of me!");
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect( ()=>{
       
        let _icons = Object.keys(icons).filter(
            name_func => name_func.indexOf("Outlined") === -1 &&
                name_func.indexOf("Rounded") === -1 &&
                name_func.indexOf("TwoTone") === -1 &&
                name_func.indexOf("Sharp") === -1
        )
        setlisticon(_icons)
    },[])

    useOutsideAlerter(wrapperRef);


    return (
 

        <div  className={styles.dropdown}>
            <button onClick={() => { setshowdropdowm(showdropdown === 'block' ? 'none' : 'block') }} 
            
            
            className={styles.dropbtn}> 
             <div><Icon>{toIcon(textdropdown)}</Icon> <label> {textdropdown} </label>  <Icon>arrow_drop_down</Icon></div>
             </button>
          
            <div ref={wrapperRef}   style={{ display: showdropdown }} className={styles.dropdown_content} >
                {
                    list_icon.map(( name_func ,index ) => <>
                        <div onClick={() => {
                            settextdropdown(name_func)
                            
                            onChange({ target: { value: name_func } })
                            setshowdropdowm('none')
                        }}>  <Icon>{toIcon(name_func)}</Icon> {index}

                        </div>
                    </>)
                }


            </div>
        </div>
    )
}