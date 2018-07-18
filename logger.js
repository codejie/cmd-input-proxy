'use strict'

const Poplar = require('poplar-logger');

const defaultLogger = new Poplar({
    level: 'info',
    pretty: true
});

const Logger = {
    logger: null,
    init (logger) {
        if (logger === undefined) {
            this.logger = defaultLogger;
        } else {
            this.logger = logger;
        }

        const methods = ['trace', 'debug', 'info', 'error', 'fatal', 'child'];
        for (let i = 0; i < methods.length; ++ i) {
            this[methods[i]] = (this.logger ? this.logger[methods[i]].bind(this.logger) : () => {});
        }

    }



}

module.exports = Logger;