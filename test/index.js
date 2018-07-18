'use strict'

const Logger = require('../logger');

const Server = require('../src/server');

const opts = {
    // logger: null,
    port: 3000,

};

const server = new Server(opts);

async function start () {
    await server.init();
    await server.start();
}

// server.start();

start()
    .then(() => {
        Logger.info('succ');
    })
    .catch(err => {
        Logger.error('failed - ', err);
    });

server.addCmd({
    title: 'test',
    handler: {
        handle: (conn, args) => {
            return new Promise((resolve, reject) => {
                resolve('ok');
            });
        }
    }
});