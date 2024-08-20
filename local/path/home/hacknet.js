// servers/home/hacknet.js
var MULTIPLYER = 100;
function calculateMoneyGainRate(level, ram, cores, mult) {
  const gainPerLevel = 1.5;
  const levelMult = level * gainPerLevel;
  const ramMult = Math.pow(1.035, ram - 1);
  const coresMult = (cores + 5) / 6;
  return levelMult * ramMult * coresMult * mult * 1;
}
function calculateBestBuyNode(ns2, index) {
  let stats = ns2.hacknet.getNodeStats(0);
  const mult = ns2.getPlayer().mults.hacknet_node_money;
  let ram = Math.log2(stats.ram);
  let currentProd = calculateMoneyGainRate(stats.level, stats.ram, stats.cores, mult);
  let ramUpgradeProd = calculateMoneyGainRate(stats.level, Math.pow(2, ram + 1), stats.cores, mult) - currentProd;
  let levelUpgradeProd = calculateMoneyGainRate(stats.level + 1, stats.ram, stats.cores, mult) - currentProd;
  let coreUpgradeProd = calculateMoneyGainRate(stats.level, stats.ram, stats.cores + 1, mult) - currentProd;
  let ramWorth = ramUpgradeProd / ns2.hacknet.getRamUpgradeCost(index);
  let levelWorth = levelUpgradeProd / ns2.hacknet.getLevelUpgradeCost(index);
  let coreWorth = coreUpgradeProd / ns2.hacknet.getCoreUpgradeCost(index);
  if (ramWorth > levelWorth && ramWorth > coreWorth) return ["ram", ramWorth];
  else if (levelWorth > coreWorth) return ["level", levelWorth];
  else return ["core", coreWorth];
}
async function waitForMoney(m) {
  while (ns.getPlayer().money < m && await ns.sleep(1e3)) {
    if (ns.getPlayer().money > m) break;
  }
}
var ns;
async function main(_ns) {
  ns = _ns;
  while (await ns.sleep(10)) {
    let bestIndex = -1;
    let bestAction = "buy";
    let bestWorth = calculateMoneyGainRate(50, 2, 1, ns.getPlayer().mults.hacknet_node_money) / ns.hacknet.getPurchaseNodeCost();
    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      let result = calculateBestBuyNode(ns, i);
      if (result[1] > bestWorth) {
        bestIndex = i;
        bestAction = result[0];
        bestWorth = result[1];
      }
    }
    if (bestAction == "buy") {
      let moneyNeeded = ns.hacknet.getPurchaseNodeCost() * MULTIPLYER;
      await waitForMoney(moneyNeeded);
      ns.hacknet.purchaseNode();
      ns.tprint("Purchaced new hacknet node.");
    } else {
      if (bestAction == "ram") {
        let moneyNeeded = ns.hacknet.getRamUpgradeCost(bestIndex) * MULTIPLYER;
        await waitForMoney(moneyNeeded);
        ns.hacknet.upgradeRam(bestIndex);
        ns.tprint("Upgraded ram for node " + bestIndex);
      } else if (bestAction == "level") {
        let moneyNeeded = ns.hacknet.getLevelUpgradeCost(bestIndex) * MULTIPLYER;
        await waitForMoney(moneyNeeded);
        ns.hacknet.upgradeLevel(bestIndex);
        ns.tprint("Upgraded node " + bestIndex);
      } else {
        let moneyNeeded = ns.hacknet.getCoreUpgradeCost(bestIndex) * MULTIPLYER;
        await waitForMoney(moneyNeeded);
        ns.hacknet.upgradeCore(bestIndex);
        ns.tprint("Upgraded cpu for node " + bestIndex);
      }
    }
  }
}
export {
  main
};
