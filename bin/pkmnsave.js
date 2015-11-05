#!/usr/bin/env node

var path = require('path');
var cli = path.basename(__filename);

var argv = require('yargs')
	.usage('Usage: ' + cli + ' <command> [options]')
	.command('checksum', 'Fix the checksum after modifications')
	.demand(1)
	.example(cli + ' checksum -f edited.sav', 'Fix the checksum of edited.sav')
	.demand('f')
	.alias('f', 'file')
	.nargs('f', 1)
	.describe('f', 'Choose a file for fixing')
	.help('h')
	.alias('h', 'help')
	.epilog('Copyright 2015 snuggles08')
	.argv;

var fs = require('fs');

switch (argv._[0]) {
	case 'checksum':
		var calcChecksum = require(__dirname + '/../calculateChecksum.js');
		var checksum = calcChecksum(new Uint8Array(fs.readFileSync(argv.file))).buffer[0x0000];

		var fd = fs.openSync(argv.file, 'r+');
		var data = new Buffer([checksum]);
		fs.writeSync(fd, data, 0, 1, 0x3523);
		fs.closeSync(fd);

		break;
	default:
		console.log('Invalid checksum!');
		break;
}
