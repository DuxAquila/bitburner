/** @param {NS} ns */
import { ServerScript } from "utils.js";

export async function main(ns) {
	var ram = 8192;
	var hn = "own-";
	var i = 1;
	const args = ns.flags([['help', false]]);
	const targetname = args._[0];
	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Ziel angeben das gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
		return;
	}
	var target = (!targetname) ? "n00dles" : targetname;

	for (i = 1; i <= 3; ++i) {
		var host = hn + i;
		ns.purchaseServer(host, ram);
		await ServerScript(ns, host, target)


	}

}
