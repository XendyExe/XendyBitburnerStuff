import React, { Component, ComponentElement, createElement, createRef, DetailedReactHTMLElement, InputHTMLAttributes, Ref, RefObject } from "react";
import ReactDOM from "react-dom";
import { ns, servers } from "../core";
import StrawberryIconSVGComponent from "./icons/StrawberrySVG";
import { transform } from "esbuild";
import { CONTENT_BACKGROUND_COLOR } from "./Constants";
interface CoreComponentStates {
    initialized: boolean;
    containerWidth: number;
  }

export class CoreComponent extends Component<{}, CoreComponentStates>{
    gui: CoreGUI
    constructor() {
        super({});
        this.setState({
            initialized: false,
            containerWidth: 0
        });
    }
    initalize(gui: CoreGUI) {
        this.gui = gui;
        this.setState({initialized: true});
    }

    private createHeader(): React.ReactNode {
        let scroll = Date.now() % 10000; // 
        return <div style={{
            position: "fixed",
            height: "64px",
            width: "100%",
            backgroundImage: "linear-gradient(#1A1C24, #633543)",
            zIndex: "1000000000000"
        }}>
            <div style={{
                overflow: "hidden",
                height: "64px",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center"
            }}>
                <span>{StrawberryIconSVGComponent({style: {
                        transform: `rotate(${Math.round(Math.sin(Date.now()/3000) * 20 + 20)}deg)`,
                        filter: "drop-shadow(-5px 5px 5px #ff7aa222)",
                        marginLeft: "16px"
                    }})}</span>
                <span style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>
                    I have this really cool header i don't know what to put here.
                </span>
            </div>

            <div style={{
                position: "relative",
                width: "100%",
                height: "4px",
                background: "white"
            }}></div>
        </div>
    }
    

    private renderContent(): React.ReactNode {
        return <div>
            {this.createHeader()}
            <div style={{
                paddingTop: "64px",
                marginLeft: "16px",
                marginRight: "16px"
            }}>
                <div style={{
                    width: "100%",
                    background: CONTENT_BACKGROUND_COLOR,
                    borderRadius: "16px",
                    marginTop: "16px"
                }}>
                    <div style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        fontSize: "30px",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                    }}>Servers</div>
                    <div style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {...servers.map(server=>server.element())}
                    </div>
                </div>
            </div>
            Frame time: {this.gui.avgFrameTime.toFixed(4)}ms.
        </div>
    }

    private renderOverview(): React.ReactNode {
        return <div>Overview... {this.gui.rootContainer.offsetWidth}</div>
    }

    render(): React.ReactNode {
        if (!this.state || !this.state.initialized) {
            return <div>Not initalized...</div>
        }
        if (this.state.containerWidth >= 450) return this.renderContent();
        else return this.renderOverview();
    }
}
export class CoreGUI {
    rootContainer: HTMLDivElement;
    component: CoreComponent | null;
    componentElement: DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    componentRef: RefObject<CoreComponent>;
    frameTime: number;
    avgFrameTime: number;

    private lastWidth: number;

    constructor(container: HTMLDivElement) {
        this.rootContainer = container;
        ReactDOM.unmountComponentAtNode(this.rootContainer);
        this.componentRef = createRef<CoreComponent>();
        // @ts-ignore | Typescript complains about ref for some reason.
        this.componentElement = createElement(CoreComponent, { ref: this.componentRef });
        ReactDOM.render(this.componentElement, this.rootContainer);
        this.component = this.componentRef.current;
        this.component.initalize(this);

        this.avgFrameTime = 0;
    }
    tick(frametime: number) {
        this.frameTime = frametime;
        this.avgFrameTime = this.frameTime * 0.01 + this.avgFrameTime * 0.99;
        let width = this.rootContainer.offsetWidth;
        this.component.setState({containerWidth: width});
    }

    cleanup(): void {
        ReactDOM.unmountComponentAtNode(this.rootContainer);
    }
}


const _document: Document = eval("document");
export async function initGUI(): Promise<CoreGUI> {
    ns.disableLog("ALL");
    ns.tail();
    ns.clearLog();

    _document.querySelectorAll("#CoreGUIRoot").forEach(elm=>elm.parentElement.removeChild(elm));
    const UI_ID = "Hook" + Math.floor(Date.now());
    const HookNode = React.createElement("div", {
        id: UI_ID,
    }, "");
    ns.printRaw(HookNode);
    await ns.sleep(100);

    const hook_node = _document.getElementById(UI_ID);
    const hook_root = hook_node.parentElement.parentElement.parentElement;
    const container = _document.createElement("div");
    let styleContainer;
    if (!(styleContainer = _document.getElementById("CoreStyles"))) {
        styleContainer = _document.createElement("style");
        styleContainer.id = "CoreStyles";
        _document.head.appendChild(styleContainer);
    }
    styleContainer.innerHTML = ``;
    
    container.style.width = "100%";
    container.style.height = "calc(100% - 33px)";
    container.style.overflowX = "scroll";
    container.style.overflowY = "scroll";
    container.style.position = "fixed";
    container.style.background = "#000000";
    container.style.fontFamily = "Lexend";
    container.style.color = "#FFFFFF";
    container.id = "CoreGUIRoot";
    hook_root.prepend(container);
    return new CoreGUI(container);
}