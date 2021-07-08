import styles from './Input.module.css'
// import theme from '../../theme/themes.module.css'
import { useEffect,  useState } from 'react'

import { Menudropdown } from './menudropdown/menudropdown'


export const Input = ({ label, type, key, onChange, defaultValue, value }) => {

    // let _label = useRef(label ? label : "label")
    const [uploadimg, setuploadimg] = useState(null)


    const handlefileChange = (event) => {
        setuploadimg(URL.createObjectURL(event.target.files[0]))
    }
    useEffect(() => {

    }, [])
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
                                <div className={styles.divinput} >

                                    <Menudropdown onChange={(e)=>{console.log(e.target.value)}}></Menudropdown>

                                    {/* <input type="text"  value={value}   defaultValue={defaultValue?defaultValue:""}   onChange={onChange?onChange:()=>{}} ></input>
                                        <button onClick={()=>{console.log('click setting icon ')}}> icon </button> */}


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
                        <img src={uploadimg} width="64px" height="64px"  alt='' />
                    </div>
                    : null
            }
        </>
    )
}

export default Input