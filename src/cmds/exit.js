'use strict'

const Base = require('./base');

class Exit extends Base {
    constructor () {
        super();
    }

    handle (conn, args) {
        conn.close();
    }
}

module.exports = Exit;