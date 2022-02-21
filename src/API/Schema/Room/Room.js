import {  gql } from '@apollo/client';

export const queryRoomByid = (id) =>{
    return {query:`
        query{
            roomByid(id:"${id}"){
                id
                name
                status
                floor{
                    id
                    name
                    building{
                        id
                        name
                    }
                }
                RoomType{
                    id
                    name
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
                version
            }
        }
    `}
}

export const queryRooms = () =>{
    return { query:`
    query{
        rooms{
            id
            name
            status
            checkin_date
            checkout_date
            bookings{
                booking_number
                checkin_type
                checkin_date
                checkin_date_exp
                
                payment_method
                deposit
                status
                customer_tel
                customer_name
                customer_address
                taxnumber
            }

            floor{
                id
                name
                building{
                    id
                    name

                }
            }
            member{
                id
                name
                lastname
                email
                personalid
            }
            members{
                id
                name
                lastname
                tel
                email
                personalid
                taxnumber
                address
                carid
            }
            meterroom{
                id
                name
                device_model
                inmemory_kwh
                inmemory_kwh_date
                inmemory_finished_kwh
                inmemory_finished_kwh_date 

                inmemory_water
                inmemory_water_date
                inmemory_finished_water
                inmemory_finished_water_date

            }
            RoomType{
                id
                name
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
    `
    }
}
export const createRoom = (data) =>{
    console.log('createRoom',data)
    return {query:`
    mutation{
        createRoom(input:{
            name:"${data.name}"
            status:"${data.status}"
            type:"${data.type}"
            floor:"${data.floor}"
            member:"${data.member}"
            meterroom:"${data.meterroom}"
            RoomType:"${data.RoomType}"
          }){
            id
            errors
          }
      }
    `
    }
}

export const updateRoom = (id ,data )=>{
    console.log('update Room',data)
    return {query:`
    mutation{
        updateRoom(id:"${id}",
        input:{
            name :"${data.name}"
            status:"${data.status}"
            floor:"${data.floor}"
            member:"${data.member}"
            meterroom:"${data.meterroom}"
            RoomType:"${data.RoomType}"
        })
        {
         n
         ok
         nModified   
        }
    }

    `
    }
}

export const deleteRoom = (id) =>{
    return {query:`
        mutation{
            deleteRoom(id:"${id}"){
                n
                ok
                deletedCount
              }
        }
        `
    }
}

export const API_GET_Rooms = gql`
    query{
        Rooms{
            id
            name
            status
            checkin_date
            checkout_date
            bookings{
                id
                booking_number
                customer_name
                customer_lastname
                customer_tel
                customer_address
                checkin_type 
                checkin_date
                checkin_date_exp
                taxnumber
                payment_method
                deposit
                note
                receipt_number
                status
                confirm_booking
            }

            floor{
                id
                name
                building{
                    id
                    name

                }
            }
            member{
                id
                name
                lastname
                email
                personalid
                taxnumber
                address
                carid
                note
            }
            members{
                id
                name
                lastname
                tel
                email
                personalid
                taxnumber
                address
                carid
                note
            }
            meterroom{
                id
                name
                device_model
                inmemory_kwh
                inmemory_kwh_date
                inmemory_finished_kwh
                inmemory_finished_kwh_date 

                inmemory_water
                inmemory_water_date
                inmemory_finished_water
                inmemory_finished_water_date

            }
            RoomType{
                id
                name
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
                }
                
            }
            checkin{
                id
                id_contact
                checkin_type
                checkin_date
                checkin_date_exp
                rental_deposit
                number_day_rent
                branch
                Checkinoption{
                    name
                    price
                    number_item
                    calculate_mode
                    selectvat
                    type_price
                }
            }

            checkinInvoice{
                id
                docnumber
                monthlybilling
                duedateinvoice
                status
                printstatus
                lists{
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
                }
            }
            checkinReceipt{
                id
                status
                monthlybilling
                lists{
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
                }
            }
            
            monthlyInvoice{
                id
                status
                printstatus
                lists{
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
  
                }
            }
            monthlyReceipt{
                id
                status
                lists{
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
                }
            }

            checkoutInvoice{
                id
                status
                printstatus
                lists{
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
                }
            }
            checkoutReceipt{
                id
                status
                lists{
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
                }
            }

            Contract{
                id
                status
            }
        }
    }
`;

export const API_UPDATE_Room = gql`
    mutation updateRoom($id:ID! , $input:RoomInput!){
        updateRoom(id:$id,input:$input){
            n
            nModified
        }
    }
`

export const API_UPDATE_MemberInRoom = gql`
    mutation addmemberinRoom($id:ID! , $input:MemberID!){
        addmemberinRoom(id:$id,input:$input){
            n
            nModified
        }
    }
`
export const API_DELET_MemberInRoom = gql`
    mutation deletememberinRoom($id:ID! , $input:MemberID!){
        deletememberinRoom(id:$id,input:$input){
            n
            nModified
        }
    }
`
