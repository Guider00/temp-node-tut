

import styles from './Usermanagment.module.css'
import Table from '../../subcomponents/Table/Table'

import { Floormodal } from '../Setting/Floor/Floormodal'

import { useEffect, useState } from "react"
import { API_GET_UserManagement , API_DELETE_UserManagement ,API_UPDATE_UserManagement } from '../../API/Schema/UserManagement/UserManagement'
import { useMutation,useQuery, gql, } from '@apollo/client';

import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LockIcon from '@mui/icons-material/Lock';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '../Adminsetting/Dialog.js'

const API_GET_USERS = gql`
  query{
    users{
      id
      email
      lock_user
      reset_password
      level
    }
  }
`;

const API_DELETE_USER = gql`
mutation deleteUser($id :String!){
        deleteUser(id:$id){
        n
        ok
        }
    }
`;

const API_UPDATE_USER = gql`
mutation updateUser($id :String! ,$email:String , $level:String , $lock_user:String,$reset_password:String){
        updateUser(id:$id , email:$email , level:$level  ,lock_user:$lock_user ,reset_password:$reset_password  ){
        n
        ok
        }
    }
  
`;




export const Usermanagement = () => {

  //  const { loading, error, data } = 


    const [_users, setusers] = useState({
        topic: [],
        body: [],
        inputs: []

    })

    const [_load, setload] = useState(false);
    const [_showmodal, setshowmodal] = useState(false);
    const [_modaldata, setmodaldata] = useState({});
    const [_modalaction, setmodalaction] = useState("");


    const handleronchange = (value, index) => {
        _users.inputs = _users.inputs.map((item, _index) => {
            if (_index === index) {
                return { ...item, form: { ...item.form, "value": value } }; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
        });
        let catch_value = _users
        setusers({ ...catch_value })

    }

    // const OnClickCreate = (data) => {
    //     console.log('create')
    //     setmodaldata({ ...data })
    //     setmodalaction("Create")
    //     setshowmodal(true)
    // }

    const onClickEdit = (id, data) => {
        console.log("Update", id, data)

        _users.inputs = _users.inputs.map((item, _index) => {
            if (data.hasOwnProperty(item.property) && data.hasOwnProperty(item.property)) {
                if (data[item.property] && typeof data[item.property] === 'object' && data[item.property].hasOwnProperty("id")) {
                    return { ...item, form: { ...item.form, "value": data[item.property].id } }; //gets everything that was already in item, and updates "done"
                } else {
                    return { ...item, form: { ...item.form, "value": data[item.property] } }; //gets everything that was already in item, and updates "done"
                }
            } else {
                return { ...item, }
            }
        });


        let catch_value = _users
        setusers({ ...catch_value })
        setmodaldata({ ...data })  // <<set id input
        setmodalaction("Update") // << action type
        setshowmodal(true)
    }
    const onClose = () => {
        setshowmodal(false)
    }


    const Delete = async (id) => {
        try{
            console.log('id ; ',id)
         const {data} = await delete_user({ variables: { id: id } }) 
         console.log('delete User res : ',data)
        }catch(e){
            console.log('delete Error')
        }
        refetch()
        setload(false)
    }


    const onSave = async (id, inputs, action) => {
        console.log(action)
        let data = inputs.map(item => {
            return { [item.property]: item.form.value }
        }).reduce((accumulator, currentValue) => {
            return { ...accumulator, ...currentValue }
        })

        console.log('Update id data', id, data)

        let res
        if (action === "Update" && id) {
            console.log('data :' ,data)
            try{    
                let obj = {...{id:id} , ...data}
                res = await update_user( { variables: obj }  , )
            }catch(e){
                console.log('update user Error ')
            }
          
        } else if (action === "Create") {
            // res = await API_createMember(data)
        }

        if (res && res.status === 200) {
            setshowmodal(false)
        } else {
            setshowmodal(false) // Alert
        }
        refetch()
        setload(false)
    }


    const { data, loading, error ,refetch  }  =  useQuery(API_GET_USERS);
    console.log(loading,error)
    const [delete_user] = useMutation(API_DELETE_USER);
    const [update_user] = useMutation(API_UPDATE_USER);

  

    useEffect(() => {
        const getAPI = async () => {

           

            let table = data ? data.users ? data.users : [] : []
            table = table.map( _data => ({  ...{"data":_data} ,..._data})  ) ; // update property data

            console.log('table',table)
            setusers({
                showindex: true,
                topic: ["email", "level", "lock_user", "reset_password"],
                body: table,
                inputs: [
                    {
                        label: "email",
                        property: "email",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "level",
                        property: "level",
                        form: {
                            displayform: "select",
                            type: "text",
                            options:[
                                {value:`Viewer`,label:"Viewer"},
                                {value:`Operator`,label:"Operator"},
                                {value:`Admin`,label:"Admin"},
                             ],
                            value: "Viewer"
                        }
                    },
                    {
                        label: "lock_user",
                        property: "lock_user",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },
                    {
                        label: "reset_password",
                        property: "reset_password",
                        form: {
                            displayform: "textbox",
                            type: "text",
                            value: ""
                        }
                    },

                ]
            })
            setload(true)
        }
        getAPI()
    }, [data])


    //UpdateCode

    const GetUser = useQuery(API_GET_UserManagement)
    const [ DeleteUser, mutationDeleteUser] = useMutation(API_DELETE_UserManagement)
    const [ UpdateUser, mutationUpdateUser] = useMutation(API_UPDATE_UserManagement)
    const [User , setUser] = useState([])


    const [SelectID , setSelectID] = useState({
        id:null,
        name:"",
    })
    const handleID = (id , name) =>{
        setSelectID({
            id:id,
            name:name
        })
    }

    //Dialog

    const [defaultDialog, setdefaultDialog] = useState({
        message:"Save it?",
        isLoading: false,
        type:"",
    });
    const handleDialog = (message , isLoading ,type) =>{
        setdefaultDialog({
            message:message,
            isLoading:isLoading,
            type:type,
        })
    }

    const [nameChange ,setNameChange] = useState({
        id:null,
        name:null
    })
    const [formErrors , setFormErrors] = useState({})

    //delete

    const DeleteUserFunction = () =>{
        DeleteUser({
            variables: {
                id:`${SelectID.id}`
            }
        })

    }

    
    //update

    const UpdateUserFunction = () =>{
        UpdateUser({
            variables: {
                id:`${SelectID.id}`,
                input:{
                    name:`${nameChange.name}`
                }
            }
        })
    }

    
    const handleChangeInput = (e) =>{
        let value = e.target.value
        const errors = {}
        const text = /^[A-Za-z0-9ก-๙/]+$/;
        if(!value){
            let _nameChange = nameChange
            _nameChange['name'] = value
            _nameChange['id'] = e.target.id;
            errors.error = "Name is required!"
            setNameChange({..._nameChange})
            setFormErrors(errors)

        }if(!text.test(value)){
            let _nameChange = nameChange
            _nameChange['name'] = value
            _nameChange['id'] = e.target.id;
            errors.error = "Name is Format!"
            setNameChange({..._nameChange})
            setFormErrors(errors)
        }if(value.length > 15){
            let _nameChange = nameChange
            _nameChange['name'] = value
            _nameChange['id'] = e.target.id;
            errors.error = "Name is Overflow!"
            setNameChange({..._nameChange})
            setFormErrors(errors)
        }else{
            let _nameChange = nameChange
        _nameChange['name'] = value
        _nameChange['id'] = e.target.id;
        errors.error = ""
        setNameChange({..._nameChange})
        setFormErrors(errors)

        }
        
    }

    //checkFunction

    const checkFunction = async (choose) =>{
        if(choose && defaultDialog.type === '1'){
            DeleteUserFunction()
            GetUser.refetch()
            console.log('Delete')

            handleDialog('',false)
        }if(choose && defaultDialog.type === '4'){
            UpdateUserFunction()
            GetUser.refetch()
            console.log('Save')

            handleDialog('',false)
        }else{
            console.log('NO-type')

            handleDialog('',false)
        }
        
    }

 


    useEffect(()=>{
        if(GetUser && GetUser.data && GetUser.data.UserManagements ){
            let _User = User
            _User = GetUser.data.UserManagements
            setUser(_User)

        }
    },[GetUser])




    return (
        <>
            
              
                        <>
                            {defaultDialog.isLoading && <Dialog onDialog={checkFunction} message = {defaultDialog.message}/>}
                            {_showmodal ? <Floormodal Data={_modaldata} onSave={onSave} onClose={onClose} onchange={handleronchange} Action={_modalaction} Inputs={_users.inputs}></Floormodal> : null}


                            <div className={styles.main} >
                                <div className={styles.header}>
                                    <lable> Member </lable>
                                </div>
                                <div className={styles.table}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>ลำดับ</td>
                                                <td>ID USER</td>
                                                <td>NAME</td>
                                                <td>LEVEL</td>
                                                <td>MENU</td>
                                            </tr>
                                        </thead>
                                        <tbody>{User.map((user,index)=>

                                            <tr>
                                                <td>{index+1}</td>
                                                <td width={'800px'}>{user.id ? user.id : '---'}</td>
                                                <td width={'200px'}>
                                                    <input 
                                                    id={user.id}
                                                    className={styles.input}
                                                    value={ nameChange.id === user.id  ?  nameChange.name : user.name }
                                                    onChange={handleChangeInput}
                                                    />
                                                    <lable>{nameChange.id === user.id ? formErrors.error : null}</lable>
                                            
                                                </td>
                                                <td width={'200px'}>{user.level ? user.level : '---'}</td>
                                                <td width={'500px'}>
                                                    <button 
                                                    className={styles.button}
                                                    onClick={()=>{
                                                        let id = user.id
                                                        let name = user.name
                                                        handleDialog(`Are you sure you want to delete This  ID : ${user.id}`,true , '1')
                                                        handleID(id )
                                                    }}
                                                    >
                                                        <DeleteOutlineIcon/>
                                                        <br/>
                                                        <lable className={styles.text}>Delete user</lable>
                                                        
                                                    </button>
                                                    <button 
                                                    className={styles.button}
                                                    onClick={()=>{
                                                        let id = user.id
                                                        let name = user.name
                                                        handleDialog(`Are you sure you want to Lock This  ID : ${user.id}`,true , '2')
                                                        handleID(id )
                                                    }}
                                                    >
                                                        <LockIcon/>
                                                        <br/>
                                                        <lable className={styles.text}>Lock user</lable>
                                                        
                                                    </button>
                                                    <button className={styles.button}
                                                    onClick={()=>{
                                                        let id = user.id
                                                        let name = user.name
                                                        handleDialog(`Are you sure you want to Restart Password This  ID : ${user.id}`,true , '3')
                                                        handleID(id , name)
                                                    }}
                                                    >
                                                        <RestartAltIcon/>
                                                        <br/>
                                                        <lable className={styles.text}>Reset Password</lable>
                                                    
                                                    </button>
                                                    <button className={styles.button}
                                                    onClick={()=>{
                                                        let id = user.id
                                                        let name = nameChange.name
                                                        handleDialog(`Are you sure you want to Save This  ID : ${user.id}`,true , '4')
                                                        handleID(id , name)
                                                    }}
                                                    >
                                                        <SaveIcon/>
                                                        <br/>
                                                        <lable className={styles.text}>Save</lable>
                                                        
                                                    </button>
                                                </td>
                                            </tr>

                                        )}
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    _load ? 
                                    <></> 
                                    :
                                    <div>
                                    <Table Data={_users} onClickDelete={Delete} onClickEdit={onClickEdit}></Table>
                                    </div>
                                }

                            </div>
                           
                        </>
            
        </>
    )
}