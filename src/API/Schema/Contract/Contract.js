import { gql } from '@apollo/client';

export const API_GET_Contract = gql`

query{
    Contracts{
        id
        Contractnumber
        RoomType
        RoomName
        RentType
        name
        surname
        Check_in
        status
        Check_out
    }
}

`;
export const API_ADD_Contract = gql`
    mutation createContract($input:ContractInput!){
        createContract(input: $input){
            id
        }
    }
`;
export const API_DELETE_Contract = gql`
	mutation deleteContract($id: ID) {
		deleteContract(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Contract = gql`
    mutation updateContract($id:ID! , $input:ContractInput){
	    updateContract(id:$id,input:$input){
		n
		nModified
	}
}
` ;