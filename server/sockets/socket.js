const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);

    });


    let ultimoTicket = ticketControl.getUltimoTicket();
    let ultimos4 = ticketControl.getUltimos4();

    // Emitir envento 'estadoActual'
    client.emit('estadoActual', {
        ultimoTicket: ultimoTicket,
        ultimos4: ultimos4
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'el escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        console.log(atenderTicket);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });




    });


});