'use strict'

const Net = require('net');

const Logger = require('../logger');

const CmdParser = require('./cmd-parser');
const Conn = require('./conn');

class Server {
    constructor (opts) {
        this.options = opts;
        this.connections = [];

        // CmdParser.init(require('./cmds/cmds.json').cmds);
    }

    addCmd (cmd) {
        CmdParser.addCmd(cmd);
    }

    init () {
        return new Promise((resolve, reject) => {
            try {
                Logger.init(this.options.logger);
                CmdParser.init(require('./cmds/cmds.json').cmds);

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    start () {
        return new Promise((resolve, reject) => {
            this.server = Net.createServer(conn => {
                this.connections.push(new Conn(conn));
            });
            this.server.listen(this.options.port, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(this.options.port);
            });            
        });
    }
};

module.exports = Server;