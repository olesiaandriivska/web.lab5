$(document).ready(function(){
    function createTable(container, data){
        var key;
        var mas = JSON.parse(data);
        var table = document.getElementById(container);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css';
        document.head.appendChild(link);

        table.classList.add("./style");

        var thead = $('<thead>').appendTo(table);
        var tr = $('<tr>').appendTo(thead);
        for(key in mas[0]){

            var th = $('<th>').appendTo(tr);
            $(th).text(key);
        }

        var tbody = $('<tbody>').appendTo(table);
        for(var i = 0; i < mas.length; i++){
            var row = $("<tr>");
            for(key in mas[i]){
                var td = $('<td>').appendTo(row);
                $(td).text(mas[i][key]);
            }
            row.appendTo(tbody);
        }
    }

    function getUsers(){
        $.get('/getusers',function(data){
            createTable('table', data);
        })
    }


    getUsers();
})
