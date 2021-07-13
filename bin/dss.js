#!/usr/bin/env node

const http = require('http')
const finalhandler = require('finalhandler')
const debug = require('debug')('dss:boot')
const router = require('../index')

const argv = require('yargs/yargs')(process.argv.slice(2))
  .command('$0 [port]', 'dead-simple signaler', yargs => {
    yargs.positional('port', {
      describe: 'port to bind on',
      type: 'number',
      default: process.env.PORT || 3000
    }).option('verbose', {
      describe: 'display signaling traces for debugging',
      type: 'boolean',
      alias: 'v'
    }).option('debug', {
      describe: 'display debugging traces for all modules',
      type: 'boolean',
      alias: 'd'
    })
  })
  .help()
  .argv

if (argv.verbose) require('debug').enable('dss:*')
if (argv.vv) require('debug').enable('*')

const server = http.createServer((req, res) => router(req, res, finalhandler(req, res)))
const bind = server.listen(argv.port, () => debug(`online @ ${bind.address().port}`))
