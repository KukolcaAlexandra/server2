var mongoose = require('mongoose');
const Schema = mongoose.Schema;

//import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	facebookId: String,
});

//AccountSchema.plugin(passportLocalMongoose);

//AccountSchema.virtual('fullname').get(function() {
//	return this.firstname + ' ' + this.lastname;
//});

//export const User = mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);
module.exports = User;