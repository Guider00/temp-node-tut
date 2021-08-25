

import styles from './Usermanagment.module.css'
import Table from '../../subcomponents/Table/Table'

import { Floormodal } from '../Setting/Floor/Floormodal'

import { useEffect, useState } from "react"

import { useMutation,useQuery, gql, } from '@apollo/client';
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

    const OnClickCreate = (data) => {
        console.log('create')
        setmodaldata({ ...data })
        setmodalaction("Create")
        setshowmodal(true)
    }

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


    return (
        <>
            
              
                        <>
                            {_showmodal ? <Floormodal Data={_modaldata} onSave={onSave} onClose={onClose} onchange={handleronchange} Action={_modalaction} Inputs={_users.inputs}></Floormodal> : null}


                            <div className={styles.main} >
                                <div className={styles.header}>
                                    <lable> Member </lable>
                                </div>
                                <div>
                                    <button>Add User </button>
                                </div>
                                <div>
                                   <Table Data={_users} onClickDelete={Delete} onClickEdit={onClickEdit}></Table>
                                </div>
                            </div>
                           
                        </>
            
        </>
    )
}