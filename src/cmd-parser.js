'use strict'

const Logger = require('../logger');

const SPLIT_FLAG = ',';

const CmdParser = {
    commands: {},
    init: function (cmds) {
        for (let i = 0; i < cmds.length; ++ i) {
            const cmd = cmds[i];
            this.commands[cmd.title] = cmd;
        }
    },

    parse: function (conn, buffer) {
        const line = buffer.toString('utf8');
        Logger.trace('line = ', line);
        const items = line.split(SPLIT_FLAG);
        Logger.trace('items = ', items);

        // check cmd
        if (!this.commands[items[0]]) {
            throw new Error('unknown command.');
        }

        const cmd = {
            title: items[0],
            args: {}
        };

        for (let i = 1; i < items.length; ++ i) {
            const pos = items[i].indexOf('=');
            if (pos > 0) {
                cmd.args[items[i].substr(0, pos)] = items[i].substr(pos + 1);
            } else {
                throw new Error('argument format wrong.');
            }
        }
        Logger.trace('cmd = ', cmd);

        // check required 
        return this.exec(cmd, cmd);
    },

    exec: async function (conn, cmd) {
        return {
            result: 'ok'
        };
    }
}


module.exports = CmdParser; 