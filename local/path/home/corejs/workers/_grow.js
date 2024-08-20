// servers/home/corejs/workers/_grow.js
async function main(ns) {
  let id = ns.args[0];
  let hostname = ns.args[1];
  let start = ns.args[2];
  let target = ns.args[3];
  let expectedValue = ns.args[4];
  await ns.sleep(start - Date.now());
  let res = await ns.grow(target);
  let executionTime = Date.now() - start;
}
export {
  main
};
