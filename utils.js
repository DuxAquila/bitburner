/** @param {NS} ns */
export async function ServerScript(ns, host, target) {
	var ram = (!ns.getServerRam(host)) ? 0 : ns.getServerRam(host);
	if (ram[0] != 0) {
		var ScriptRam = ns.getScriptRam("hack.js");
		var treads = Math.floor(ram[0] / ScriptRam);
		await ns.scp("hack.js", host);
		ns.killall(host)
		ns.exec("hack.js", host, treads, target);
		return 1;

	} else {
		ns.printf("======================================");
		ns.printf("== Server " + host + " hat 0GB RAM ==");
		ns.printf("======================================");
		return 0;
	}

}

export function Portopen(ns, host) {
	var popen = 0;
	if (ns.fileExists('BruteSSH.exe') == true) {
		ns.brutessh(host);
		popen++
	};
	if (ns.fileExists('FTPCrack.exe') == true) {
		ns.ftpcrack(host);
		popen++
	};
	if (ns.fileExists('relaySMTP.exe') == true) {
		ns.relaysmtp(host);
		popen++
	};
	if (ns.fileExists('HTTPWorm.exe') == true) {
		ns.httpworm(host);
		popen++
	};
	if (ns.fileExists('SQLInject.exe') == true) {
		ns.sqlinject(host);
		popen++
	};
	return popen;

}
