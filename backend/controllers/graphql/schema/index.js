// schema.js
const { Roomschema, queryRoom, queryRoomByid, createRoom, deleteRoom, updateRoom } = require('./Room/Room')

const { Buildingschema, queryBuilding, queryBuildingByid, createBuilding, deleteBuilding, updateBuilding } = require('./Building/Building')

const { Memberschema, queryMembers, queryMemberByid, createMember, deleteMember, updateMember } = require('./Member/Member')

const { Floorschema, queryFloor, queryFloorByid, createFloor, deleteFloor, updateFloor } = require('./Floor/Floor')

const { RoomPriceschema, queryRoomPrice, createRoomPrice, deletRoomPrice, updateRoomPrice } = require('./RoomPrice/RoomPrice')

const { MeterRoomschema, queryMeterRooms, queryMeterRoomByid, createMeterRoom, deleteMeterRoom, updateMeterRoom, } = require('./MeterRoom/MeterRoom')

const { Portmeterschema, queryPortmeters, queryPortmeterByid, createPortmeter, deletePortmeter, updatePortmeter } = require('./PortMeter/Portmeter')


const { Noteschema , queryNotes , queryNoteByid , createNote , deleteNote , updateNote } = require('./Note/Note')


 // real time system status 
const { DBstatusschema, queryDBstatus } = require('./System/DBstatus/DBstatus')
const { MQTTServerschema , queryMQTTServerstatus}   = require('./System/MQTTserver/MQTTserver')




const { buildSchema } = require('graphql');


const schema = buildSchema(`

  ${MQTTServerschema}
  ${DBstatusschema}

  ${Memberschema}
  ${Buildingschema}
  ${Floorschema}
  ${Roomschema}
  ${RoomPriceschema}
  ${MeterRoomschema}
  ${Portmeterschema}


  ${Noteschema}

  type MessageCreate{
    id:String
    errors:String
  }

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

    DBstatus:DBstatus,
    MQTTServerstatus:MQTTServerstatus,


    softwareversion : softwareversion,
    roomprices: [Roomprice],

    rooms:[Room],
    roomByid(id:ID!):Room,

    BuildingByid(id:ID!):Building,
    Buildings: [Building],

    FloorByid(id:ID!):Floor,
    Floors:[Floor],

    MemberByid(id:ID!):Member,
    Members:[Member],

    MeterRoomByid(id:ID!):MeterRoom,
    MeterRooms:[MeterRoom],

    PortmeterByid(id:ID!):Portmeter,
    Portmeters:[Portmeter],

    NoteByid(id:ID!):Note,
    Notes:[Note]
 



  }
  type Mutation {
    updatesoftware(input:softwareversionInput):softwareversion,

    createroomprice(input: RoompriceInput):Roomprice,
    updateroomprice(id: ID!, input: RoompriceInput): MessageUpdate,
    deleteroomprice(id: ID!): MessageDelete,

    createRoom(input: RoomInput):MessageCreate,
    updateRoom(id: ID!, input: RoomInput): MessageUpdate,
    deleteRoom(id: ID!): MessageDelete,

    createBuilding (input: BuildingInput):MessageCreate,
    updateBuilding(id: ID!, input: BuildingInput): MessageUpdate,
    deleteBuilding(id: ID!): MessageDelete,

    createFloor(input: FloorInput):MessageCreate,
    updateFloor(id: ID!, input: FloorInput): MessageUpdate,
    deleteFloor(id: ID!): MessageDelete,

    createMember(input: MemberInput):MessageCreate,
    updateMember(id: ID!,input :MemberInput):MessageUpdate,
    deleteMember(id: ID!): MessageDelete,

    createMeterRoom(input: MeterRoomInput):MessageCreate,
    updateMeterRoom(id: ID!, input: MeterRoomInput): MessageUpdate,
    deleteMeterRoom(id: ID!): MessageDelete

    createPortmeter(input: PortmeterInput):MessageCreate,
    updatePortmeter(id: ID!, input: PortmeterInput): MessageUpdate,
    deletePortmeter(id: ID!): MessageDelete


    createNote(input: NoteInput):MessageCreate,
    updateNote(id: ID!, input: NoteInput): MessageUpdate,
    deleteNote(id: ID!): MessageDelete


  }




`);


const rootValue = {
  updatesoftware: (payload) => {
    if (!payload) { return null }
    const { backend, frontend, database } = payload.input
    return { backend, frontend, database }
  },
  softwareversion: () => {
    return ({
      backend: 'String',
      frontend: 'String',
      database: 'String'
    })
  },

  DBstatus: queryDBstatus,
  MQTTServerstatus: queryMQTTServerstatus,

  roomprices: queryRoomPrice,
  createroomprice: createRoomPrice,
  updateroomprice: updateRoomPrice,
  deleteroomprice: deletRoomPrice,

  roomByid: queryRoomByid,
  rooms: queryRoom,
  createRoom: createRoom,
  updateRoom: updateRoom,
  deleteRoom: deleteRoom,

  BuildingByid: queryBuildingByid,
  Buildings: queryBuilding,
  createBuilding: createBuilding,
  updateBuilding: updateBuilding,
  deleteBuilding: deleteBuilding,

  FloorByid: queryFloorByid,
  Floors: queryFloor,
  createFloor: createFloor,
  updateFloor: updateFloor,
  deleteFloor: deleteFloor,

  MemberByid: queryMemberByid,
  Members: queryMembers,
  createMember: createMember,
  updateMember: updateMember,
  deleteMember: deleteMember,

  MeterRoomByid: queryMeterRoomByid,
  MeterRooms: queryMeterRooms,
  createMeterRoom: createMeterRoom,
  updateMeterRoom: updateMeterRoom,
  deleteMeterRoom: deleteMeterRoom,

  PortmeterByid: queryPortmeterByid,
  Portmeters: queryPortmeters,
  createPortmeter: createPortmeter,
  updatePortmeter: updatePortmeter,
  deletePortmeter: deletePortmeter,


  NoteByid : queryNoteByid,
  Notes: queryNotes,
  createNote : createNote,
  updateNote : updateNote,
  deleteNote : deleteNote,



};

module.exports = {
  schema: schema,
  rootValue: rootValue
}

