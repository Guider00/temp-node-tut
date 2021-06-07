import fetchData from '../../cores/axios/index'
import {queryRoomPricesSchema} from '../../API/Schema/RoomPrice/sch_roomprice'

const getRoomPrices = () =>{
    fetchData('GET','./GraphQL',queryRoomPricesSchema)
}