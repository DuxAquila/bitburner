import { ServerScript } from "utils.js";
/** @param {NS} ns */
export async function main(ns) {
	var host = ns.getPurchasedServers();
	var i = 0;
	var b = 0;
	var hn = "own-";
	var ram = 8192;
	if (host.length == 0) {
		var host = ['0'];
	}

	const args = ns.flags([['help', false]]);
	const actionname = args._[0];
	const targetname = args._[1];
	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Ziel angeben das gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
		return;
	}
	var action = (!actionname) ? "start" : actionname;
	var target = (!targetname) ? "n00dles" : targetname;

	while (i < host.length) {
		if (action == "start" && host[0] != 0) {
			ns.killall(host[i]);
			await ServerScript(ns, host[i], target)
		} else if (action == "stop" && host[0] != 0) {
			ns.killall(host[i]);
		} else if (action == "del" && host[0] != 0) {
			await ns.killall(host[i]);
			ns.deleteServer(host[i]);
		} else if (action == "buy") {
			ns.tprintf("Stop?");
			for (b = 1; b <= 25; ++b) {
				var hostname = hn + b;
				ns.tprintf(hostname);
				if (!ns.serverExists(hostname)) {
					var Cost = ns.getPurchasedServerCost(ram);
					var Money = ns.getServerMoneyAvailable("home");
					if (Cost <= Money) {
						ns.purchaseServer(hostname, ram);
						await ServerScript(ns, hostname, target)
					}
				}
			}
		} else {
			if (host[0] == 0) {
				var ausgabe = (action == "del") ? "lösch" : action;
				ns.tprintf(`Sie haben einen keine Server um sie zu ${ausgabe}en`);
				ns.tprintf("nutzen sie ");
				ns.tprintf(`>>>>>> run ${ns.getScriptName()} buy (optional) n00dles <<<<<<`)
				ns.tprintf("um das Script zu nutzen");
				return;
			} else {
				ns.tprintf("Sie haben einen falschen Parameter angegeben");
				ns.tprintf("nutzen sie ");
				ns.tprintf(`>>>>>> run ${ns.getScriptName()} <start/stop/del> (optional) n00dles <<<<<<`)
				ns.tprintf("um das Script zu nutzen");
				return;
			}
		}
		++i
	}
}
