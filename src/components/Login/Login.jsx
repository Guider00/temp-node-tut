
import { useState, useEffect } from 'react';
import styles from './Login.module.css'
import LockOpenIcon from '@material-ui/icons/LockOpen';


import { useMutation, gql, } from '@apollo/client';

const API_Login = gql`
  mutation Login($email: String! , $password:String!) {
    login(email: $email , password: $password){
        token
        error
    }
  }
`;




export const FormLogin = () => {
    const [_user, setuser] = useState("")
    const [_password, setpassword] = useState("")
    const [_messagealert, setmessagealert] = useState("")

    const onchange_user = (e) => { setuser(e.target.value) }
    const onchange_password = (e) => { setpassword(e.target.value) }

    const [mutationLogin] = useMutation(API_Login);



    const onclick_Login = async (e) => {
        if (_user === "") {
            setmessagealert("Not have input user")
        } else if (_password === "") {
            setmessagealert("Not have input password")
        } else {
            try {
                const { data } = await mutationLogin({ variables: { email: _user, password: _password } })
          
              
                if( data &&  data.login && data.login.error === null &&  data.login.token ){
                    console.log('set token ',data.login.token)
                    localStorage.setItem('AUTH_TOKEN', data.login.token);
                     window.location.pathname ='/home'
                    setmessagealert("login sucess") 
                }else if( data &&  data.login && data.login.error ){
                    setmessagealert(data.login.error) 
                }
               
               
            }
            catch (e) {
                console.log(e)
                setmessagealert("user name or password is incorrect")
            }





        }


    }
    useEffect(() => {
        console.log('check has been login')
    }, [])
    return (
        <>
            <div className={styles.bg}>
                <div className={styles.form}>
                    {_messagealert === "" ? null :
                        <div className={styles.alert}>
                            <label>{_messagealert}</label>
                        </div>
                    }
                    <div className={styles.header}>
                        <label> Login <LockOpenIcon /></label>
                    </div>
                    <div className={styles.body}>


                        <div>
                            <div className={styles.first}>  </div>
                            <div className={styles.label}>  <label>username</label> </div>
                            <div className={styles.input} > <input type="text" placeholder="username" onChange={onchange_user} /> </div>
                            <div className={styles.end}>   </div>
                        </div>
                        <div>
                            <div className={styles.first}>  </div>
                            <div className={styles.label}>  <label>password</label> </div>
                            <div className={styles.input} > <input type="password" placeholder="password" onChange={onchange_password} />  </div>
                            <div className={styles.end}>   </div>

                        </div>

                        <div className={styles.zone_btn} >
                            <div className={styles.first}>  </div>
                            <button className={styles.loginbtn} onClick={onclick_Login} > Login </button>
                            <div className={styles.end}>  </div>
                        </div>
                        <div className={styles.zone_end}>
                            <div className={styles.first}>  </div>
                            <div className={styles.text}  >
                                <label>create your account </label>
                                <a href="/signup"> Signup</a>
                            </div>
                            <div className={styles.end}>   </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
