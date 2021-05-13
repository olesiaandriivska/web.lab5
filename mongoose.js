var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.rosym.mongodb.net/test');
console.log("mongodb connect...")
module.exports=mongoose;
