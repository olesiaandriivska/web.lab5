$(document).ready(function(){
    function createTable(element,mas){
        $(element).empty();
        console.log(mas);
        $('.add').show();
        $('.update').hide();
        $('<table>')
            .addClass("table table-bordered table-primary col-6")
            .appendTo(element);
        for(var i=0;i<mas.length;i++){
            $('<tr>').addClass('tr').appendTo('.table');
            for(var key in mas[i]){
                $('<td>').addClass('td')
                    .appendTo('.tr:last').text(mas[i][key]);
            }
            $('.tr:last .td:first').hide();
            $('<td>').appendTo('.tr:last');
            $('<button>').text('Delete').addClass('btn btn-danger')
                .appendTo('td:last').click(function(){
                var id=$(this).parent().parent().find('td:first').text();
                console.log(id);
                deleteUser(id);
            });

            $('.tr:last .td:first').hide();
            $('<td>').appendTo('.tr:last');
            $('<button>').text('Update').addClass('btn btn-danger')
                .appendTo('td:last').click(function(){
                var id=$(this).parent().parent().find('td:first').text();
                var name=$(this).parent().parent().find('td:eq(1)').text();
                var age=$(this).parent().parent().find('td:eq(2)').text();
                console.log(id);
                btnUpdate(id, name, age);
            });


        }
    }

    function addUser(name,age){
        if(!name||!age) return;
        var obj={
            username:name,
            userage:age
        };
        $.post('/adduser',obj,function(data){
            console.log(data);
            getUsers();
        })
    }


    $('.add').click(function(){
        var name=$('.name').val();
        var age=$('.age').val();
        $('.name').val("");
        $('.age').val("");
        addUser(name,age);
    });

    function getUsers(){
        $.get('/getusers',function(data){
            createTable('#table', data);
        })
    }


    function deleteUser(id) {
        var obj = {id: id};
        $.post('/deleteuser', obj, function (data) {
            console.log(data);
            getUsers();
        })
    }

    function btnUpdate(id, currentName, currentAge) {
        $('.add').hide();
        $('.update').show();
        $('.name').val(currentName);
        $('.age').val(currentAge);
        $('.update').click(function(){
            var name=$('.name').val();
            var age=$('.age').val();
            $('.name').val("");
            $('.age').val("");
            updateUser(id,name,age);
        });

    }

    function updateUser(id,name,age){
        if(!name||!age) return;
        var obj={
            id:id,
            username:name,
            userage:age
        };
        $.post('/updateuser',obj,function(data){
            console.log(data);
            getUsers();
        })
    }



    getUsers();

});
