import { ServerScript } from "utils.js";
/** @param {NS} ns */
export async function main(ns) {

	const args = ns.flags([
		['help', false],
		['start', false],
		['stop', false],
		['buy', false],
		['del', false]
	]);
	const targetname = args._[0];
	const servername = args._[1];

	var target = (!targetname) ? "n00dles" : targetname;
	var host = ns.getPurchasedServers();
	var i = 0;
	var b = 0;
	var hn = (!servername) ? "Player.Server-" :servername + '-';
	var ram = 8192;
	if (host.length == 0) {
		var host = ['0'];
	}

	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Ziel angeben das gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} <target> <Options>`);
		ns.tprintf("===== Optionen =====");
		ns.tprintf(" --start: Startet die Server");
		ns.tprintf(` --stop: Stoppt die Server`);
		ns.tprintf(` --buy: kauft Server <hostname> `);
		ns.tprintf(` --del: löscht die Server`);
		return;
	}

	while (i < host.length) {
		if (args.start && host[0] != 0) {
			ns.killall(host[i]);
			await ServerScript(ns, host[i], target)
		} else if (args.stop && host[0] != 0) {
			ns.killall(host[i]);
		} else if (args.del && host[0] != 0) {
			await ns.killall(host[i]);
			ns.deleteServer(host[i]);
		} else if (args.buy) {
			for (b = 1; b <= ns.getPurchasedServerLimit() ; ++b) {
				var hostname = hn + b;
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
				ns.tprintf(`Sie haben einen keine Server`);
				ns.tprintf("nutzen sie ");
				ns.tprintf(`>>>>>> run ${ns.getScriptName()} <target> --buy <ServerName> <<<<<<`)
				ns.tprintf("um das Script zu nutzen");
				return;
			} else {
				ns.tprintf("Sie haben einen falschen Parameter angegeben");
				ns.tprintf("nutzen sie ");
				ns.tprintf(" --start: Startet die Server");
				ns.tprintf(` --stop: Stoppt die Server`);
				ns.tprintf(` --buy: kauft Server`);
				ns.tprintf(` --del: löscht die Server`);
				ns.tprintf("um das Script zu nutzen");
				return;
			}
		}
		++i
	}
}
