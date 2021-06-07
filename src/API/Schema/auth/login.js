
export const queryLoginSchema  = (user,password ) => {
    return {
        query: `
        query{
            Login(email:"${user}",password:"${password}"){
              email
              token
              uid
              user
              message

            }
          }
        `,
    }
   
};
export const queryisLoginSchema = () =>{
  return {
      query:`
      query{
        isLogin {
          email
          token
          uid
          user
          message
        }
      }
      `
  }
}