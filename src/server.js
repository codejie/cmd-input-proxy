'use strict'

const Net = require('net');

const CmdParser = require('./cmd-parser');
const Conn = require('./conn');

class Server {
    constructor (opts) {
        this.options = opts;
        this.connections = [];

        CmdParser.init(require('../cmds.json').cmds);
    }

    start () {
        this.server = Net.createServer(conn => {
            console.log('connect - ', conn);
            this.connections.push(new Conn(conn));
        });

        this.server.listen(this.options.port, (err) => {
            if (err) {
                console.log('err - ', err);
                return;
            }
            console.log('started.');
        });
    }
};

module.exports = Server;