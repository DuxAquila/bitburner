import { Portopen, ServerScript } from "utils.js";

export async function main(ns) {

	const args = ns.flags([
		['help', false],
		['start', true],
		['stop', false]
	]);
	const targetname = args._[0];

	ns.disableLog("ALL");
	ns.enableLog("tprintf");

	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Host angeben der gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
		ns.tprintf(`===== OPTIONEN ======`);
		ns.tprintf(`--start: Startet alle Server (default)`);
		ns.tprintf(`--stop: Stoppt alle Server`);
		return;
	}

	var target = (!targetname) ? "n00dles" : targetname;
	var Server = String(ns.read('serverlist.txt'));
	Server = Server.replace(/ /g, '');
	Server = Server.split(",");
	var host = ns.getPurchasedServers();
	var i = 0;
	var z = 0;

	for (z = 0; z < host.length; z++) {
		if (args.start) {
			ns.killall(host[z]);
			await ServerScript(ns, host[z], target)
		} 
		if (args.stop) {
			ns.killall(host[z]);
		}
	}

	for (i = 0; i < Server.length; i++) {
		var popen = 0;
		if (args.start) {
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
				if (ns.hasRootAccess(Server[i]) == false) {
					popen = Portopen(ns, Server[i])
					if (ns.getServerNumPortsRequired(Server[i]) <= popen) {
						await ns.nuke(Server[i]);
						await ServerScript(ns, Server[i], target);
					};
				} else {
					await ServerScript(ns, Server[i], target);
				};
			}
		}
		if (args.stop) {
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
				if (ns.scriptRunning("hack.js", Server[i]) == true) {
					ns.killall(Server[i]);
				}
			}

		}
	}
}
