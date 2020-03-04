//Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desonectado del servidor');
});

socket.on('estadoActual', function(data) {
    label.text(data.ultimoTicket);
});


$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});