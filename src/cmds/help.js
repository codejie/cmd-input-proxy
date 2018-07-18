'use strict'

const Base = require('./base');

class Help extends Base {
    constructor () {
        super();
    }

    handle (conn, args) {
        return new Promise((resolve, reject) => {
            if (Object.keys(args).length === 0) {
                resolve(this.usage(args));
            } else {
                resolve('ok');
            }
        });
    }

    usage (args) {
        return 'show this info.';
    }
}

module.exports = Help;