function Portopen(ns, host) {
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

function ServerScript(ns, host) {
	var ram = ns.getServerRam(host);
	if (ram != 0) {
		var ScriptRam = ns.getScriptRam("hack.js");
		var treads = ram[0] / ScriptRam;
		ns.killall(host)
		ns.exec("hack.js", host, treads,);

	} else {
		ns.printf("======================================")
		ns.printf("== Server " + host + " hat 0GB RAM ==" )
		ns.printf("======================================")
		return 0;
	}

}

export async function main(ns) {

	ns.disableLog("disableLog");
	ns.disableLog("fileExists");
	ns.disableLog("brutessh");
	ns.disableLog("ftpcrack");
	ns.disableLog("relaysmtp");
	ns.disableLog("httpworm");
	ns.disableLog("sqlinject");
	ns.disableLog("getServerRam");
	ns.disableLog("getScriptRam");
	ns.disableLog("getServerRequiredHackingLevel");
	ns.disableLog("getHackingLevel");
	ns.disableLog("hasRootAccess");
	ns.disableLog("getServerNumPortsRequired");
	ns.disableLog("nuke");
	ns.disableLog("scp");
	ns.disableLog("killall");
	ns.disableLog("exec");

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
					popen = Portopen(ns, Server[i])
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
