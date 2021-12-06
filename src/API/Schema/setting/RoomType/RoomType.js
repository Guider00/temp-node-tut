import {  gql } from '@apollo/client';

    //Query
export const API_GET_RoomType = gql`
 query{
   RoomTypes{
    id
	name
    type
    monthlyprice
    dailyprice
    deposit_rent
    insurance
    type_price_electrical
    unit_electrical
    rate_electrical
    totalprice_electrical
    type_price_water
    unit_water
    rate_water
    totalprice_water
    listoptionroom{
        id
        name
        price
        type
    }
    version
   }
 }
`;
    // Mutation 
export const API_ADD_RoomType = gql`
	mutation createRoomType($input: RoomTypeInput!) {
		createRoomType(input: $input) {
			id
		}
	}
`;
export const API_DELETE_RoomType = gql`

	mutation deleteRoomType($id: ID!) {
		deleteRoomType(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_RoomType = gql`
mutation updateRoomType($id:ID! , $input:RoomTypeInput){
	updateRoomType(id:$id,input:$input){
		n
		nModified
	}
}
` 
export const API_UPDATE_LISTOPTION_IN_ROOM = gql`
mutation addlistoptioninRoomType($id:ID! , $input:OptionRoomInput){
	addlistoptioninRoomType(id:$id,input:$input){
		n
		nModified
	}
}
`
export const API_DELETE_LISTOPTION_IN_ROOM = gql`
mutation deletelistoptioninRoomType($id:ID! , $input:OptionRoomInput){
	deletelistoptioninRoomType(id:$id,input:$input){
		n
		nModified
	}
}
`