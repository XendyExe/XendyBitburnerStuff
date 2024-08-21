import { Server } from "@/NetscriptDefinitions";
import { ns, player } from "../core";
import { START_SCRIPT_TIME, STATES, TRINARY_BACKGROUND_COLOR } from "./Constants";
import { Task } from "./batcher/Task";
import { hackServer, xound } from "./utils";
import React from "react";
import { Bar } from "./Bar";
import LockSVG from "./icons/LockSVG";

export class CoreServer {
    private server: Server;
    readonly baseDifficulty: number;
    readonly hostname: string;
    readonly ip: string;
    readonly minDifficulty: number;
    readonly moneyMax: number;
    readonly numOpenPortsRequired: number;
    readonly organizationName: string;
    readonly purchasedByPlayer: boolean;
    readonly requiredHackingSkill: number;
    readonly serverGrowth: number;
    readonly tasks: Map<number, Task>;
    unallocatedRam: number;

    sim: Server;
    state: string;
    prepping: boolean;
    timeOffset: number;
    refreshTick: boolean;
    constructor(server: Server) {
        this.server = server;

        this.baseDifficulty = this.server.baseDifficulty;
        this.hostname = this.server.hostname;
        this.ip = this.server.ip;
        this.minDifficulty = this.server.minDifficulty;
        this.moneyMax = this.server.moneyMax;
        this.numOpenPortsRequired = this.server.numOpenPortsRequired

        this.organizationName = this.server.organizationName;
        this.purchasedByPlayer = this.server.purchasedByPlayer;
        this.requiredHackingSkill = this.server.requiredHackingSkill;
        this.serverGrowth = this.server.serverGrowth;

        this.refreshSim();

        this.tasks = new Map();
        this.refreshTick = false;

        this.unallocatedRam = 0;
    }

    refreshSim() {
        this.sim = ns.getServer(this.hostname);
        this.state = STATES.PREP;
        if (this.hackDifficulty <= this.minDifficulty) {
            if (this.moneyAvailable >= this.moneyMax) this.state = STATES.HACK;
            else this.state = STATES.GROW;
        }
        this.prepping = false;
        this.timeOffset = -1;
    }

    pretick() {
        this.server = ns.getServer(this.hostname);
    }

    tick() {

    }

    getWeight() {
        let s = ns.getServer(this.hostname);
        let p = ns.getPlayer();
        s.hackDifficulty = s.minDifficulty;
        let w = 0;
        if (s.requiredHackingSkill > p.skills.hacking) w = -100000000000000;
        let weight = s.moneyMax / s.minDifficulty;
        if (ns.fileExists('Formulas.exe'))
            weight = s.moneyMax / ns.formulas.hacking.weakenTime(s, p) * ns.formulas.hacking.hackChance(s, p);
        else if (s.requiredHackingSkill > p.skills.hacking / 2)
            w = -100000000000000
        return weight + w;
    }

    refresh(attribute) {
        if (!this.refreshTick) {
            this.refreshTick = true;
        }
        if (attribute !== undefined) return this.server[attribute];
    }

    get backdoorInstalled(): boolean { return this.server.backdoorInstalled; }
    get cpuCores(): number { return this.server.cpuCores; }
    get hackDifficulty(): number { return this.server.hackDifficulty; }
    get hasAdminRights(): boolean { return this.server.hasAdminRights; }
    get isConnectedTo(): boolean { return this.server.isConnectedTo; }
    get moneyAvailable(): number { return this.server.moneyAvailable; }
    get openPortCount(): number { return this.server.openPortCount; }
    get ramUsed(): number { return this.server.ramUsed; }
    get smtpPortOpen(): boolean { return this.server.smtpPortOpen; }
    get sqlPortOpen(): boolean { return this.server.sqlPortOpen; }
    get sshPortOpen(): boolean { return this.server.sshPortOpen; }
    get ftpPortOpen(): boolean { return this.server.ftpPortOpen; }
    get httpPortOpen(): boolean { return this.server.httpPortOpen; }
    get maxRam(): number { return this.hostname == "home" ? this.server.maxRam - 256 : this.server.maxRam; }

    get ramAvailable() { return this.maxRam - this.ramUsed; }

    element(flags?: string[]): React.ReactNode {
        flags = flags ?? [];
        let heightpx = 48;
        const renderRam = !flags.includes("noram") && this.maxRam > 0;
        const renderMoney = !flags.includes("nomoney") && this.moneyMax > 0;
        heightpx += (+renderRam + +renderMoney) * 16;
        let height = heightpx + "px";
        return <div id={this.hostname + "_coreelm"}>
            <div style={{
                "width": "350px",
                "height": height,
                opacity: this.hasAdminRights ? "0" : "1",
                background: "#000000aa",
                zIndex: "1000",
                position: "absolute",
                "borderRadius": "16px",
                "padding": "4px",
                "margin": "4px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    filter: "drop-shadow(0px 0px 5px #00000088)"
                }}>
                    {LockSVG({})}
                    <span>Requires {this.requiredHackingSkill} hacking level! ({Math.round((player.skills.hacking/this.requiredHackingSkill) * 100)}%)</span>
                </div>
            </div>
            <div style={{
                "width": "350px",
                "height": height,
                "background": TRINARY_BACKGROUND_COLOR,
                "borderRadius": "16px",
                "padding": "4px",
                "margin": "4px",
            }}>
                <span style={{margin: "8px", fontSize: "24px"}}>{this.hostname}</span>
                <div style={{
                    position: "relative",
                    fontSize: "10px"
                }}>
                    <div style={{
                        top: "0",
                        right: "0",
                        padding: "5px",
                        marginTop: "-32px",
                        textAlign: "right"
                    }}>
                    Tasks: {Object.keys(this.tasks).length}
                    <br/>
                    Security: {xound(this.hackDifficulty, 2)}/{this.minDifficulty} 
                    </div>
                </div>
                {renderRam ? Bar("#DD3D48", `${xound(this.ramAvailable, 2)}/${xound(this.unallocatedRam, 2)}/${this.maxRam} GB Ram`, [
                    {color: "#4288EF", value: this.unallocatedRam/this.maxRam},
                    {color: "#9AE6CB", value: this.ramUsed/this.maxRam}]) : <></>}
                {renderMoney? Bar("#DD3D48", `$${xound(this.moneyAvailable, 2)}/$${this.moneyMax}`, [
                    {color: "#9AE6CB", value: this.moneyAvailable/this.moneyMax}]) : <></>}
                
            </div>
        </div>
    }
}