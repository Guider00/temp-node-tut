import styles from './Input.module.css'
// import theme from '../../theme/themes.module.css'
import { useRef, useState } from 'react'
import { Menudropdown } from './menudropdown/menudropdown'
import Icon from '@material-ui/core/Icon'

export const Input = ({ label, type, key, onChange, defaultValue, value }) => {

    // let _label = useRef(label ? label : "label")
    const [uploadimg, setuploadimg] = useState(null)
    const [isShow, setIsShow] = useState(false)
    const [icon, setIcon] = useState('')
    const [icons, setIcons] = useState('')
    const inputRef = useRef(null)
    const handlefileChange = (event) => {
        setuploadimg(URL.createObjectURL(event.target.files[0]))

    }
    const toIcon = (str) => {
        str = str.replace(/([A-Z])/g, '_$1').substring(1).toLowerCase()
        return str
    }

    return (
        <>
            <div className={styles.input}>
                <div className={styles.divlabel}>
                    <label>{label}</label>
                </div>
                {
                    type === 'image' ?
                        <>
                            <div className={styles.divinput} >
                                <input type="file" id="myfile" name="myfile" multiple onChange={handlefileChange} />
                            </div>
                        </>
                        : type === 'icon' ?
                            <>
                                {/* <div className={styles.divinput} >

                                    <Menudropdown onChange={(e)=>{console.log(e.target.value)}}></Menudropdown> */}

                                {/* <input type="text"  value={value}   defaultValue={defaultValue?defaultValue:""}   onChange={onChange?onChange:()=>{}} ></input>
                                        <button onClick={()=>{console.log('click setting icon ')}}> icon </button> */}


                                {/* </div> */}
                                <div className={styles.container_icon}>


                                    <Icon className={styles.icon_styles}>{toIcon(icon)}</Icon>
                                    <button
                                        className={styles.button_icon}
                                        onClick={() => {
                                            if (isShow === true) {
                                                setIsShow(false)
                                            } else {
                                                setIsShow(true)
                                            }
                                        }}><span>Select Icon</span></button>
                                    {isShow ?
                                        <div className={styles.container_icon_isShow}>
                                            <div className={styles.body}>
                                                <h3 className={styles.Topic}>Select Icon</h3>
                                                <div className={styles.Select}>
                                                    <Menudropdown type='text' onChange={(e) => {
                                                        setIcons(e.target.value)
                                                        console.log(e.target.value)
                                                    }} ></Menudropdown>
                                                </div>
                                            </div>
                                            <div className={styles.footer}>
                                                <button onClick={() => {
                                                    setIcon(icons)
                                                    setIsShow(false)
                                                }}>Confirm</button>
                                                <button onClick={() => setIsShow(false)}>Cancel</button>
                                            </div>

                                        </div> : null}
                                </div>
                            </>





                            :
                            <div className={styles.divinput} >
                                <input type="text" value={value} defaultValue={defaultValue ? defaultValue : ""} onChange={onChange ? onChange : () => { }} ></input>
                            </div>
                }

            </div>
            {
                type === 'image' && uploadimg !== null ?
                    <div className={styles.uploadimage} >
                        <img src={uploadimg} width="64px" height="64px" alt='' />
                    </div>
                    : null
            }
        </>
    )
}

export default Input