import {  gql } from '@apollo/client';

    //Query
export const API_GET_Booking = gql`
	query {
		Bookings {
			id
			customer_name
			customer_lastname
			customer_tel
			checkin_date
			checkin_date_exp
			deposit
			note
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

	mutation deleteBooking($id: ID!) {
		deleteBooking(id: $id) {
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