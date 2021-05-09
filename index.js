const exec = require('child_process').spawn;
const prompt = require('prompt-sync')({sigint: true});
const watch = require('node-watch');
const fs = require('fs');
const md5 = require('md5');
require('log-timestamp');

const LogFile = prompt('Enter enter the path to the ROM Hack please. (No quotes needed) > '); // e.g. D:\SM64Hacks\Gamerio\SG64.z64
console.log(`Watching for changes on ${LogFile}`);

let md5Previous = null;
let fsWait = false;
let md5Chk = false; // check if the file was truly changed and not just updated - takes much longer but also makes every patch be unique | might be inefficient and useless
let vanRom = './Super Mario 64 (U) [!].z64'; // original Rom
let bakDir = './backups'; // backup directory
let modRom = LogFile.split("\\").pop();
watch(LogFile, async (event, filename) => {
	try {
		if (filename) {
			if (md5Chk) {
				if (fsWait) return;
				const md5Current = md5(fs.readFileSync(LogFile));
				if (md5Current === md5Previous) {
					return;
				}
				md5Previous = md5Current;
			}
			console.log(`${filename} file Changed, preparing backup...`);
			let baba = exec('./flips', ['--create', '--bps-linear', vanRom, `${LogFile}`, `./${bakDir}/${modRom}-${Date.now()}.bps`]);
			// 																modify it however you like, usually appears as rom name - unix(?) time.
			fsWait = true;
			baba.on('close', (code) => {
				if (code != 0) {
					console.log(`Flips Error: (${code})`); // 5 probably means "Target ROM Hack or Original ROM not found"
				} else {
					console.log(`Backup complete! (${code})`);
				}
				fsWait = false;
			});
		}
	} catch(err) {
		console.log(`A different program took over the file, probably just you patching the ROM. Not going to backup...`);
	}
});