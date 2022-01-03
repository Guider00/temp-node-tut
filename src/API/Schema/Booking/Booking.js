import {  gql } from '@apollo/client';

    //Query
export const API_GET_Booking = gql`
	query {
		Bookings {
			id
			booking_number
			customer_name
			customer_lastname
			customer_tel
			customer_address
			checkin_type 
			checkin_date
			checkin_date_exp
			payment_method
			deposit
			note
			receipt_number
			status
			confirm_booking
			Room {
				id
				name
				status
				floor{
					name
					building{
						name
					}
				}
				RoomType{
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
				}
			}
		}
	}
`;
    // Mutation 
export const API_ADD_Booking = gql`
	mutation createBooking($input: BookingInput!) {
		createBooking(input: $input) {
			id
		}
	}
`;
export const API_DELETE_Booking = gql`
	mutation deleteBooking($id: ID!,$id_room:ID!) {
		deleteBooking(id: $id,id_room: $id_room) {
			n
			deletedCount
		}
	}
`
export const API_DELETE_Booking_and_BookinginRoom = gql`

	mutation deleteBooking($id: ID!,$id_room:ID!) {
		deletebookingsinRoom(id:$id_room, input: {id:$id} ){
			n
			nModified
		}
		deleteBooking(id: $id,id_room: $id_room) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Booking = gql`
mutation updateBooking($id:ID! , $input:BookingInput){
	updateBooking(id:$id,input:$input){
		n
		nModified
	}
}
` 