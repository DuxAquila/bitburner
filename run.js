function Portopen(ns) {
	var popen = 0;
	if (ns.fileExists('BruteSSH.exe') == true) {
		ns.brutessh(Server[i]);
		popen++
	};
	if (ns.fileExists('FTPCrack.exe') == true) {
		ns.ftpcrack(Server[i]);
		popen++
	};
	if (ns.fileExists('relaySMTP.exe') == true) {
		ns.relaysmtp(Server[i]);
		popen++
	};
	if (ns.fileExists('HTTPWorm.exe') == true) {
		ns.httpworm(Server[i]);
		popen++
	};
	if (ns.fileExists('SQLInject.exe') == true) {
		ns.sqlinject(Server[i]);
		popen++
	};
	return popen;

}

function ServerScript(ns, host) {
	var ram = ns.getServerRam(host);
	var ScriptRam = ns.getScriptRam("hack.js");
	var treads = ram[0] / ScriptRam;
	ns.exec("hack.js", host, treads, );

}

export async function main(ns) {
	var Server = String(ns.read('serverlist.txt'));
	Server = Server.replace(/ /g, '');
	Server = Server.split(",");
	var i = 0;

	while (true) {
		if (i < Server.length) {

			await ns.scp("hack.js", Server[i]);
			var popen = 0;
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
				if (ns.hasRootAccess(Server[i]) == false) {
					popen = Portopen(ns)
					if (ns.getServerNumPortsRequired(Server[i]) <= popen) {
						await ns.nuke(Server[i]);
						ServerScript(ns, Server[i]);
					};
				} else {
						ServerScript(ns, Server[i]);
				};
			}
			i++;
		} else {
			break;
		}
	}
}
