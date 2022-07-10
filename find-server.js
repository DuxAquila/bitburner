function recursiveScan(ns, parent, server, target, route) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        if (child == target) {
            route.unshift(child);
            route.unshift(server);
            return true;
        }

        if (recursiveScan(ns, server, child, target, route)) {
            route.unshift(server);
            return true;
        }
    }
    return false;
}

export async function main(ns) {
    const args = ns.flags([["help", false]]);
    let route = [];
    let server = args._[0];
    if (!server || args.help) {
        ns.tprint("Dieses Skript hilft Dir, einen Server im Netzwerk zu finden, und zeigt Dir den Pfad, um dorthin zu gelangen.");
        ns.tprint(`Anwendung: run ${ns.getScriptName()} SERVER`);
        ns.tprint("Beispiel:");
        ns.tprint(`> run ${ns.getScriptName()} icarus`);
        return;
    }

    recursiveScan(ns, '', 'home', server, route);
    for (const i in route) {
        await ns.sleep(250);
        const extra = i > 0 ? "└ " : "";
        ns.tprint(`${" ".repeat(i)}${extra}${route[i]}`);
    }
}

export function autocomplete(data, args) {
    return data.servers;
}
