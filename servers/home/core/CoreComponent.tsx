import React from "react";
import { CoreGUI } from "./gui";

export class CoreComponent {
    readonly gui: CoreGUI;
    readonly name: string;
    constructor(gui: CoreGUI, name: string) {
        this.gui = gui;
        this.name = name;
    }

    init() {}
    tick() {}
    render() {
        return <div>This CoreComponent has no rendering!</div>
    }
}