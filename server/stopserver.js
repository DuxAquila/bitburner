import { ServerScript } from "utils.js";
/** @param {NS} ns */
export async function main(ns) {
	var host = ns.getPurchasedServers();
	var i = 0;
	while (i < host.length){
		ns.killall(host[i]);
		++i
	}
}
