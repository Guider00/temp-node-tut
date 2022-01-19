import { gql } from '@apollo/client';

export const API_GET_RoomType = gql`
	query {
		RoomTypes {
			name
			type
			dailyprice
			monthlyprice
			insurance
			type_price_water
			rate_water
			unit_water
			totalprice_water
			type_price_electrical
			rate_electrical
			unit_electrical
			totalprice_electrical
		}
	}
`;
export const API_CREATE_RoomType = gql`
	mutation createRoomType($input: ContractInput!) {
		createRoomType(input: $input) {
			id
		}
	}
`;
export const API_DELETE_RoomType = gql`
	mutation deleteRoomType($id: ID) {
		deleteRoomType(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_RoomType = gql`
	mutation updateRoomType($id: ID!, $input: ContractInput) {
		updateRoomType(id: $id, input: $input) {
			n
			nModified
		}
	}
`;
