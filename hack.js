/** @param {NS} ns */
export async function main(ns) {

ns.disableLog("disableLog");
ns.disableLog("getServerMaxMoney");
ns.disableLog("getServerMinSecurityLevel");
ns.disableLog("getServerSecurityLevel");
ns.disableLog("getServerMoneyAvailable");
var target = "n00dles";
var money = ns.getServerMaxMoney(target) * 0.75;
var Security = ns.getServerMinSecurityLevel(target) + 5;

    while (true) {
        if (ns.getServerSecurityLevel(target) >= Security) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) <= money) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
