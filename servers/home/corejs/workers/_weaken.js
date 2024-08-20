/** @param {NS} ns */
export async function main(ns) {
    let id = ns.args[0];
    let hostname = ns.args[1];
    let start = ns.args[2];

    let target = ns.args[3];
    let expectedValue = ns.args[4];
    await ns.sleep(start - Date.now());
    let res = await ns.weaken(target);
    let executionTime = Date.now() - start;
    // ns.tprint(`[${id}] Weakened ${target} by ${res} (Expected: ${expectedValue}). Ended at ${ns.tFormat(executionTime)}`);
}