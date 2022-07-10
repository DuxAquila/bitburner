/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const hostname = args._[0];

	ns.disableLog("disableLog");
	ns.disableLog("getServerMaxMoney");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMoneyAvailable");
	if (args.help) {
		ns.tprintf("===== Hilfe =====");
		ns.tprintf(" Sie können ein Host angeben der gehackt werden soll");
		ns.tprintf(`> run ${ns.getScriptName()} n00dles`);
		return;
	}

	var target = (!hostname) ? "n00dles" : hostname;
	var money = ns.getServerMaxMoney(target) * 0.75;
	var Security = ns.getServerMinSecurityLevel(target) + 5;

	while (true) {
		if (ns.getServerSecurityLevel(target) >= Security) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) <= money) {
			await ns.grow(target);
		}
	}

}
