export const authReducer = (state ={
    email:"",password:"",
    user:null,error:null,status:""
},action) =>{
    switch(action.type){
        case  'AUTH_LOGIN':
        state = {...state,...action.payload}
        return {state}
        default :
        break;
    }
}

