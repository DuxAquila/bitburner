import { ServerScript } from "utils.js";
/** @param {NS} ns */
export async function main(ns) {
	var host = ns.getPurchasedServers();
	var i = 0;
	const args = ns.flags([['help', false]]);
	const targetname = args._[0];
	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Ziel angeben das gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
		return;
	}
	var target = (!targetname) ? "n00dles" : targetname;
	while (i < host.length){
		ns.killall(host[i]);
		await ServerScript(ns, host[i], target)
		++i
	}
}
