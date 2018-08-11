'use strict'

const Logger = require('../logger');

const SPLIT_FLAG = ',';

const CmdParser = {
    commands: {},
    init: function (cmds) {
        for (let i = 0; i < cmds.length; ++ i) {
            const cmd = cmds[i];
            cmd.handler = new (require(cmd.handler))();
            if (cmd.parserRequried) {
                cmd.handler.parser(this);
            }
            this.commands[cmd.title] = cmd;
        }
    },

    parse: function (conn, line) {
        // const line = buffer.toString('utf8');
        // Logger.trace('line = ', line);
        const items = line.split(SPLIT_FLAG);
        Logger.trace('items = ', items);

        // check cmd
        const title = items[0].trim();
        if (!this.commands[title]) {
            throw new Error('unknown command - ' + title);
        }

        const cmd = {
            title: title,
            args: {}
        };

        for (let i = 1; i < items.length; ++ i) {
            const pos = items[i].indexOf('=');
            if (pos > 0) {
                cmd.args[items[i].substr(0, pos).trim()] = items[i].substr(pos + 1).trim();
            } else {
                throw new Error('argument format wrong.');
            }
        }
        Logger.trace('cmd = ', cmd);

        // check required 
        return this.exec(conn, cmd);
    },

    exec: function (conn, cmd) {
        const handler = this.commands[cmd.title].handler;

        return new Promise((resolve, reject) => {
            handler.handle(conn, cmd.args)
                .then(result => {
                    resolve(result);
                    // {
                    //     code: 0,
                    //     result: result
                    // });
                })
                .catch(err => {
                    reject(err);
                    // reject({
                    //     code: -1,
                    //     message: ((err instanceof Error) ? err.message : err)
                    // });
                });
        });
    },

    addCmd: function (cmd) {
        this.commands[cmd.title] = cmd;        
    }
}


module.exports = CmdParser; 