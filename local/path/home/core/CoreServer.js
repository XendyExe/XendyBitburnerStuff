var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// react:react
var require_react = __commonJS({
  "react:react"(exports, module) {
    module.exports = React;
  }
});

// react:react-dom
var require_react_dom = __commonJS({
  "react:react-dom"(exports, module) {
    module.exports = ReactDOM;
  }
});

// servers/home/core/gui.tsx
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// servers/home/core/icons/StrawberrySVG.tsx
var React2 = __toESM(require_react());
var StrawberryIconSVGComponent = (props) => /* @__PURE__ */ React2.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 54,
    height: 54,
    "aria-hidden": "true",
    className: "iconify iconify--noto",
    viewBox: "0 0 128 128",
    ...props
  },
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#ff2a23",
      d: "M73.13 16.43c-.58-.58-17.72-.37-17.72-.37L16.14 59.68s-1.37 12.84-.11 18.22c.71 3.03 2.16 8.48 6.56 14.95 3.01 4.43 5.37 6.35 5.37 6.35l23.44 10.13 39.19 4.03 22.95-14.89s1.71-6.84 1.1-11.84c-.61-5.01-1.59-8.79-1.47-12.09.12-3.3 2.08-16.55-1.02-26.04-2.74-8.38-10.82-19.99-20.95-25.97s-18.07-6.1-18.07-6.1z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#dc0d27",
      d: "M67.15 116.99c5.55 1.35 16.32 6.28 20.96 6.99 4.8.73 11.63.8 18.87-4.69 6.46-4.9 9.44-9.88 9.8-14.1.51-5.91-.52-11.14-.84-13.64-.31-2.5-1.72-7.94-1.72-7.94s-4.01 8.88-9.02 13.05-17.1 9.7-29.09 10.11c-11.99.42-20.02.73-28.47-1.36s-22.8-9.51-22.8-9.51 5.04 7.5 14.88 13.05c7.43 4.19 11.9 5.26 14.91 5.94 4.68 1.07 8.24 1.05 12.52 2.1zM35.87 33.05S15.34 63.72 15.15 68.83c-.21 5.84 1 9.32 1 9.32s4.17-.15 8.24-2.77c1.89-1.21 3.31-2.42 3.31-2.42s5.79 8.11 7.66 8.21 6.85-3.5 9.04-6.1c2.19-2.61 3.65-7.41 3.65-7.41s3.38 1.53 10.47 1.32 9.27-.84 9.79-1.36c.52-.52 1.22-3.81 1.84-6.42.63-2.61.69-6.33.69-7.9 0-1.56-.44-3.94-.44-3.94s5.59-2.65 8.2-5.16c2.61-2.5 3.86-3.75 4.28-4.59.42-.83-1.15-4.9-2.92-7.61s-4.17-4.59-4.17-4.59 3.55-2.82 5.01-4.38 3.36-3.99 3.36-3.99-3.04-1.33-6.69-2.16c-3.65-.83-10.95-1.77-10.95-1.77L35.87 33.05z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#759937",
      d: "M19.32 52.84c-.29.2-9.08 13.97-9.18 15.23-.1 1.27-.31 3.31 1.07 4 .98.49 1.76-.39 2.44-.98s2.05-1.46 3.61-2.25 4.24-1.32 6.15-2.44c2.83-1.66 5.37-5.66 5.37-5.66l6.93 9.96-2.47 6.14s1.74 2.09 2.09 2.35c.63.47 4.39-2.34 6.34-7.32s2.44-11.33 2.44-11.33 3.91 2.73 7.72 3.52c3.81.78 11.61.39 12.11-.2.44-.52.7-7.96.31-11.28-.39-3.32-2.22-7.71-2.22-7.71s3.96.63 8.65-.64 8.2-4 8.4-5.08-2.68-3.82-2.68-3.82l-11.58-4.09-1.4-3.49s5.92-1.74 9.01-5.4c2.23-2.65 6.23-6.01 6.23-7.58s-2.52-1.21-2.52-1.21l-21.48 8.59-35.34 30.69z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#98b715",
      d: "M29.77 26.42c6.31-5.8 12.68-10.56 22.95-13.23 10.23-2.66 17.37-1.35 19.03-1.05 1.66.29 6.66 1.2 6.27 1.73-.17.23-3.82 1.96-7.44 4.3s-5.14 3.1-6.05 3.61c-1.36.76-3.32 1.81-3.24 3.03.12 1.66 2.36 1.76 4.8 3.03 2.44 1.27 5.47 3.22 7.72 5.18s3.38 2.74 3.69 3.51c.34.84-7.01 4.79-11.99 4.69s-7.32-2.34-8.5-.59c-1.17 1.76 2.54 6.15 3.52 11.04s.98 9.77.98 9.77-7.48.56-10.94-.69c-5.21-1.88-5.86-5.89-8.69-5.37-3.83.7-.41 7.29-3.1 15.16-2.4 7.04-4.44 7.58-4.44 7.58s-3.31-3.41-4.49-5.27-2.53-2.82-2.82-6.82c-.29-4 .2-9.08-1.76-9.28s-2.44 3.91-4.69 5.96-5.66 3.13-7.23 4.39c-1.56 1.27-3.18 3.53-3.18 3.53s-1.12-6.75 1.91-15.83 8.02-19.49 17.69-28.38z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#98b715",
      d: "M17.95 7.09c.25-.93 4.52-3.52 6.57-3.42s1.64.68 1.93 1.46-1.17 8.2 1.17 12.5c2.11 3.87 4 5.76 8.2 5.66s-5.27 12.4-5.27 12.4-8.11-4.49-11.33-12.79-1.66-14.35-1.27-15.81z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#ffebca",
      d: "M101.21 85.18c-1.85.09-3.55 2.61-2.58 6.03.8 2.83 2.83 3.88 4.31 3.69 1.48-.18 2.83-2.46 2.28-5.66-.43-2.43-1.55-4.18-4.01-4.06zM98.75 57.07c-2.53.65-2.28 3.97-1.72 5.78.55 1.81 2.09 3.02 3.75 2.69s2.65-2.96 2.21-4.97c-.42-2.02-1.9-4.1-4.24-3.5zM85.4 33.62c-1.84 1.6-1.05 4.18.55 5.91 1.6 1.72 3.69 2.15 5.05 1.11s.92-4.68-.68-6.21c-1.6-1.54-3.51-2.04-4.92-.81zM76.46 54.55c-1.46 1.31-1.18 4.16.46 6.14 1.64 1.98 4.13 3.1 5.38 1.45 1.25-1.65.33-4.88-.98-6.6-1.32-1.72-3.62-2.11-4.86-.99z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#fffeff",
      d: "M76.48 58.39c1.65.99 3.85-2.49 2.18-3.66-1.8-1.27-4.25 2.42-2.18 3.66z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#ffebca",
      d: "M76.88 79.24c-1.35 1.68-.29 4.13.95 5.61 1.43 1.7 4.7 2.77 6.19 1.32 1.73-1.68.95-4.6-1.29-6.62-1.69-1.52-4.49-2.02-5.85-.31zM78.94 104.01c-.58 2.09.3 4.04 4.18 4.68 3.38.55 5.11-1.05 5.05-2.77-.04-1.17-1.35-3.14-4.55-3.69-2.57-.45-4.19 0-4.68 1.78zM52.85 95.83c-1.31 1.96.3 4.67 1.91 5.91 1.84 1.42 4.92 1.11 5.72-.62.8-1.72-.18-4.06-2.09-5.41-1.91-1.36-4.43-1.54-5.54.12zM31.87 83.83c-2.42 2.02-.67 5.06.86 6.21 1.72 1.29 3.88 2.21 5.78.55s.06-5.11-1.11-6.15c-1.16-1.04-3.68-2.15-5.53-.61z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#fffffe",
      d: "M33.6 83.88c-1.63-.31-3.51 2.89-1.48 4.06 1.89 1.09 3.75-3.63 1.48-4.06z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#ffebca",
      d: "M55.68 74.23c-1.28 1.93-.06 4.92 1.54 5.97s4.06 1.78 5.54-.12c1.48-1.91.62-4.37-1.11-5.78-1.72-1.42-4.61-2.1-5.97-.07z"
    }
  ),
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      fill: "#fff",
      d: "M57.9 73.74c-1.11-.12-1.78 1.05-1.97 2.15-.18 1.11.12 2.21 1.29 2.46s1.85-1.48 1.91-2.15c.06-.68-.06-2.34-1.23-2.46z"
    }
  )
);
var StrawberrySVG_default = StrawberryIconSVGComponent;

