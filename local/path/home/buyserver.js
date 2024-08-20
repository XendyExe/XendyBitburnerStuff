/** @param {NS} ns */
export async function main(ns) {
    let name = "Compute";
    for (let i = ns.getPurchasedServers().length; i <= 25; i++) {
        ns.purchaseServer("Provisioning", 2);
    }
    let num = 0;
    let servers = ns.getPurchasedServers().forEach((oldname)=>{
        num += 1;
        let hostname = name + `-${num}`;
        ns.renamePurchasedServer(oldname, hostname);
        ns.upgradePurchasedServer(hostname, Math.pow(2, 9));
    })

}