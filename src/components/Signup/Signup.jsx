import { useState, useEffect } from 'react';
import styles from './Signup.module.css'

import { useMutation, gql } from '@apollo/client';

const API_signup = gql`
mutation signup($email: String! , $password:String!, $level : String!) {

    signup(email: $email , password: $password , level:$level){
        token
        error
    }
}
`;


export const FormSignup = () => {

    const [mutationsignup] = useMutation(API_signup);


    const [_messagealert, setmessagealert] = useState("")

    const [_loading, setloading] = useState(false)
    const [_user, setuser] = useState("")
    const [_password, setpassword] = useState("")
    const [_confirmpassword, setconfirmpassword] = useState("")
    const [_validateconfirmpassword, setvalidateconfirmpassword] = useState(true)
    const [_level, setlevel] = useState("Viewer")
    const [_tel, settel] = useState("")

    const onchange_user = (e) => { setuser(e.target.value) }
    const onchange_password = (e) => { setpassword(e.target.value) }
    const onchange_confirmpassword = (e) => {
        setconfirmpassword(e.target.value)
    }
    const onBlur_confirmpassword = (e) => {
        console.log('onfocusout_confirmpassword')
        if (e.target.value === _password) {
            setvalidateconfirmpassword(true)
        } else {
            setvalidateconfirmpassword(false)
        }
    }
    const onchange_level = (e) => { setlevel(e.target.value) }
    const onchange_tel = (e) => { settel(e.target.value) }

    const onclick_signup = async () => {
        let resulte = {
            user: _user,
            password: _password,
            level: _level,
            tel: _tel
        }
        if (_confirmpassword === _password) {
            setvalidateconfirmpassword(true)
            console.log('send signup', resulte)
            try{
             const {data} =  await mutationsignup({ variables: { email: _user, password: _password , level : _level} })
            console.log(data.signup)
                if(data && data.signup && data.signup.error === null ){
                    localStorage.setItem('AUTH_TOKEN', data.signup.token);
                    setmessagealert('signup sucess')
                    window.location.href ="/"
                }else if(data.error ){
                    setmessagealert(data.error)
                }
            }catch{
                setmessagealert('signup Error')
            }
           

        } else {
            setvalidateconfirmpassword(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setloading(true)
        }, 500);
    }, [])
 


  
    return (
        <>

            {
                _loading === false ?
                    <div> loading.... </div> :
                    <div className={styles.bg}>
                        <div className={styles.form}>

                            <div className={styles.header}>
                                <label> Signup   {_messagealert}</label>
                            </div>
                            <div className={styles.body}>

                                <div>
                                    <div className={styles.first}>  </div>
                                    <div className={styles.label}>  <label>*username</label> </div>
                                    <div className={styles.input} > <input type="text" placeholder="username" onChange={onchange_user} /> </div>
                                    <div className={styles.end}>   </div>
                                </div>
                                <div>
                                    <div className={styles.first}>  </div>
                                    <div className={styles.label}>  <label>*password</label> </div>
                                    <div className={styles.input} > <input type="password" placeholder="password"   onChange={onchange_password} />  </div>
                                    <div className={styles.end}>   </div>
                                </div>

                                <div>
                                    <div className={styles.first}>  </div>
                                    <div className={styles.label}>  <label>*confirm password</label> </div>
                                    <div className={styles.input} > <input type="password" placeholder="confirm-password"
                                     style={{ borderColor: _validateconfirmpassword ? "none" : "red" }} onChange={onchange_confirmpassword} 
                                     onBlur={onBlur_confirmpassword} />  </div>

                                    <div className={styles.end}>   </div>
                                </div>
                                <div>
                                    <div className={styles.first}>  </div>
                                    <div className={styles.label}>  <label>*level</label> </div>
                                    <div className={styles.input} >
                                        <select onChange={onchange_level} >
                                            <option>Viewer</option>
                                            <option>Operator</option>
                                        </select>
                                    </div>
                                    <div className={styles.end}>   </div>
                                </div>
                                <div>
                                    <div className={styles.first}>  </div>
                                    <div className={styles.label}>  <label>tel</label> </div>
                                    <div className={styles.input} >
                                    <input type="text" onChange={onchange_tel} placeholder="083xxxxxxx" />
                                    </div>
                                    <div className={styles.end}>   </div>
                                </div>

                            </div>
                            <div className={styles.zone_btn}>
                                <div className={styles.first}>  </div>
                                    <button  className={styles.signupbtn} onClick={onclick_signup} > Submit </button>
                                <div className={styles.end}>   </div>
                            </div>
                            <div className={styles.zone_end}>
                                <div className={styles.first}>  </div>
                                <div className={styles.text}  >
                                         <label>try to login again </label>
                                        <a href="/login"> home page</a>
                                </div>
                                <div className={styles.end}>   </div>
                            </div>


                        </div>

                    </div>
            }
        </>
    )
}