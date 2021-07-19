const mongoose = require("mongoose")
const bcrypt   = require('bcrypt');


const schemaDefinition = new mongoose.Schema({

    local            : {
        username     : String,
        tel          : String,
        level        : String,
        email        : String,
        password     : String,
        lock_user    : String,
        reset_password : String 
    },
   

})

// generating a hash
schemaDefinition.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
schemaDefinition.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = {
    User: mongoose.model("User", schemaDefinition)
}
