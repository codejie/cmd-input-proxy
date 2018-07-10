'use strict'

const Logger = require('../logger');
const CmdParser = require('./cmd-parser');

const END_FLAG = '\r\n';
const Prompt = '\n>';

let Index_Conn = 0;

class Conn {
    constructor (conn) {
        this.conn = conn;
        this.index = (++ Index_Conn);

        this.headers = [];
        this.buffer = null;

        this.initEvents();
    }

    initEvents () {
        this.conn.on('data', buf => {
            Logger.trace('data - ', buf);
            console.log('buf = ', buf);
            if (!this.buffer) {
                this.buffer = Buffer.from(buf);
            } else {
                this.buffer = Buffer.concat([this.buffer, buf]);
            }
            const pos = this.buffer.indexOf(END_FLAG);
            if (pos !== -1) {
                this.onCmdBuffer(this.buffer.slice(0, pos));
                if (pos === this.buffer.length - 2) {
                    this.buffer = null;
                } else {
                    this.buffer = Buffer.from(this.buffer, pos + 2);
                }
            }
        });
        this.conn.on('close', had_error => {
            Logger.info('conn close - %d', this.index);
        });
        this.conn.on('end', () => {
            Logger.info('conn end - %d', this.index);
        });

        this.outputPrompt();
    }

    outputPrompt () {
        this.conn.write(Prompt);
    }

    outputResult (result) {
        this.conn.write(result);
        this.outputPrompt();
    }

    headers () {
        return headers;
    }

    header (header, value) {
        this.headers.push({
            tag: header,
            value: vallue
        });
    }

    onCmdBuffer (buffer) {
        Logger.trace('recv - ', buffer.toString('utf8'));
        let ret = null;
        try {
            CmdParser.parse(this, buffer)
                .then(result => {
                    ret =  JSON.stringify(result);
                    this.outputResult(ret);
                })
                .catch(err => {
                    ret = err.message;
                    this.outputResult(ret);
                });
        } catch (err) {
            ret = err.message;
            this.outputResult(ret);
        }
        // this.outputResult(ret);
    }

}

module.exports = Conn;