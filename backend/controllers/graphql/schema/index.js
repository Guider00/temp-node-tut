// schema.js
 const { Roomschema , queryRoom ,queryRoomByid , createRoom ,deleteRoom, updateRoom} = require('./Room/Room')
 const { Buildingschema , queryBuilding , queryBuildingByid ,
  createBuilding, deleteBuilding, updateBuilding } = require('./Building/Building')
 const { Floorschema , queryFloor ,queryFloorByid, createFloor, deleteFloor, updateFloor } = require('./Floor/Floor')

 const { RoomPriceschema , queryRoomPrice , createRoomPrice, deletRoomPrice, updateRoomPrice } = require('./RoomPrice/RoomPrice')

const { buildSchema } = require( 'graphql');






 const schema = buildSchema(  `


  ${Buildingschema}
  ${Floorschema}
  ${Roomschema}
  ${RoomPriceschema}
  

  type MessageUpdate {
      n:Int
      nModified:Int
      ok:Int
  }
  type MessageDelete{
      n:Int
      ok:Int
      deletedCount:Int
  }



  input softwareversionInput{
    backend:String
    frontend:String
    database:String
  }
  type softwareversion{
    backend:String
    frontend:String
    database:String
  }
  type Query {
    softwareversion : softwareversion,
    roomprices: [Roomprice],

    rooms:[Room],
    roomByid(id:ID!):Room,

    BuildingByid(id:ID!):Building,
    Buildings: [Building],

    FloorByid(id:ID!):Floor,
    Floors:[Floor]

    
  }
  type Mutation {
    updatesoftware(input:softwareversionInput):softwareversion,

    createroomprice(input: RoompriceInput):Roomprice,
    updateroomprice(id: ID!, input: RoompriceInput): MessageUpdate,
    deleteroomprice(id: ID!): MessageDelete,

    createRoom(input: RoomInput):Room,
    updateRoom(id: ID!, input: RoomInput): MessageUpdate,
    deleteRoom(id: ID!): MessageDelete,

    createBuilding (input: BuildingInput):Building,
    updateBuilding(id: ID!, input: BuildingInput): MessageUpdate,
    deleteBuilding(id: ID!): MessageDelete,

    createFloor(input: FloorInput):Floor,
    updateFloor(id: ID!, input: FloorInput): MessageUpdate,
    deleteFloor(id: ID!): MessageDelete,

  }


`);


 const rootValue = {
    updatesoftware: (payload) =>{
        if(!payload){ return null }
        const {backend,frontend,database}  = payload.input
        return {backend,frontend,database}
    },
    softwareversion : ()=>{  
      return ({
         backend:'String',
         frontend:'String',
         database:'String'
       })
    },

    roomprices : queryRoomPrice,
    createroomprice:createRoomPrice,
    updateroomprice:updateRoomPrice,
    deleteroomprice:deletRoomPrice,

    roomByid : queryRoomByid,
    rooms : queryRoom,
    createRoom : createRoom,
    updateRoom : updateRoom,
    deleteRoom : deleteRoom,

    BuildingByid : queryBuildingByid,
    Buildings :queryBuilding,
    createBuilding : createBuilding,
    updateBuilding : updateBuilding,
    deleteBuilding : deleteBuilding,

    FloorByid : queryFloorByid,
    Floors: queryFloor,
    createFloor : createFloor,
    updateFloor : updateFloor,
    deleteFloor : deleteFloor


  };

  module.exports ={
    schema:schema,
    rootValue:rootValue
  }

