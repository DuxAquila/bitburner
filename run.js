function Portopen(ns) {
	var popen = 0;
	if (fileExists('BruteSSH.exe') == true) {
		ns.brutessh(Server[i]);
		popen++
	};
	if (fileExists('FTPCrack.exe') == true) {
		ns.ftpcrack(Server[i]);
		popen++
	};
	if (fileExists('relaySMTP.exe') == true) {
		ns.relaysmtp(Server[i]);
		popen++
	};
	if (fileExists('HTTPWorm.exe') == true) {
		ns.httpworm(Server[i]);
		popen++
	};
	if (fileExists('SQLInject.exe') == true) {
		ns.sqlinject(Server[i]);
		popen++
	};
	return popen;

}

function ServerScript(ns, number, host) {
	var brakepoint = 1;
	var z = 0;
	while (brakepoint != 0) {
		z++
		if (number == 1) {
			brakepoint = ns.exec("weaken.js", host, 2, z);
		} else if (number == 2) {
			brakepoint = ns.exec("grow.js", host, 2, z);
		} else if (number == 3) {
			ns.exec("hack.js", host, 2, z);
			brakepoint = 0;
		} else {
		}
	}
}
export async function main(ns) {
var Server = String(read('serverlist.txt'));
Server = Server.replace(/ /g, '');
Server = Server.split(",");
var i = 0;
var z = 0;
var ScriptId = 0;

File = ["hack.js", "weaken.js", "grow.js"]

while (true) {
	if (i < Server.length) {
		ns.scp(File, Server[i])
		var popen = 0;
		var runid = (ScriptId != 3) ? ScriptId = ScriptId + 1 : ScriptId = 1;
		if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
			if (ns.hasRootAccess(Server[i]) == false) {
				popen = Portopen(ns)
				if (ns.getServerNumPortsRequired(Server[i]) <= popen) {
					await ns.nuke(Server[i]);
					ns.ServerScript(ns, runid, Server[i]);
				};
			} else {
				ServerScript(ns, runid, Server[i]);
			};
		}
		i++;
	} else {
		break;
	}
}
