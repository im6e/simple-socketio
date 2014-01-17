window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var myname = document.getElementById("name");

    var isFirst = false; 
    
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            // for(var i=1; i<messages.length; i++) {
            for(var i=0; i <= parseInt(data.message[1]); i++) {
                //html += messages[i] + '<br />';
              if (!isFirst) {
                html += data.message[0][i] + "Rank <br />";
              }
            }
            content.innerHTML = html;
            isFirst = false;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        //var text = field.value;
        var text = myname.value;
        socket.emit('send', { message: text });
        sendButton.disabled = true;
    };
 
}
