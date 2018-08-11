'use strict'

const Base = require('./base');

class Exit extends Base {
    constructor () {
        super();
    }

    handle (conn, args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                conn.close();
            }, 500);
            resolve('disconnect - ' + conn.index);
        });
    }

    usage (conn, args) {
        return {
            info: 'exit connection.',
            usage: 'exit'
        }
    }
}

module.exports = Exit;