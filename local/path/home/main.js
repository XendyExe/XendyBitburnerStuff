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
var CoreComponent = class extends import_react.Component {
  constructor() {
    super({});
  }
  render() {
    return /* @__PURE__ */ import_react.default.createElement("div", null, "Hello world from tsx!");
  }
};
var CoreGUI = class {
  rootContainer;
  component;
  componentElement;
  componentRef;
  constructor(container) {
    this.rootContainer = container;
    this.componentRef = (0, import_react.createRef)();
    this.componentElement = (0, import_react.createElement)(CoreComponent, { ref: this.componentRef });
    import_react_dom.default.render(this.componentElement, this.rootContainer);
    this.component = this.componentRef.current;
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
  _document.querySelectorAll("#StrawberryCoreGUIRoot").forEach((elm) => elm.parentElement.removeChild(elm));
  const UI_ID = "StrawberryHook" + Math.floor(Date.now());
  const HookNode = import_react.default.createElement("div", {
    id: UI_ID
  }, "");
  ns.printRaw(HookNode);
  await ns.sleep(100);
  const hook_node = _document.getElementById(UI_ID);
  const hook_root = hook_node.parentElement.parentElement.parentElement;
  const container = _document.createElement("div");
  container.style.width = "100%";
  container.style.height = "calc(100% - 33px)";
  container.style.overflowX = "scroll";
  container.style.overflowY = "scroll";
  container.style.position = "fixed";
  container.style.background = "#000000";
  container.style.fontFamily = "Lexend";
  container.style.color = "#FFFFFF";
  container.id = "StrawberryCoreGUIRoot";
  hook_root.prepend(container);
  return new CoreGUI(container);
}

// servers/home/main.ts
var ns;
async function main(NETSCRIPT_API) {
  ns = NETSCRIPT_API;
  ns.ps();
  for (let script of ns.ps()) {
    if (script.filename == "main.js" && script.pid != ns.pid && ns.kill(script.pid)) ns.tprint("Killed previous core instance.");
  }
  const coreGUI = await initGUI();
  ns.atExit(() => {
    coreGUI.cleanup();
  });
  while (await ns.sleep(10)) {
  }
}
export {
  main,
  ns
};
