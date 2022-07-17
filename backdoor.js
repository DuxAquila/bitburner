/** @param {NS} ns **/
export async function main(ns) {
    await wormFunc(ns, "home", "");
}
async function wormFunc(ns, serv, oldserv) {
    const SERVERS_TO_SCAN = ns.scan(serv);
    ns.connect(serv);
    for (let CURR_SERV of SERVERS_TO_SCAN) {
        if (CURR_SERV == oldserv) continue;
        await wormFunc(ns, CURR_SERV, serv);
        ns.connect(serv);
    }
    if ((!ns.args[0] || serv == ns.args[0]) 
    && !ns.getServer(serv).backdoorInstalled 
    && ns.hasRootAccess(serv)
    && ns.getServerRequiredHackingLevel(serv) <= ns.getHackingLevel())
        await ns.installBackdoor();
}
