const express = require('express');



const cors = require('cors')

const { graphqlHTTP } = require('express-graphql');

const  {startApolloServer } =require('./controllers/graphql/schema/Apollo')


const { mongodb_initial } = require('./db')

const { schema, rootValue } = require('./controllers/graphql/schema')

const { mqtt_server_aedes_initial , mqtt_server_mosca_initial  } = require('./MQTT/server')



const  { router_auth }  = require('./controllers/passport/auth')



mqtt_server_mosca_initial(1883, 'zung', 'zeny')
mqtt_server_aedes_initial()

mongodb_initial()

const app = express();
app.use(cors())
app.use('/',router_auth)


let path = require('path')
app.use(express.static(path.join(__dirname, '/public/build')));


app.use(
  '/graphqlexpress',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);

// app.get('*', function(req, res) {
//   res.sendFile('index.html', {root: path.join(__dirname, '/public/build')});
// });

startApolloServer( app )


