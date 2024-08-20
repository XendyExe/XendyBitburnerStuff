import { Server } from "@/NetscriptDefinitions";
import { ns } from "../core";
export function scan(): string[] {
    let hostnames = [];
    const recursiveScan = (host) => {
        hostnames.push(host);
        ns.scan(host).filter(elm => !hostnames.includes(elm)).forEach((elm) => {recursiveScan(elm);});
    }
    recursiveScan("home");
    return hostnames;
}

export function hackServer(server: Server): boolean {
    if (server.hasAdminRights) return true;
    if (server.requiredHackingSkill > ns.getHackingLevel()) return false;

    let possibleOpenPorts = +ns.fileExists("BruteSSH.exe") + +ns.fileExists("relaySMTP.exe") + +ns.fileExists("FTPCrack.exe") + +ns.fileExists("HTTPWorm.exe") + +ns.fileExists("SQLInject.exe");
    if (server.numOpenPortsRequired > possibleOpenPorts) return false;
    if (!server.sshPortOpen && ns.fileExists("BruteSSH.exe")) ns.brutessh(server.hostname);
    if (!server.ftpPortOpen && ns.fileExists("ftpcrack.exe")) ns.ftpcrack(server.hostname);
    if (!server.smtpPortOpen && ns.fileExists("relaySMTP.exe")) ns.relaysmtp(server.hostname);
    if (!server.httpPortOpen && ns.fileExists("httpworm.exe")) ns.httpworm(server.hostname);
    if (!server.sqlPortOpen && ns.fileExists("sqlinject.exe")) ns.sqlinject(server.hostname);
    ns.nuke(server.hostname)
    if (server.hasAdminRights) {
        ns.toast(`Successfully hacked new server "${server.hostname}"`, "success");
    }
    else {
        ns.toast(`Failed to hack new server "${server.hostname}"`, "error")
    }
    return server.hasAdminRights;
}

export function xound(num: number, places: number) {
    let rounder = Math.pow(10, places);
    return Math.round(num * rounder)/rounder;
}