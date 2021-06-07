const express = require('express');
const cors = require('cors')

const { graphqlHTTP } = require('express-graphql');

const { mongodb_initial } = require('./db')

const {schema , rootValue} = require('./controllers/graphql/schema')


mongodb_initial()

const app = express();
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);

app.listen(4000);