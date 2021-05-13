var express=require('express');
//створюємо проект
var app=express();
//папка для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname));
var User=require('./user');
//опрацювання кореневого шляху -віддати клієнту index.html
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var fs=require('fs');
app.get('/getusers',function(req,res){
    User.find(function(err,data){
        console.log(data);
        res.send(data);
    })
})
app.post('/adduser',function(req,res){
    console.log(req.body);
    var user=new User(req.body);
    user.save(function(err,data){
        if(err) console.log(err.message);
        console.log(data);
        res.send('add user!');
    })
})
app.post('/updateuser',function(req,res){
    console.log(req.body);

    User.findOneAndUpdate({_id:req.body.id},{username:req.body.username,userage:req.body.userage}, {new:true}, function(error, resultData) {
        if(error)
            res.json(error);
        else
        {
            res.send('User update')
        }
    });
})


app.post('/deleteuser',function(req,res){
    console.log(req.body);
    User.remove({_id:req.body.id},function(err,data){
        res.send('remove user');
    })
})


//порт прослуховування для сервера
//автоматичний підбір для віддаленого сервера,
//або 8080 для localhost
app.listen(process.env.PORT||8080);
//повідомлення про запуск сервера
console.log('Run server!');
