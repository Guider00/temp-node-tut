# Project
 This project build for create webapplication local by
 forcus at service apartments for rents 
# before RUN
  you much to install package from online before run application by command 

  npm install 

# npm start 
 Start web application React  Open [http://localhost:3000](http://localhost:3000)
# npm run server 
Start backend service by GRAPHQL
Open [http://localhost:4000](http://localhost:4000)

# Event error after run 
1)  if error at node_modules\jsonschema\lib\validator.js:110 
  Fix by  command  this line 
  // if((typeof schema !== 'boolean' && typeof schema !== 'object') || schema === null){
  //   throw new SchemaError('Expected `schema` to be an object or boolean');
  // }


Hope you enjoy with project