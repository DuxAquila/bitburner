import { Portopen, ServerScript } from "utils.js";

export async function main(ns) {

	const args = ns.flags([['help', false]]);
	const actionname = args._[0];
	const targetname = args._[1];


	ns.disableLog("ALL");
    ns.enableLog("tprintf");

	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Host angeben der gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
		return;
	}

	var target = (!targetname) ? "n00dles" : targetname;
	var action = (!actionname) ? "start" : actionname;
	var Server = String(ns.read('serverlist.txt'));
	Server = Server.replace(/ /g, '');
	Server = Server.split(",");
	var host = ns.getPurchasedServers();
	var i = 0;
	var z = 0;
	var count = 0;

	for (z = 0; z < host.length; z++) {
		if (action == "start") {
			ns.killall(host[z]);
			await ServerScript(ns, host[z], target)
			count++
		} else if (action == "stop") {
			count++
			ns.killall(host[z]);
		}
	}

	for (i = 0; i < Server.length; i++) {
		var popen = 0;
		if (action == "start") {
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
				if (ns.hasRootAccess(Server[i]) == false) {
					popen = Portopen(ns, Server[i])
					if (ns.getServerNumPortsRequired(Server[i]) <= popen) {
						await ns.nuke(Server[i]);
						await ServerScript(ns, Server[i], target);
						count++
					};
				} else {
					await ServerScript(ns, Server[i], target);
					count++
				};
			}
		} else if (action == "stop") {
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
				if (ns.scriptRunning("hack.js", Server[i]) == true) {
					ns.killall(Server[i]);
					count++
				}
			}

		} else {
			ns.tprintf("bitte nutzen sie");
			ns.tprintf(`> run ${ns.getScriptName()} <start/stop> n00dles`)
			return;
		}
	}
	if (count >= 0) {
		var ausgabe = (action == "start") ? "gestartet" : "gestopt";
		ns.tprintf(`Script hat erfolgreich ${count} Server ${ausgabe}`)
	}
}
