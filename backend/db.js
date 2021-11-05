const mongoose = require ('mongoose')
const {dbname} = require('./config/config')


const  _readyState  = ()=>{return mongoose.connection.readyState}


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }


const _mongodb_initial = () => {

        mongoose
        .connect(`mongodb://localhost:27017/${dbname}`, options)
        .catch((error) => console.log("connect MongoDB...", error))
        const db = mongoose.connection
        db.on("connecting", function () {
          console.log("connecting to MongoDB...")
        })
        db.on("connected", function () {
          console.log("MongoDB connected!")
        //   mongoose.connection.db.listCollections().toArray(function (err, names) {
        //     console.log(names); // [{ name: 'dbname.myCollection' }]
        //     module.exports.Collection = names;
        // });

        })
        db.once("open", function () {
          console.log("MongoDB connection opened!")
        })
        db.on("error", function (error) {
          try {
            console.error("Error in MongoDb connection: " + error)
          //   client_local.publish(
          //     TOPIC_STATUS,
          //     JSON.stringify({
          //       status: 417,
          //       message: error,
          //     }),
          //   )
            mongoose.disconnect()
          } catch (error) {
            console.log('error from db.on("error")', error)
          }
        })
        db.on("reconnected", function () {
          try {
            console.log("MongoDB reconnected!")
          //   client_local.publish(
          //     TOPIC_STATUS,
          //     JSON.stringify({
          //       status: 200,
          //       message: "Database has been reconnected",
          //     }),
          //   )
          } catch (error) {
            console.log('error from db.on("reconnected")', error)
          }
        })
        db.on("disconnected", function () {
          try {
            console.log("MongoDB disconnected!")
          //   client_local.publish(
          //     TOPIC_STATUS,
          //     JSON.stringify({
          //       status: 404,
          //       message: "Database has been disconnected",
          //     }),
          //   )
          } catch (error) {
            console.log('error from db.on("disconnected")', error)
          }
        })
  

}


  exports.mongodb_initial = _mongodb_initial
  exports.readyState = _readyState