//Comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

var label = $('small');

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(respuesta) {

        if (respuesta === 'No hay tickets') {
            alert(respuesta);
            label.text(respuesta);
            rerturn;
        }

        label.text('Ticket ' + respuesta.numero);

    });

});