/** @param {NS} ns */
export async function main(ns) {
	var host = ns.getPurchasedServers();
	var i = 0;
	while (i < host.length) {
		await ns.killall(host[i]);
		ns.deleteServer(host[i]);
		ns.printf("Server " + host[i] + " gelöscht")
		++i
	}
}
