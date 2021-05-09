var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin123@admin.mkwkv.mongodb.net/test');
console.log("mongodb connect...")
module.exports=mongoose;