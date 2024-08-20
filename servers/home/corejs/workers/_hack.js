/** @param {NS} ns */
export async function main(ns) {
    let id = ns.args[0];
    let hostname = ns.args[1];
    let start = ns.args[2];

    let target = ns.args[3];
    await ns.sleep(start - Date.now());
    let res = await ns.hack(target);
    let executionTime = Date.now() - start;
    // if (res != 0) {
    //     ns.tprint(`${Date.now()} // [${id}] ${hostname}: Hacked ${target} by ${res}!`);
    //     ns.toast(`${Date.now()} // [${id}] ${hostname}: Hacked ${target} by ${res}!`, "success");
    // }
    // else {
    //     ns.tprint(`${Date.now()} // [${id}] ${hostname}: Failed to hack ${target}.`);
    //     ns.toast(`${Date.now()} // [${id}] ${hostname}: Failed to hack ${target}.`, "error");
    // }
}