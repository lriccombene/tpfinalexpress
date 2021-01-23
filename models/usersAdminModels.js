var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var usersAdminSchema = new Schema({
    name:{
			type:String,
			required:true,
			trim:true
		 },
	user:{
			type:String,
			required:true,
			trim:true
		 },
	password:{
			type:String,
			required:true
		 }
});
usersAdminSchema.pre("save",function(next){
	this.password = bcrypt.hashSync(this.password,10);
	next();
})

module.exports = mongoose.model('usersAdmin', usersAdminSchema);
