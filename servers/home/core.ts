import { Player } from "@/NetscriptDefinitions";
import { CoreServer } from "./core/CoreServer";
import { CoreGUI, initGUI } from "./core/gui";
import { scan } from "./core/utils";
export let ns: NS;

export const servers: CoreServer[] = [];
export let player: Player;

const FRAME_TIME_MAX = 16.66666666;
export async function main(NETSCRIPT_API: NS) {
    servers.length = 0;
    ns = NETSCRIPT_API;
    ns.ps()
    for (let script of ns.ps()) {
        if (script.filename == "core.js" && script.pid != ns.pid && ns.kill(script.pid)) ns.tprint("Killed previous core instance.")
    }
    player = ns.getPlayer();
    const coreGUI: CoreGUI = await initGUI();
    scan().forEach(hostname=>servers.push(new CoreServer(ns.getServer(hostname))));
    servers.sort((a, b) => b.getWeight() - a.getWeight());
    ns.atExit(() => {
        coreGUI.cleanup();
    });
    let perf = performance.now();
    let frameTime = 0;
    let eep = FRAME_TIME_MAX;
    while (await ns.sleep(eep)) {
        perf = performance.now();

        player = ns.getPlayer();
        servers.forEach(s=>s.pretick());
        coreGUI.tick(frameTime);
        servers.forEach(s=>s.tick());

        frameTime = performance.now() - perf;
        eep = FRAME_TIME_MAX - frameTime;
        if (eep < 0) {
            ns.toast("Lagspike! Eeping for " + eep + "ms.");
            eep = 0.01;
        }
    }
}