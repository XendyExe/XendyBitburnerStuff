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

// servers/home/core/Bar.tsx
var import_react = __toESM(require_react());
function BarElement(data, index) {
  return /* @__PURE__ */ import_react.default.createElement("div", { style: {
    marginTop: `-${index * 16}px`,
    height: "16px",
    background: data.color,
    borderRadius: "8px",
    transform: `translateX(-${(1 - data.value) * 100}%)`,
    transition: "transform 0.5s ease-out"
  } });
}
function Bar(baseColor, text, data) {
  return /* @__PURE__ */ import_react.default.createElement("div", { style: {
    top: "-4px",
    margin: "8px",
    fontSize: "24px",
    background: baseColor,
    width: "calc(100% - 16px)",
    height: "16px",
    borderRadius: "8px",
    overflow: "hidden"
  } }, ...data.map((d) => BarElement(d, data.indexOf(d))), /* @__PURE__ */ import_react.default.createElement("span", { style: {
    top: "-27px",
    marginLeft: "5px",
    fontSize: "13px",
    color: "#000000",
    position: "relative"
  } }, text));
}
export {
  Bar
};
