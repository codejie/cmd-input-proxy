'use strict'

const Poplar = require('poplar-logger');

const logger = new Poplar({
    level: 'trace',
    pretty: true
});

module.exports = logger;