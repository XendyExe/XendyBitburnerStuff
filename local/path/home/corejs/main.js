// servers/home/corejs/main.js
var HACK_RAM_AMOUNT = 1.7;
var UTILITY_RAM_AMOUNT = 1.75;
var SHARE_RAM_AMOUNT = 4;
var ACTION_SEPERATION_TIME = 20;
var BATCH_TIME_DELAY = 0;
var START_TIME_DELAY = 100;
var START_SCRIPT_TIME = 5e3;
var HACK_PERCENTAGE = 0.9;
var HOME_ALLOCATED_RAM = 131e3;
var BASE_BACKGROUND_COLOR = "#000000";
var CONTENT_BACKGROUND_COLOR = "#1A1C24";
var TRINARY_BACKGROUND_COLOR = "#25293b";
var TASK_GUI_WIDTH = 90;
var STATES = {
  PREP: "prep",
  GROW: "grow",
  HACK: "hack"
};
Array.prototype.remove = function(value) {
  const index = this.indexOf(value);
  if (index !== -1) this.splice(index, 1);
  return this;
};
var ns;
var SERVER_LIST = [];
var _window = eval("window");
var _document = _window["document"];
var BATCH_STATE = "";
var BATCH_EXIT = "";
var bitnode = void 0;
async function main(NETSCANAPI) {
  ns = NETSCANAPI;
  ns.disableLog("ALL");
  ns.tail();
  ns.resizeTail(_window.innerWidth / 2, _window.innerHeight / 2);
  ns.setTitle("Botnet");
  _document.querySelectorAll("#StrawberryCoreGUIRoot").forEach((elm) => elm.parentElement.removeChild(elm));
  ns.clearLog();
  try {
    bitnode = ns.getBitNodeMultipliers();
  } catch {
  }
  ;
  ns.toast("Starting botnet!", "success");
  for (let script of ns.ps()) {
    if (script.filename == "main.js" && script.pid != ns.pid && ns.kill(script.pid)) log("Killed previous main.js");
  }
  SERVER_LIST.length = 0;
  updateServerList();
  for (let server of SERVER_LIST) {
    ns.scriptKill("_hack.js", server.hostname);
    ns.scriptKill("_grow.js", server.hostname);
    ns.scriptKill("_weaken.js", server.hostname);
    ns.scriptKill("_share.js", server.hostname);
  }
  log(`Scanned servers! Found ${SERVER_LIST.length} servers initially.`);
  if (ns.args.length > 0) return;
  ns.print("\n" + "=".repeat(TASK_GUI_WIDTH + 8));
  let sim = SERVER_LIST[0].sim;
  ns.print(`Simulation server (${sim.hostname})`);
  ns.print(`Security: ${sim.hackDifficulty}/${sim.minDifficulty} (${Math.round(sim.hackDifficulty / sim.moneyMax * 100)}%)`);
  ns.print(`Money: ${Math.round(sim.moneyAvailable * 100) / 100}/${sim.moneyMax} (${Math.round(sim.moneyAvailable / sim.moneyMax * 100)}%)`);
  ns.print("\n" + "=".repeat(TASK_GUI_WIDTH + 8));
  ns.printRaw();
  const UI_ID = "StrawberryHook" + Math.floor(Date.now());
  const rawnode = React.createElement("div", {
    id: UI_ID
  }, "");
  ns.printRaw(rawnode);
  await ns.sleep(1e3);
  const hook_node = _document.getElementById(UI_ID);
  const hook_root = hook_node.parentElement.parentElement.parentElement;
  const container = _document.createElement("div");
  container.style.width = "100%";
  container.style.height = "calc(100% - 33px)";
  container.style.overflowX = "scroll";
  container.style.overflowY = "scroll";
  container.style.position = "fixed";
  container.style.background = BASE_BACKGROUND_COLOR;
  container.style.fontFamily = "Lexend";
  container.style.color = "#FFFFFF";
  container.id = "StrawberryCoreGUIRoot";
  hook_root.prepend(container);
  ReactDOM.render(Elm(StrawberryCoreGUIComponent), container);
  ns.clearLog();
  ns.atExit(() => {
    ReactDOM.unmountComponentAtNode(container);
    for (let server of SERVER_LIST) {
      ns.scriptKill("corejs/workers/_hack.js", server.hostname);
      ns.scriptKill("corejs/workers/_grow.js", server.hostname);
      ns.scriptKill("corejs/workers/_weaken.js", server.hostname);
      ns.scriptKill("corejs/workers/_share.js", server.hostname);
    }
  });
  let skipper = 0;
  while (await ns.sleep(16.66)) {
    setGuiState({
      width: container.offsetWidth,
      height: container.offsetHeight
    });
    updateServerList();
    SERVER_LIST.forEach((server) => server.refreshTick = false);
    skipper += 1;
    if (skipper == 50) {
      await batch(SERVER_LIST[0]);
      skipper = 0;
    }
    SERVER_LIST.forEach((elm) => elm.tick());
    if (INCREASE_GLOBAL_OFFSET) {
      INCREASE_GLOBAL_OFFSET = false;
      GLOBAL_OFFSET += ACTION_SEPERATION_TIME;
    }
  }
}
var TASK_BATCH_TIME = [Infinity, 0, -Infinity];
var BATCH_TIME = [Infinity, 0, -Infinity];
async function batch(target) {
  let perf_st = performance.now();
  const [result, tasks] = await batch_tasks(target);
  if (tasks.length > 0) {
    let task_time = performance.now() - perf_st;
    TASK_BATCH_TIME[0] = Math.min(TASK_BATCH_TIME[0], task_time);
    if (TASK_BATCH_TIME[1] == 0) TASK_BATCH_TIME[1] = task_time;
    else TASK_BATCH_TIME[1] = TASK_BATCH_TIME[1] * 0.99 + task_time * 0.01;
    TASK_BATCH_TIME[2] = Math.max(TASK_BATCH_TIME[2], task_time);
    log(`Batch on ${target.hostname} (fs=${target.state}): res: ${result}`);
    log(`${tasks.length} tasks.`);
    let startTime = Date.now();
    tasks.forEach((elm) => {
      target.timeOffset = Math.max(elm[3] + startTime, target.timeOffset);
    });
    let maxTime = 0;
    let batchTimeOffset = START_TIME_DELAY;
    let validatedTasks = [];
    let canExecuteTasks = true;
    let execServers = [];
    for (let task of tasks) {
      let [execserver, threads, file, exectime, curtime, t, expectedValue] = task;
      maxTime = Math.max(maxTime, curtime);
      let st = target.timeOffset + curtime - exectime + batchTimeOffset;
      if (!execServers.includes(execserver)) execServers.push(execserver);
      validatedTasks.push([execserver, [file, target.hostname, threads, st, exectime, [t, expectedValue]]]);
      batchTimeOffset += 1;
    }
    if (canExecuteTasks) {
      for (let [execserver, a] of validatedTasks) {
        execserver.execute(...a);
      }
    }
    for (let execserver of execServers) execserver.recalcuateAvalableRam();
    target.timeOffset += maxTime + batchTimeOffset;
    task_time = performance.now() - perf_st;
    BATCH_TIME[0] = Math.min(BATCH_TIME[0], task_time);
    if (BATCH_TIME[1] == 0) BATCH_TIME[1] = task_time;
    else BATCH_TIME[1] = BATCH_TIME[1] * 0.99 + task_time * 0.01;
    BATCH_TIME[2] = Math.max(BATCH_TIME[2], task_time);
  }
  freeHeldRam();
  if (target.state == STATES.PREP) target.prepping = true;
}
function blog(...log2) {
}
var player;
async function batch_tasks(_target) {
  let currentTime = 0;
  let tasks = [];
  let target_server = _target.sim;
  let state = _target.state;
  player = ns.getPlayer();
  if (_target.hackDifficulty > _target.minDifficulty && state != STATES.PREP) {
    BATCH_STATE = `Target hack difficulty greater than min difficulty: ${_target.hackDifficulty}/${_target.minDifficulty}`;
    return [false, []];
  }
  if (state == STATES.PREP && _target.prepping) return [false, []];
  ns.printRaw();
  while (true) {
    if (state == STATES.HACK) {
      let hackData = getHackThreads(_target, currentTime);
      if (hackData) {
        let [task, securityIncrease, hackAmount] = hackData;
        target_server.moneyAvailable -= hackAmount;
        target_server.hackDifficulty += securityIncrease;
        tasks.push(task);
        log(`Hacking ${hackAmount}/${target_server.moneyMax} from ${target_server.hostname} (${Math.floor(hackAmount / target_server.moneyMax * 100)}%) s+${securityIncrease}`);
        state = STATES.GROW;
      } else {
        if (tasks.length > 0) BATCH_EXIT = "Not ready for hack.";
        else BATCH_STATE = "Not ready for hack";
        _target.state = state;
        return [false, tasks];
      }
    }
    if (state == STATES.GROW || state == STATES.PREP) {
      let temporaryGrowTasks = [];
      let growExecutions = 0;
      let completedGrow = true;
      let preGrowAmount = target_server.moneyAvailable;
      let growMultiplyer = 1;
      for (let server of SERVER_LIST.slice().sort((a, b) => a.getBotAvailableRam() - b.getBotAvailableRam())) {
        let executionTime = ns.getGrowTime(target_server.hostname);
        let avaliableRam = server.getBotAvailableRam();
        let threads = Math.floor(avaliableRam / UTILITY_RAM_AMOUNT);
        if (threads == 0) continue;
        let threadsNeeded = getGrowThreads(target_server, server.cpuCores);
        if (threadsNeeded <= 0) break;
        let requestedThreads = threadsNeeded <= threads ? threadsNeeded : threads;
        let predictedSecurityLevel = target_server.hackDifficulty + requestedThreads * 0.04;
        server.holdRam2 += requestedThreads * UTILITY_RAM_AMOUNT;
        while (predictedSecurityLevel - target_server.minDifficulty > findMaxWeakenAmount() && requestedThreads > 0) {
          completedGrow = false;
          requestedThreads--;
          server.holdRam2 -= UTILITY_RAM_AMOUNT;
          predictedSecurityLevel = target_server.hackDifficulty + requestedThreads * 0.04;
        }
        if (requestedThreads != 0) {
          log(`${server.hostname} with _g${requestedThreads} s${predictedSecurityLevel - target_server.minDifficulty}`);
          growExecutions += requestedThreads;
          let pa = target_server.moneyAvailable;
          let gp = getGrowPercent(target_server, requestedThreads, server.cpuCores);
          growMultiplyer *= gp;
          target_server.moneyAvailable = getGrowAmount(target_server, requestedThreads, server.cpuCores);
          blog(`Growing server from ${pa} to ${target_server.moneyAvailable} (${Math.round(target_server.moneyAvailable / target_server.moneyMax * 100)}%) (+${target_server.moneyAvailable - pa}) using t${requestedThreads} c${server.cpuCores} (Sec: ${predictedSecurityLevel}, +${requestedThreads * 0.04})`);
          temporaryGrowTasks.push([server, requestedThreads, "_grow.js", executionTime, currentTime, _target.hostname, `${target_server.moneyAvailable}//${gp}`]);
          if (target_server.moneyAvailable > target_server.moneyMax) target_server.moneyAvailable = target_server.moneyMax;
          target_server.hackDifficulty = predictedSecurityLevel;
          if (!completedGrow) break;
        } else break;
      }
      if (growExecutions == 0) {
        freeSecondaryHeldRam();
        if (target_server.hackDifficulty <= target_server.minDifficulty) {
          if (tasks.length > 0) BATCH_EXIT = "No grow executions and difficulty is mininum";
          else BATCH_STATE = "No grow executions and difficulty is mininum";
          if (target_server.moneyAvailable >= target_server.moneyMax) {
            state = STATES.HACK;
          }
          _target.state = state;
          return [completedGrow, tasks];
        }
      } else if (growExecutions != 0) {
        tasks = tasks.concat(temporaryGrowTasks);
        mergeSecondaryRam();
        currentTime += ACTION_SEPERATION_TIME;
      }
      for (let server of SERVER_LIST.slice().sort((a, b) => a.getBotAvailableRam() - b.getBotAvailableRam())) {
        let executionTime = ns.getWeakenTime(target_server.hostname);
        let avaliableRam = server.getBotAvailableRam();
        let threads = Math.floor(avaliableRam / UTILITY_RAM_AMOUNT);
        if (threads == 0) continue;
        let threadsNeeded = Math.ceil((target_server.hackDifficulty - target_server.minDifficulty) / getWeakenAmount(1, server.cpuCores));
        if (threadsNeeded <= 0 || target_server.hackDifficulty <= target_server.minDifficulty) break;
        let requestedThreads = threadsNeeded <= threads ? threadsNeeded : threads;
        let wa = getWeakenAmount(requestedThreads, server.cpuCores);
        let predictedSecurityLevel = target_server.hackDifficulty - wa;
        if (predictedSecurityLevel < target_server.minDifficulty) predictedSecurityLevel = target_server.minDifficulty;
        server.holdRam += requestedThreads * UTILITY_RAM_AMOUNT;
        log(`${server.hostname} with _w${requestedThreads} s=${predictedSecurityLevel - target_server.minDifficulty}`);
        blog(`Weakening server from ${target_server.hackDifficulty} to ${predictedSecurityLevel} using t${requestedThreads} c${server.cpuCores}`);
        if (requestedThreads != 0) tasks.push([server, requestedThreads, "_weaken.js", executionTime, currentTime, _target.hostname, wa]);
        else break;
        target_server.hackDifficulty = predictedSecurityLevel;
      }
      currentTime += ACTION_SEPERATION_TIME;
      if (target_server.moneyAvailable == target_server.moneyMax) {
        if (state != STATES.PREP) {
          state = STATES.HACK;
          log("State is now hack.");
        } else {
          if (tasks.length > 0) BATCH_EXIT = "State is prep, and prep is finished";
          else BATCH_STATE = "State is prep and prep is finished";
          _target.state = state;
          return [completedGrow, tasks];
        }
      } else {
        if (tasks.length > 0) BATCH_EXIT = "Out of ram";
        else BATCH_STATE = "Out of ram";
        _target.state = state;
        return [true, tasks];
      }
    }
    currentTime += BATCH_TIME_DELAY;
  }
}
function findMaxWeakenAmount() {
  return SERVER_LIST.slice().map((server) => getWeakenAmount(Math.floor(server.getBotAvailableRam() / UTILITY_RAM_AMOUNT), server.cpuCores)).reduce((a, b) => a + b, 0);
}
function getWeakenAmount(threads, cores) {
  let bm = bitnode ? bitnode.ServerWeakenRate : 1;
  return 0.05 * (1 + (cores - 1) / 16) * bm * threads;
}
function getGrowPercent(server, threads, cpuCores) {
  if (ns.fileExists("formulas.exe")) return ns.formulas.hacking.growPercent(server, threads, player, cpuCores);
  return Math.exp(getGrowLog(server, threads, cpuCores));
}
function getGrowLog(server, threads, cores) {
  if (!server.serverGrowth) return -Infinity;
  const hackDifficulty = server.hackDifficulty ?? 100;
  const numServerGrowthCycles = Math.max(threads, 0);
  let adjGrowthLog = Math.log1p(0.03 / hackDifficulty);
  if (adjGrowthLog >= 0.00349388925425578) {
    adjGrowthLog = 0.00349388925425578;
  }
  let bitnodeMult;
  try {
    bitnodeMult = ns.getBitNodeMultipliers().ServerGrowthRate;
  } catch {
    bitnodeMult = 1;
  }
  const serverGrowthPercentage = server.serverGrowth / 100;
  const serverGrowthPercentageAdjusted = serverGrowthPercentage * bitnodeMult;
  const coreBonus = 1 + (cores - 1) * (1 / 16);
  return Math.exp(adjGrowthLog * serverGrowthPercentageAdjusted * player.mults.hacking_grow * coreBonus * numServerGrowthCycles);
}
function getGrowAmount(server, threads, cores) {
  if (ns.fileExists("formulas.exe")) return ns.formulas.hacking.growAmount(server, player, threads, cores);
  let serverGrowth = getGrowLog(server, threads, cores);
  if (serverGrowth < 1) {
    serverGrowth = 1;
  }
  let moneyAvailable = server.moneyAvailable ?? Number.NaN;
  moneyAvailable += threads;
  moneyAvailable *= serverGrowth;
  if (moneyAvailable > server.moneyMax || isNaN(moneyAvailable)) moneyAvailable = server.moneyMax;
  return moneyAvailable;
}
function getGrowThreads(server, cores = 1) {
  const person = player;
  if (!server.serverGrowth) return Infinity;
  let startMoney = server.moneyAvailable;
  let targetMoney = server.moneyMax;
  const moneyMax = server.moneyMax ?? 1;
  if (startMoney < 0) startMoney = 0;
  if (targetMoney > moneyMax) targetMoney = moneyMax;
  if (targetMoney <= startMoney) return 0;
  if (ns.fileExists("formulas.exe")) return ns.formulas.hacking.growThreads(server, person, targetMoney, cores);
  const k = getGrowLog(server, 1, person, cores);
  const guess = (targetMoney - startMoney) / (1 + (targetMoney * (1 / 16) + startMoney * (15 / 16)) * k);
  let x = guess;
  let diff;
  while (diff < -1 || diff > 1) {
    const ox = startMoney + x;
    const newx = (x - ox * Math.log(ox / targetMoney)) / (1 + ox * k);
    diff = newx - x;
    x = newx;
  }
  const ccycle = Math.ceil(x);
  if (ccycle - x > 0.999999) {
    const fcycle = ccycle - 1;
    if (targetMoney <= (startMoney + fcycle) * Math.exp(k * fcycle)) {
      return fcycle;
    }
  }
  if (ccycle >= x + ((diff <= 0 ? -diff : diff) + 1e-6)) {
    return ccycle;
  }
  if (targetMoney <= (startMoney + ccycle) * Math.exp(k * ccycle)) {
    return ccycle;
  }
  return ccycle + 1;
}
function getHackThreads(_target, currentTime) {
  let target = _target;
  if (target.hackDifficulty > target.minDifficulty && target.moneyAvailable < target.moneyMax) {
    target.log();
    throw `Attempted to start hacking when the server is not prepped!!
`;
  }
  let hackThreadsNeeded = Math.ceil(HACK_PERCENTAGE / ns.hackAnalyze(target.hostname));
  let hackRamNeeded = hackThreadsNeeded * HACK_RAM_AMOUNT;
  if (hackRamNeeded > MAX_RAM) {
    hackThreadsNeeded = Math.floor(MAX_RAM / HACK_RAM_AMOUNT);
    hackRamNeeded = hackThreadsNeeded * HACK_RAM_AMOUNT;
  }
  let hackAmount = ns.hackAnalyze(target.hostname) * hackThreadsNeeded * _target.moneyMax;
  let hackServers = SERVER_LIST.slice().filter((s) => s.getBotAvailableRam() >= hackRamNeeded);
  if (hackServers.length == 0) return false;
  let hackServer = hackServers[0];
  let securityIncrease = ns.hackAnalyzeSecurity(hackThreadsNeeded, target.hostname);
  hackServer.holdRam += hackRamNeeded;
  if (findMaxWeakenAmount() < securityIncrease) {
    hackServer.holdRam -= hackRamNeeded;
    return false;
  }
  return [[hackServer, hackThreadsNeeded, "_hack.js", ns.getHackTime(target.hostname), currentTime, _target.hostname, hackAmount], securityIncrease, hackAmount];
}
function log(...logs) {
}
var scriptRamLookupDict = {};
function fastScriptRam(file) {
  return scriptRamLookupDict[file] ? scriptRamLookupDict[file] : scriptRamLookupDict[file] = ns.getScriptRam(file);
}
var incremental = 0;
var Task = class {
  constructor(file, target, threads, start, exectime, _args) {
    this.id = incremental;
    this.file = file;
    this.target = target;
    this.threads = threads;
    this._arguments = _args;
    this.startTime = start;
    this.executionTime = exectime;
    this.endTime = start + exectime;
    this.started = false;
    incremental += 1;
    this.ram = fastScriptRam(this.file) * this.threads;
  }
};
var MAX_RAM = 0;
var GLOBAL_OFFSET = 0;
var INCREASE_GLOBAL_OFFSET = false;
var BotServer = class {
  constructor(server) {
    this.server = server;
    this.baseDifficulty = this.server.baseDifficulty;
    this.hostname = this.server.hostname;
    this.ip = this.server.ip;
    this.maxRam = this.hostname == "home" ? HOME_ALLOCATED_RAM : this.server.maxRam;
    if (this.maxRam > MAX_RAM) MAX_RAM = this.maxRam;
    this.minDifficulty = this.server.minDifficulty;
    this.moneyMax = this.server.moneyMax;
    this.numOpenPortsRequired = this.server.numOpenPortsRequired;
    this.organizationName = this.server.organizationName;
    this.purchasedByPlayer = this.server.purchasedByPlayer;
    this.requiredHackingSkill = this.server.requiredHackingSkill;
    this.serverGrowth = this.server.serverGrowth;
    this.refreshSim();
    this.tasks = {};
    this._holdRam = 0;
    this._holdRam2 = 0;
    this.refreshTick = false;
    this._botAvalaiableRam = 0;
    this.elmState = null;
    this.setElmStateRaw = null;
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
  tick() {
    let taskKeys = Object.keys(this.tasks);
    let runningTasks = ns.ps(this.hostname).map((elm) => elm.args[0] + "");
    for (let taskid of taskKeys) {
      let task = this.tasks[taskid];
      if (task.started) {
        if (task.processed && !runningTasks.includes(taskid)) {
          delete this.tasks[taskid];
        } else if (runningTasks.includes(taskid)) {
          task.processed = true;
        }
      }
    }
    taskKeys = Object.keys(this.tasks);
    for (let id of taskKeys) {
      let task = this.tasks[id];
      if (task.startTime - Date.now() + GLOBAL_OFFSET < START_SCRIPT_TIME && !task.started) {
        this.start(task);
      }
    }
    if (this.prepping && Object.keys(this.tasks).length == 0) {
      this.prepping = false;
      this.state = STATES.GROW;
    }
  }
  recalcuateAvalableRam() {
    let ramQueued = Object.values(this.tasks).slice().map((task) => task.ram).reduce((s, a) => s + a, 0);
    this._botAvalaiableRam = this.maxRam - ramQueued - this.holdRam - this.holdRam2;
  }
  execute(file, target, threads, startTime, execTime, ..._args) {
    file = "./workers/" + file;
    let task = new Task(file, target, threads, startTime, execTime, ..._args);
    log(`[${task.id}] Task ${file} exec on ${this.hostname} t=${threads} time=${startTime} for ${ns.tFormat(execTime)}`);
    this.tasks[task.id] = task;
    if (task.startTime < Date.now() > START_SCRIPT_TIME) this.start(task);
  }
  /** @param {Task} task */
  start(task) {
    let ramUsage = task.ram;
    if (!ns.scp(task.file, this.hostname)) throw `Failed to copy ${task.file} to ${this.hostname}`;
    let _a = task._arguments !== void 0 ? task._arguments : [];
    let p = 0;
    try {
      p = ns.exec(task.file, this.hostname, { threads: task.threads, temporary: true }, task.id, this.hostname, task.startTime, ..._a);
    } catch (e) {
      console.log(e);
      throw `Failed to execute with error. File: ${task.file}. Threads: ${task.threads} Arguments: ` + JSON.stringify(_a);
    }
    if (p == 0) {
      throw `Failed to execute task ${task.id}.
"${task.file}" t=${task.threads} targetting ${task.target}
Ram: Script: ${task.threads * ns.getScriptRam(task.file, "home")}GB. Current: ${this.ramAvailable}GB/${this.maxRam}GB`;
    }
    task.started = true;
  }
  getBotAvailableRam() {
    return this._botAvalaiableRam;
  }
  refresh(attribute) {
    if (!this.refreshTick) {
      this.server = ns.getServer(this.hostname);
      this.refreshTick = true;
    }
    if (attribute !== void 0) return this.server[attribute];
  }
  getWeight() {
    let s = ns.getServer(this.hostname);
    let p = ns.getPlayer();
    s.hackDifficulty = s.minDifficulty;
    if (s.requiredHackingSkill > p.skills.hacking) return 0;
    let weight = s.moneyMax / s.minDifficulty;
    if (ns.fileExists("Formulas.exe"))
      weight = s.moneyMax / ns.formulas.hacking.weakenTime(s, p) * ns.formulas.hacking.hackChance(s, p);
    else if (s.requiredHackingSkill > p.skills.hacking / 2)
      return 0;
    return weight;
  }
  get backdoorInstalled() {
    return this.refresh("backdoorInstalled");
  }
  get cpuCores() {
    return this.refresh("cpuCores");
  }
  get hackDifficulty() {
    return this.refresh("hackDifficulty");
  }
  get hasAdminRights() {
    return this.refresh("hasAdminRights");
  }
  get isConnectedTo() {
    return this.refresh("isConnectedTo");
  }
  get moneyAvailable() {
    return this.refresh("moneyAvailable");
  }
  get openPortCount() {
    return this.refresh("openPortCount");
  }
  get ramUsed() {
    return this.refresh("ramUsed");
  }
  get smtpPortOpen() {
    return this.refresh("smtpPortOpen");
  }
  get sqlPortOpen() {
    return this.refresh("sqlPortOpen");
  }
  get sshPortOpen() {
    return this.refresh("sshPortOpen");
  }
  get ftpPortOpen() {
    return this.refresh("ftpPortOpen");
  }
  get httpPortOpen() {
    return this.refresh("httpPortOpen");
  }
  get ramAvailable() {
    return this.maxRam - this.ramUsed;
  }
  log() {
    let ramText = `${this.ramAvailable}GB/${this.maxRam}GB (${Math.round(this.ramAvailable / this.maxRam * 100)}%)`;
    let moneyText = "$" + this.moneyAvailable + "/$" + this.moneyMax + ` (${Math.round(this.moneyAvailable / this.moneyMax * 100)}%)`;
    let securityText = `${this.hackDifficulty}/${this.minDifficulty} (${Math.round(this.hackDifficulty / this.minDifficulty * 100)}%)`;
    ns.tprint(`${this.hostname} (${this.getWeight().toFixed(3)}): ${ramText}, ${securityText}, ${this.cpuCores} cores. ${moneyText}`);
  }
  set holdRam(n) {
    this._holdRam = n;
    this.recalcuateAvalableRam();
  }
  set holdRam2(n) {
    this._holdRam2 = n;
    this.recalcuateAvalableRam();
  }
  get holdRam() {
    return this._holdRam;
  }
  get holdRam2() {
    return this._holdRam2;
  }
  element() {
    let ramAvailable = this.ramUsed / this.maxRam;
    let botRam = (this.maxRam - this.getBotAvailableRam()) / this.maxRam;
    return Elm(
      "div",
      {
        style: {
          "width": "350px",
          "minWidth": "350px",
          "maxWidth": "350px",
          "height": "64px",
          "background": TRINARY_BACKGROUND_COLOR,
          "borderRadius": "16px",
          "padding": "4px",
          "margin": "4px",
          "flex": "1 1 calc(50% - 16px)"
        }
      },
      Elm(
        "span",
        {
          style: {
            "margin": "8px",
            "font-size": "24px"
          }
        },
        this.hostname
      ),
      Elm(
        "div",
        {
          style: {
            "position": "relative",
            "font-size": "10px"
          }
        },
        Elm(
          "div",
          {
            style: {
              "top": "0",
              "right": "0",
              "padding": "5px",
              "margin-top": "-32px",
              "text-align": "right"
            }
          },
          `Tasks: ${Object.keys(this.tasks).length}`,
          Elm("br"),
          `$${Math.round(this.moneyAvailable)}/${"$"}${this.moneyMax}`
        )
      ),
      Elm(
        "div",
        {
          style: {
            "top": "-4px",
            "margin": "8px",
            "font-size": "24px",
            "background": "#DD3D48",
            "width": "calc(100% - 16px)",
            "height": "16px",
            "border-radius": "8px",
            "overflow": "hidden"
          }
        },
        Elm(
          "div",
          {
            // blue
            style: {
              "height": "16px",
              "background": "#4288EF",
              "border-radius": "8px",
              "transform": `translateX(-${(1 - botRam) * 100}%)`,
              "transition": "transform 0.5s ease-out"
            }
          }
        ),
        Elm(
          "div",
          {
            // green
            style: {
              "margin-top": "-16px",
              "height": "16px",
              "background": "#9AE6CB",
              "border-radius": "8px",
              "transform": `translateX(-${(1 - ramAvailable) * 100}%)`,
              "transition": "transform 0.5s ease-out"
            }
          }
        ),
        Elm(
          "span",
          {
            style: {
              "top": "-27px",
              "margin-left": "5px",
              "font-size": "13px",
              "color": "#000000",
              "position": "relative"
            }
          },
          `${this.ramAvailable}/${this.getBotAvailableRam()}/${this.maxRam} GB Ram`
        )
      )
    );
  }
};
function freeHeldRam() {
  for (let server of SERVER_LIST) server.holdRam = 0;
  freeSecondaryHeldRam();
}
function freeSecondaryHeldRam() {
  for (let server of SERVER_LIST) server.holdRam2 = 0;
}
function mergeSecondaryRam() {
  for (let server of SERVER_LIST) {
    server.holdRam += server.holdRam2;
    server.holdRam2 = 0;
  }
}
function updateServerList() {
  const scan = () => {
    let hostnames = [];
    let hosts = [];
    const recursiveScan = (host) => {
      hostnames.push(host);
      ns.scan(host).filter((elm) => !hostnames.includes(elm)).forEach((elm) => {
        hosts.push(new BotServer(ns.getServer(elm)));
        recursiveScan(elm);
      });
    };
    recursiveScan("home");
    hosts.push(new BotServer(ns.getServer("home")));
    return hosts;
  };
  const isAdmin = (server) => {
    if (server.hasAdminRights) return true;
    if (server.requiredHackingSkill >= ns.getHackingLevel()) return false;
    let possibleOpenPorts = ns.fileExists("BruteSSH.exe") + ns.fileExists("relaySMTP.exe") + ns.fileExists("FTPCrack.exe") + ns.fileExists("HTTPWorm.exe") + ns.fileExists("SQLInject.exe");
    if (server.numOpenPortsRequired > possibleOpenPorts) return false;
    if (!server.sshPortOpen && ns.fileExists("BruteSSH.exe")) ns.brutessh(server.hostname);
    if (!server.ftpPortOpen && ns.fileExists("ftpcrack.exe")) ns.ftpcrack(server.hostname);
    if (!server.smtpPortOpen && ns.fileExists("relaySMTP.exe")) ns.relaysmtp(server.hostname);
    if (!server.httpPortOpen && ns.fileExists("httpworm.exe")) ns.httpworm(server.hostname);
    if (!server.sqlPortOpen && ns.fileExists("sqlinject.exe")) ns.sqlinject(server.hostname);
    ns.nuke(server.hostname);
    if (server.hasAdminRights) {
      ns.toast(`Successfully hacked new server "${server.hostname}"`, "success");
    } else {
      ns.toast(`Failed to hack new server "${server.hostname}"`, "error");
    }
    return server.hasAdminRights;
  };
  const s = scan();
  let changed = false;
  for (let elm of s) {
    if (isAdmin(elm) && !SERVER_LIST.map((elm2) => elm2.hostname).includes(elm.hostname)) {
      SERVER_LIST.push(elm);
      changed = true;
    }
  }
  if (changed)
    SERVER_LIST.sort((a, b) => b.getWeight() - a.getWeight());
}
function convertMsToTime(ms) {
  let minutes = Math.floor(ms / 6e4);
  let seconds = Math.floor(ms % 6e4 / 1e3);
  let milliseconds = Math.floor(ms % 1e3);
  seconds = String(seconds).padStart(2, "0");
  return `${minutes}:${seconds}`;
}
var React = _window.React;
var ReactDOM = _window.ReactDOM;
var Elm = React.createElement;
var guiState;
var setGuiStateRaw;
function setGuiState(attributes) {
  let state = structuredClone(guiState);
  for (let [key, value] of Object.entries(attributes)) {
    state[key] = value;
  }
  return setGuiStateRaw(state);
}
var StrawberryCoreGUIComponent = () => {
  [guiState, setGuiStateRaw] = React.useState({
    width: 0,
    height: 0
  });
  if (guiState.width > 450) {
    return Elm(
      "div",
      {
        style: {
          "margin": "16px"
        }
      },
      createSimulationElement(),
      Elm(TaskVisualizer),
      // Server container
      Elm(
        "div",
        {
          style: {
            "width": "100%",
            "background": CONTENT_BACKGROUND_COLOR,
            "border-radius": "16px",
            "margin-top": "16px"
          }
        },
        // Server title
        Elm(
          "div",
          {
            style: {
              "padding-top": "16px",
              "padding-bottom": "16px",
              "font-size": "30px",
              "display": "flex",
              "justify-content": "center",
              "width": "100%"
            }
          },
          "Servers"
        ),
        // Server container
        Elm(
          "div",
          {
            style: {
              "padding": "16px",
              "display": "flex",
              "flex-direction": "row",
              "flex-wrap": "wrap",
              "justify-content": "center"
            }
          },
          ...SERVER_LIST.filter((server) => server.maxRam > 0).map((server) => server.element())
        )
      ),
      Elm("div", {}, `Debug info: (w: ${guiState.width} h: ${guiState.height})`)
    );
  } else return Elm("div", {}, "Width too small!");
};
var BASE_HEIGHT = 15;
var PIXELS_PER_MS = 10;
var VisualTask = class {
  constructor(task) {
    this.id = task.id;
    this.file = task.file;
    this.target = task.target;
    this.threads = task.threads;
    this.startTime = task.startTime;
    this.executionTime = task.exectime;
    this.endTime = this.startTime + this.exectime;
    this.lasttime = 0;
    this.task = task;
  }
  render(x, y, zoom, currentTime) {
    let height = BASE_HEIGHT * zoom;
    return Elm(
      "div",
      {
        style: {
          "height": `${height * 0.7}px`,
          "width": `${PIXELS_PER_MS * this.executionTime}px`,
          "margin-top": `${height * 0.15}px`,
          "margin-bottom": `${height * 0.15}px`,
          "background-color": "#FFFFFF"
        }
      }
    );
  }
};
var TaskVisualizer = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 1,
      offsetX: 0,
      offsetY: 0
    };
    this.tasks = {};
  }
  render() {
    return Elm(
      "div",
      {
        style: {
          "width": "100%",
          "background": CONTENT_BACKGROUND_COLOR,
          "border-radius": "16px",
          "margin-top": "16px",
          "padding-bottom": "16px"
        }
      },
      Elm(
        "div",
        {
          style: {
            "padding-top": "16px",
            "padding-bottom": "16px",
            "font-size": "30px",
            "display": "flex",
            "justify-content": "center",
            "width": "100%"
          }
        },
        `Tasks: (-1)`
      )
    );
  }
};
var rounder = 1e3;
var createSimulationElement = () => {
  let sim = SERVER_LIST[0].sim;
  let moneyAvailable = sim.moneyAvailable / sim.moneyMax;
  return Elm(
    "div",
    {
      style: {
        "width": "100%",
        "background": CONTENT_BACKGROUND_COLOR,
        "border-radius": "16px",
        "padding-bottom": "16px"
      }
    },
    // Server title
    Elm(
      "div",
      {
        style: {
          "padding-top": "16px",
          "padding-bottom": "16px",
          "font-size": "30px",
          "display": "flex",
          "justify-content": "center",
          "width": "100%"
        }
      },
      `Batcher: ${sim.hostname}`
    ),
    Elm(
      "div",
      {
        style: {
          "margin": "8px"
        }
      },
      `Batch state: ${BATCH_STATE}`,
      Elm("br"),
      `Batch exit: ${BATCH_EXIT}`,
      Elm("br"),
      `Task batch time // Min: ${Math.round(TASK_BATCH_TIME[0] * rounder) / rounder} Avg: ${Math.round(TASK_BATCH_TIME[1] * rounder) / rounder} Max: ${Math.round(TASK_BATCH_TIME[2] * rounder) / rounder}`,
      Elm("br"),
      `Batch time // Min: ${Math.round(BATCH_TIME[0] * rounder) / rounder} Avg: ${Math.round(BATCH_TIME[1] * rounder) / rounder} Max: ${Math.round(BATCH_TIME[2] * rounder) / rounder}`,
      Elm("br"),
      Elm("br"),
      `Security Level: ${sim.hackDifficulty}/${sim.minDifficulty} (${Math.round(sim.hackDifficulty / sim.minDifficulty * 1e3) / 10}%)`
    ),
    Elm(
      "div",
      {
        style: {
          "top": "-4px",
          "margin": "8px",
          "font-size": "24px",
          "background": "#DD3D48",
          "width": "calc(100% - 16px)",
          "height": "16px",
          "border-radius": "8px",
          "overflow": "hidden"
        }
      },
      Elm(
        "div",
        {
          // green
          style: {
            "height": "16px",
            "background": "#9AE6CB",
            "border-radius": "8px",
            "transform": `translateX(-${(1 - moneyAvailable) * 100}%)`,
            "transition": "transform 0.5s ease-out"
          }
        }
      ),
      Elm(
        "span",
        {
          style: {
            "top": "-27px",
            "margin-left": "5px",
            "font-size": "13px",
            "color": "#000000",
            "position": "relative"
          }
        },
        `${"$"}${Math.round(sim.moneyAvailable)}/${"$"}${sim.moneyMax}`
      )
    )
  );
};
export {
  main
};
