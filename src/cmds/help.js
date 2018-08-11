'use strict'

const Base = require('./base');

class Help extends Base {
    handle (conn, args) {
        return new Promise((resolve, reject) => {
            const cmds = this.parser.commands;
            if (Object.keys(args).length === 0) {
                let ret = {};
                for (let cmd in cmds) {
                    const handler = cmds[cmd].handler;
                    ret[cmd] = {
                        title: cmds[cmd].title,
                        usage: (handler.usage ? handler.usage() : 'no usage info')
                    }
                }
                resolve(ret);
            } else {
                const cmd = this.parser.commands[args.cmd];
                if (cmd) {
                    resolve(cmd.handler.usage());
                } else {
                    reject('unknown command -' + cmd);
                }
            }
        });
    }

    usage (args) {
        return {
            info: 'show commands or usage of command',
            usage: 'help[,cmd=<command>]'
        };
    }
}

module.exports = Help;