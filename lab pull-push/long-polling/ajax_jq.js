
divcontent = document.getElementById('content');
load_btn= document.getElementById('load_data');

function dopolling(lastmodified){

    $.ajax({
        url: "http://localhost:3000/mycv",
        method: "GET",
        data: {
            message: 'hi',
            lastModified : lastmodified
        },
        success: function(data){
            data_received = data;
            divcontent.innerHTML += `<pre>${data_received.data}</pre>`;
            divcontent.innerHTML+= '<hr style="color: red"> ';
            dopolling(data_received.server_time);
        },
        error: function(){

            divcontent.innerHTML += `<h1 style="color: red">error getting data</h1>`;
            dopolling(0);
        }

    });
};

dopolling(0);