// servers/home/core/Constants.tsx
var STATES = {
  PREP: "prep",
  GROW: "grow",
  HACK: "hack"
};
var CONTENT_BACKGROUND_COLOR = "#1A1C24";
var TRINARY_BACKGROUND_COLOR = "#25293b";

// servers/home/core/gui.tsx
var CoreComponent = class extends import_react.Component {
  gui;
  constructor() {
    super({});
    this.setState({
      initialized: false,
      containerWidth: 0
    });
  }
  initalize(gui) {
    this.gui = gui;
    this.setState({ initialized: true });
  }
  createHeader() {
    let scroll = Date.now() % 1e4;
    return /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "fixed",
      height: "64px",
      width: "100%",
      backgroundImage: "linear-gradient(#1A1C24, #633543)",
      zIndex: "1000000000000"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
      overflow: "hidden",
      height: "64px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center"
    } }, /* @__PURE__ */ import_react.default.createElement("span", null, StrawberrySVG_default({ style: {
      transform: `rotate(${Math.round(Math.sin(Date.now() / 3e3) * 20 + 20)}deg)`,
      filter: "drop-shadow(-5px 5px 5px #ff7aa222)",
      marginLeft: "16px"
    } })), /* @__PURE__ */ import_react.default.createElement("span", { style: {
      overflow: "hidden",
      whiteSpace: "nowrap"
    } }, "I have this really cool header i don't know what to put here.")), /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "relative",
      width: "100%",
      height: "4px",
      background: "white"
    } }));
  }
  renderContent() {
    return /* @__PURE__ */ import_react.default.createElement("div", null, this.createHeader(), /* @__PURE__ */ import_react.default.createElement("div", { style: {
      paddingTop: "64px",
      marginLeft: "16px",
      marginRight: "16px"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
      width: "100%",
      background: CONTENT_BACKGROUND_COLOR,
      borderRadius: "16px",
      marginTop: "16px"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
      paddingTop: "16px",
      paddingBottom: "16px",
      fontSize: "30px",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    } }, "Servers"), /* @__PURE__ */ import_react.default.createElement("div", { style: {
      padding: "16px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    } }, ...servers.map((server) => server.element())))), "Frame time: ", this.gui.avgFrameTime.toFixed(4), "ms.");
  }
  renderOverview() {
    return /* @__PURE__ */ import_react.default.createElement("div", null, "Overview... ", this.gui.rootContainer.offsetWidth);
  }
  render() {
    if (!this.state || !this.state.initialized) {
      return /* @__PURE__ */ import_react.default.createElement("div", null, "Not initalized...");
    }
    if (this.state.containerWidth >= 450) return this.renderContent();
    else return this.renderOverview();
  }
};
var CoreGUI = class {
  rootContainer;
  component;
  componentElement;
  componentRef;
  frameTime;
  avgFrameTime;
  lastWidth;
  constructor(container) {
    this.rootContainer = container;
    import_react_dom.default.unmountComponentAtNode(this.rootContainer);
    this.componentRef = (0, import_react.createRef)();
    this.componentElement = (0, import_react.createElement)(CoreComponent, { ref: this.componentRef });
    import_react_dom.default.render(this.componentElement, this.rootContainer);
    this.component = this.componentRef.current;
    this.component.initalize(this);
    this.avgFrameTime = 0;
  }
  tick(frametime) {
    this.frameTime = frametime;
    this.avgFrameTime = this.frameTime * 0.01 + this.avgFrameTime * 0.99;
    let width = this.rootContainer.offsetWidth;
    this.component.setState({ containerWidth: width });
  }
  cleanup() {
    import_react_dom.default.unmountComponentAtNode(this.rootContainer);
  }
};
var _document = eval("document");
async function initGUI() {
  ns.disableLog("ALL");
  ns.tail();
  ns.clearLog();
  _document.querySelectorAll("#CoreGUIRoot").forEach((elm) => elm.parentElement.removeChild(elm));
  const UI_ID = "Hook" + Math.floor(Date.now());
  const HookNode = import_react.default.createElement("div", {
    id: UI_ID
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

// servers/home/core/utils.tsx
function xound(num, places) {
  let rounder = Math.pow(10, places);
  return Math.round(num * rounder) / rounder;
}

// servers/home/core.ts
var ns;
var servers = [];
var player;

// servers/home/core/CoreServer.tsx
var import_react3 = __toESM(require_react());

// servers/home/core/Bar.tsx
var import_react2 = __toESM(require_react());
function BarElement(data, index) {
  return /* @__PURE__ */ import_react2.default.createElement("div", { style: {
    marginTop: `-${index * 16}px`,
    height: "16px",
    background: data.color,
    borderRadius: "8px",
    transform: `translateX(-${(1 - data.value) * 100}%)`,
    transition: "transform 0.5s ease-out"
  } });
}
function Bar(baseColor, text, data) {
  return /* @__PURE__ */ import_react2.default.createElement("div", { style: {
    top: "-4px",
    margin: "8px",
    fontSize: "24px",
    background: baseColor,
    width: "calc(100% - 16px)",
    height: "16px",
    borderRadius: "8px",
    overflow: "hidden"
  } }, ...data.map((d) => BarElement(d, data.indexOf(d))), /* @__PURE__ */ import_react2.default.createElement("span", { style: {
    top: "-27px",
    marginLeft: "5px",
    fontSize: "13px",
    color: "#000000",
    position: "relative"
  } }, text));
}

// servers/home/core/icons/LockSVG.tsx
var React5 = __toESM(require_react());
var LockSVG = (props) => /* @__PURE__ */ React5.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32,
    fill: "#e8eaed",
    viewBox: "0 -960 960 960",
    ...props
  },
  /* @__PURE__ */ React5.createElement("path", { d: "M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" })
);
var LockSVG_default = LockSVG;

// servers/home/core/CoreServer.tsx
var CoreServer = class {
  server;
  baseDifficulty;
  hostname;
  ip;
  maxRam;
  minDifficulty;
  moneyMax;
  numOpenPortsRequired;
  organizationName;
  purchasedByPlayer;
  requiredHackingSkill;
  serverGrowth;
  tasks;
  unallocatedRam;
  sim;
  state;
  prepping;
  timeOffset;
  refreshTick;
  constructor(server) {
    this.server = server;
    this.baseDifficulty = this.server.baseDifficulty;
    this.hostname = this.server.hostname;
    this.ip = this.server.ip;
    this.maxRam = this.hostname == "home" ? this.server.maxRam - 256 : this.server.maxRam;
    this.minDifficulty = this.server.minDifficulty;
    this.moneyMax = this.server.moneyMax;
    this.numOpenPortsRequired = this.server.numOpenPortsRequired;
    this.organizationName = this.server.organizationName;
    this.purchasedByPlayer = this.server.purchasedByPlayer;
    this.requiredHackingSkill = this.server.requiredHackingSkill;
    this.serverGrowth = this.server.serverGrowth;
    this.refreshSim();
    this.tasks = /* @__PURE__ */ new Map();
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
    if (s.requiredHackingSkill > p.skills.hacking) w = -1e14;
    let weight = s.moneyMax / s.minDifficulty;
    if (ns.fileExists("Formulas.exe"))
      weight = s.moneyMax / ns.formulas.hacking.weakenTime(s, p) * ns.formulas.hacking.hackChance(s, p);
    else if (s.requiredHackingSkill > p.skills.hacking / 2)
      w = -1e14;
    return weight + w;
  }
  refresh(attribute) {
    if (!this.refreshTick) {
      this.refreshTick = true;
    }
    if (attribute !== void 0) return this.server[attribute];
  }
  get backdoorInstalled() {
    return this.server.backdoorInstalled;
  }
  get cpuCores() {
    return this.server.cpuCores;
  }
  get hackDifficulty() {
    return this.server.hackDifficulty;
  }
  get hasAdminRights() {
    return this.server.hasAdminRights;
  }
  get isConnectedTo() {
    return this.server.isConnectedTo;
  }
  get moneyAvailable() {
    return this.server.moneyAvailable;
  }
  get openPortCount() {
    return this.server.openPortCount;
  }
  get ramUsed() {
    return this.server.ramUsed;
  }
  get smtpPortOpen() {
    return this.server.smtpPortOpen;
  }
  get sqlPortOpen() {
    return this.server.sqlPortOpen;
  }
  get sshPortOpen() {
    return this.server.sshPortOpen;
  }
  get ftpPortOpen() {
    return this.server.ftpPortOpen;
  }
  get httpPortOpen() {
    return this.server.httpPortOpen;
  }
  get ramAvailable() {
    return this.maxRam - this.ramUsed;
  }
  element(flags) {
    flags = flags ?? [];
    let heightpx = 48;
    const renderRam = !flags.includes("noram") && this.maxRam > 0;
    const renderMoney = !flags.includes("nomoney") && this.moneyMax > 0;
    heightpx += (+renderRam + +renderMoney) * 16;
    let height = heightpx + "px";
    return /* @__PURE__ */ import_react3.default.createElement("div", { id: this.hostname + "_coreelm" }, /* @__PURE__ */ import_react3.default.createElement("div", { style: {
      "width": "350px",
      "height": height,
      opacity: this.hasAdminRights ? "0" : "1",
      background: "#000000aa",
      zIndex: "1000",
      position: "absolute",
      "borderRadius": "16px",
      "padding": "4px",
      "margin": "4px"
    } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      filter: "drop-shadow(0px 0px 5px #00000088)"
    } }, LockSVG_default({}), /* @__PURE__ */ import_react3.default.createElement("span", null, "Requires ", this.requiredHackingSkill, " hacking level! (", Math.round(player.skills.hacking / this.requiredHackingSkill * 100), "%)"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: {
      "width": "350px",
      "height": height,
      "background": TRINARY_BACKGROUND_COLOR,
      "borderRadius": "16px",
      "padding": "4px",
      "margin": "4px"
    } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { margin: "8px", fontSize: "24px" } }, this.hostname), /* @__PURE__ */ import_react3.default.createElement("div", { style: {
      position: "relative",
      fontSize: "10px"
    } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: {
      top: "0",
      right: "0",
      padding: "5px",
      marginTop: "-32px",
      textAlign: "right"
    } }, "Tasks: ", Object.keys(this.tasks).length, /* @__PURE__ */ import_react3.default.createElement("br", null), "Security: ", xound(this.hackDifficulty, 2), "/", this.minDifficulty)), renderRam ? Bar("#DD3D48", `${xound(this.ramAvailable, 2)}/${xound(this.unallocatedRam, 2)}/${this.maxRam} GB Ram`, [
      { color: "#4288EF", value: this.unallocatedRam / this.maxRam },
      { color: "#9AE6CB", value: this.ramUsed / this.maxRam }
    ]) : /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null), renderMoney ? Bar("#DD3D48", `$${xound(this.moneyAvailable, 2)}/$${this.moneyMax}`, [
      { color: "#9AE6CB", value: this.moneyAvailable / this.moneyMax }
    ]) : /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null)));
  }
};
export {
  CoreServer
};
