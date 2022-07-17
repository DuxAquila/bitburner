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
	var action = (!args.stop) ? "start" : "stop";
	var Server = String(ns.read('serverlist.txt'));
	Server = Server.replace(/ /g, '');
	Server = Server.split(",");
	var host = ns.getPurchasedServers();
	var i = 0;
	var z = 0;
	var count = 0;

	for (z = 0; z < host.length; z++) {
		if (args.start) {
			ns.killall(host[z]);
			await ServerScript(ns, host[z], target)
			count++
		}
		if (args.stop) {
			ns.killall(host[z]);
			count++
		}
	}

	for (i = 0; i < Server.length; i++) {
		var popen = 0;
		var output = 0;
		if (args.start && !args.stop) {
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel()) {
				if (ns.hasRootAccess(Server[i]) == false) {
					popen = Portopen(ns, Server[i])
					if (ns.getServerNumPortsRequired(Server[i]) <= popen) {
						await ns.nuke(Server[i]);
						output = await ServerScript(ns, Server[i], target);
					if (output == 1){
						count++
					}
					};
				} else {
					output = await ServerScript(ns, Server[i], target);
					if (output == 1){
						count++
					}
				};
			}
		}
		if (args.stop) {
			var ram = (!ns.getServerRam(Server[i])) ? 0 : ns.getServerRam(Server[i]);
			var dump = Server[i];
			if (ns.getServerRequiredHackingLevel(Server[i]) <= ns.getHackingLevel(Server[i])) {
				if (ram[1] != 0) {
					count++
				}
			}

		}
	}
	
	if (count >= 0) {
		var ausgabe = (action == "start") ? "gestartet" : "gestopt";
		ns.tprintf(`Script hat erfolgreich ${count} Server ${ausgabe}`)
	}

}
