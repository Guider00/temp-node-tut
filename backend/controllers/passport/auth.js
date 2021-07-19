


const passport = require('passport');
const { localauth } = require('./passport')  // passport methode application 
localauth(passport)


const session  = require('express-session');

const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');



const isLogin  = (req, res, next) => {
    if(req.isAuthenticated()){
     //   console.log(`${req.method} ${req.originalUrl}`)

      //  console.log('Authenticated')
      if(req.method === 'GET' && req.originalUrl === '/zung_dbv01/isLogin'){
        res.json({redirect:null,message:"OK",error:null})
       }
     }else{
       
       if(req.method === 'GET' && req.originalUrl === '/zung_dbv01/isLogin'){
        res.json({redirect:"/Login",message:"Not Authenticated",error:"Not Authenticated"})
       }else if(req.method === 'GET' && req.originalUrl === '/login'){


       }else if(req.method === 'POST' && req.originalUrl === '/Logout'){

       }else{
       // console.log(`${req.method} ${req.originalUrl}`)
       // console.log('Not Authenticated')
        res.status(401)
       }
      
     }
     next()
}



router.use(session({
    genid: (req) => uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }, //  1 year Age cookie // setting time cookie 
    secret: 'P@ssw0rdzungzenysystemn@kub', // session secret
    resave: true,
    saveUninitialized: true
  }));
router.use(passport.initialize());
router.use(passport.session()); 
router.use('/graphql1548',isLogin)


module.exports ={
    router_auth : router
}


