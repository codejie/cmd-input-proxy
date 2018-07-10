'use strict'

const Server = require('./src/server');

const opts = {
    port: 3000,

};

const server = new Server(opts);

server.start();