const mongoose =  require('mongoose')

const Schema = mongoose.Schema
const userScheme = new Schema({
firstName:String,
lastName:String,    
password: String,
passwordConfirm:String,
email:String,
phoneNumber:Number,

})
module.exports  = mongoose.model( 'user', userScheme,'users')

