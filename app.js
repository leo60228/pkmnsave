#!/usr/bin/env node

var argv = require('yargs')
	.usage('Usage: $0 <command> [options]')
	.command('checksum', 'Fix the checksum after modifications')
	.demand(1)
	.example('$0 checksum -f edited.sav', 'Fix the checksum of edited.sav')
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
		var calcChecksum = require('./calculateChecksum.js');
		console.log(calcChecksum(new Uint8Array(fs.readFileSync(argv.file))));
		break;
	default:
		console.log('Invalid checksum!');
		break;
}
