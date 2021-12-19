import { gql } from '@apollo/client';

export const API_GET_Address = gql`

query{
    Addresss{
        id
        name
        tel
        no
        village
        road
        district
        alley
        boundary
        province
        code
    }
}

`;
export const API_ADD_Address = gql`
    mutation addAddress($input:AddressInput!){
        addAddress(input: $input){
            id
        }
    }
`;
export const API_DELETE_Address = gql`
	mutation deleteAddress($id: ID!) {
		deleteAddress(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Address = gql`
    mutation updateAddress($id:ID! , $input:AddressInput){
	    updateAddress(id:$id,input:$input){
		    n
		    nModified
	}
}
` ;