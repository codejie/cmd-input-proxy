'usr strict'

const Logger = require('../logger');

class InputProcessor {
    constructor (conn) {
        this.conn = conn;

        this.buffer = null;

        this.cmds = [];
        this.cmdIdex = -1;

        this.cmd = '';
    }

    onData (buf) {
        Logger.trace('data - ', buf);
        // if (!this.buffer) {
        //     this.buffer = Buffer.from(buf);
        // } else {
        //     this.buffer = Buffer.concat([this.buffer, buf]);
        // }
        
        if (buf[0] === 27) {
            
        } else if (buf[0] === 13) {
            this.cmds.push(this.cmd);
            this.cmd = '';
        } else if (buf[0] === 127) {

        } else {
            this.cmd += buf;
            this.conn.outputEcho(buf);
        }
        
    }


}

module.exports = InputProcessor;