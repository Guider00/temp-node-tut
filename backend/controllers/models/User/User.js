const mongoose = require("mongoose")
const bcrypt   = require('bcrypt');


const schemaDefinition = new mongoose.Schema({

        username     : String,
        tel          : String,
        level        : String,
        email        : String,
        password     : String,
        lock_user    : String,
        reset_password : String ,

   

})

schemaDefinition.pre('find', function(next) {
    next();
});

schemaDefinition.pre('save', function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    user.password  =  bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    next();
});

// generating a hash
schemaDefinition.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
schemaDefinition.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = {
    User: mongoose.model("User", schemaDefinition)
}
