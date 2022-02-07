import { gql } from '@apollo/client';

export const API_GET_UserManagement = gql`

query{
    UserManagements{
        id
        passWord
        name
        level
    }
}

`;
export const API_ADD_UserManagement = gql`
    mutation addUserManagement($input:UserManagementInput!){
        addUserManagement(input: $input){
            id
        }
    }
`;
export const API_DELETE_UserManagement = gql`
	mutation deleteUserManagement($id: ID!) {
		deleteUserManagement(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_UserManagement = gql`
mutation updateUserManagement($id:ID! , $input:UserManagementInput){
	updateUserManagement(id:$id,input:$input){
		n
		nModified
	}
}
` ;



