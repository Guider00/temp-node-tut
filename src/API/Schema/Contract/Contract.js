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
        Room{
            id
            name
            members{
                name
                lastname
            }
            checkin{
                id
                id_contact
                rental_deposit
                checkin_type
                checkin_date
                checkin_date_exp
            }
            RoomType{
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

        typerent
        mounthly_cost
        insurance_cost
        depositrent_cost

        mounthly_type_electrical_cost
        mounthly_rate_electrical
        mounthly_minimum_cost_electrical
        mounthly_buffet_cost_electrical
        mounthly_type_water_cost
        mounthly_rate_water
        mounthly_minimum_cost_water
        mounthly_buffet_cost_water
        
        daily_cost
        daily_type_electrical_cost
        daily_rate_electrical
        daily_minimum_cost_electrical
        daily_buffet_cost_electrical
        daily_type_water_cost
        daily_rate_water
        daily_minimum_cost_water
        daily_buffet_cost_water

        filecontract

    }
}

`;
export const API_CREATE_Contract = gql`
    mutation createContract($input:ContractInput!){
        createContract(input: $input){
            id
        }
    }
`;
export const API_DELETE_Contract = gql`
	mutation deleteContract($id:ID!) {
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