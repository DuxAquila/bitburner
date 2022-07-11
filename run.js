import { Portopen, ServerScript } from "utils.js";

export async function main(ns) {

	const args = ns.flags([['help', false]]);
	const targetname = args._[0];


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

	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Host angeben der gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
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
		ns.killall(host[z]);
		await ServerScript(ns, host[z], target)
	}

	for (i = 0; i < Server.length; i++) {
		var popen = 0;
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

}
