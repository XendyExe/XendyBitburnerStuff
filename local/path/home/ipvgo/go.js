// servers/home/ipvgo/go.js
var log = (...args) => {
};
async function findGoodGame() {
  let count = 0;
  let initialCords;
  let rotation = 0;
  let macro = [];
  log("Looking for next game...");
  while (await ns.sleep(1)) {
    count++;
    ns.go.resetBoardState("Illuminati", 5);
    initialCords = false;
    let spacesFound = 0;
    rotation = 0;
    macro = [];
    while (true) {
      spacesFound = 0;
      let state2 = ns.go.getBoardState();
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          if (state2[y][x] == "O") {
            initialCords = [x, y];
          }
          if (state2[y][x] == "#") {
            spacesFound += 1;
          }
        }
      }
      if (initialCords) break;
    }
    if (spacesFound > 1) continue;
    if (initialCords[0] == 1 && initialCords[1] == 2) continue;
    else if (initialCords[0] == 2 && (initialCords[1] == 1 || initialCords[1] == [3])) continue;
    else if (initialCords[0] == 3 && initialCords[1] == 2) continue;
    let state = ns.go.getBoardState();
    if (![
      state[initialCords[1] - 1][initialCords[0] - 1],
      state[initialCords[1]][initialCords[0] - 1],
      state[initialCords[1] + 1][initialCords[0] - 1],
      state[initialCords[1] - 1][initialCords[0]],
      state[initialCords[1] + 1][initialCords[0]],
      state[initialCords[1] - 1][initialCords[0] + 1],
      state[initialCords[1]][initialCords[0] + 1],
      state[initialCords[1] + 1][initialCords[0] + 1]
    ].includes("#")) continue;
    if (state[2][0] == "#") {
      rotation = 0;
    } else if (state[4][2] == "#") {
      rotation = 1;
    } else if (state[2][4] == "#") {
      rotation = 2;
    } else if (state[0][2] == "#") {
      rotation = 3;
    } else continue;
    break;
  }
  let reflection = rotation == 0 && initialCords[0] == 3 || rotation == 1 && initialCords[1] == 3 || rotation == 2 && initialCords[0] == 1 || rotation == 3 && initialCords[1] == 1;
  log(`Found good game after ${count} searches. (Rotation: ${rotation}, Reflection: ${reflection})`);
  return [rotation, reflection];
}
function rotate(x, y, clockwiseAmount) {
  const n = 5;
  let rotatedX, rotatedY;
  clockwiseAmount = (clockwiseAmount % 4 + 4) % 4;
  switch (clockwiseAmount) {
    case 0:
      rotatedX = x;
      rotatedY = y;
      break;
    case 1:
      rotatedX = n - 1 - y;
      rotatedY = x;
      break;
    case 2:
      rotatedX = n - 1 - x;
      rotatedY = n - 1 - y;
      break;
    case 3:
      rotatedX = y;
      rotatedY = n - 1 - x;
      break;
  }
  return [rotatedX, rotatedY];
}
function reflect(x, y) {
  return [x, 4 - y];
}
function rotateArray(array, clockwiseAmount) {
  function rotate90Clockwise(matrix2) {
    const N = matrix2.length;
    let result = Array.from({ length: N }, () => Array(N).fill(""));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        result[j][N - i - 1] = matrix2[i][j];
      }
    }
    return result;
  }
  let matrix = array.map((row) => row.split(""));
  let rotations = clockwiseAmount / 90 % 4;
  if (rotations < 0) rotations += 4;
  for (let i = 0; i < rotations; i++) {
    matrix = rotate90Clockwise(matrix);
  }
  return matrix.map((row) => row.join(""));
}
function mirrorArray(array) {
  let matrix = array.map((row) => row.split(""));
  let mirroredMatrix = matrix.map((row) => row.reverse());
  return mirroredMatrix.map((row) => row.join(""));
}
var ns;
async function main(_ns) {
  ns = _ns;
  for (let script of ns.ps()) {
    if (script.filename == "go.js" && script.pid != ns.pid && ns.kill(script.pid)) log("Killed previous go.js");
  }
  let r = ns.read("ipvgo/go_illuminati5x5.json");
  const gameMap = r == "" || _ns.args.length > 0 ? {} : JSON.parse(r);
  while (true) {
    let rotation = await findGoodGame();
    let reflection = rotation[1];
    let _states = {};
    let manualIntervention = false;
    rotation = rotation[0];
    await ns.go.makeMove(2, 2);
    const tryMove = async (x, y) => {
      let pos = rotate(x, y, rotation - 4);
      if (reflection) pos = reflect(pos[0], pos[1]);
      let res = await ns.go.makeMove(pos[0], pos[1]);
    };
    while (await ns.sleep(1)) {
      let previous = ns.go.getBoardState();
      let gameState = rotateArray(previous, rotation);
      if (reflection) gameState = mirrorArray(gameState);
      gameState = gameState.join(" ");
      ns.print("Current gamestate: " + gameState);
      if (gameMap[gameState] !== void 0) {
        ns.print("Found gamestate in gamemap, automatically moving");
        let m = gameMap[gameState];
        if (m == "pass") {
          await ns.go.passTurn();
        } else {
          await tryMove(...m);
        }
      } else {
        if (!gameState.includes("O")) break;
        manualIntervention = true;
        ns.alert(`State: "${gameState}" gamemap: ${gameMap[gameState]}`);
        while (ns.go.getCurrentPlayer() == "Black" && ns.go.getCurrentPlayer() != "None") await ns.sleep(1);
        if (ns.go.getCurrentPlayer() == "None") {
          ns.tprint("No current player, breaking.");
          break;
        }
        let current = ns.go.getBoardState();
        let cords;
        for (let y = 0; y < 5; y++) {
          for (let x = 0; x < 5; x++) {
            if (previous[y][x] != "X" && current[y][x] == "X") {
              cords = rotate(y, x, rotation);
              if (reflection) cords = reflect(cords[0], cords[1]);
              break;
            }
          }
          if (cords) break;
        }
        if (cords) {
          _states[gameState] = cords;
          ns.tprint("Player placed at", cords);
          ns.alert(cords.join(", "));
        } else {
          _states[gameState] = "pass";
          ns.tprint("Player passed");
          ns.alert("passed");
        }
        let opp = await ns.go.opponentNextTurn();
        ns.tprint("Opponent", opp.type + "ed");
        if (opp.type == "gameOver") {
          ns.tprint("Game is over, breaking");
          break;
        }
      }
    }
    if (manualIntervention) {
      alert("game over");
    }
    await ns.go.passTurn();
    if (ns.go.getBoardState().join("").includes("O")) {
      if (manualIntervention) {
        ns.tprint("Detected loss, will not be saving gamestates");
      } else {
        throw "AI Loss without manual intervention";
      }
    } else if (manualIntervention) {
      ns.tprint(`Detected win, saving ${Object.keys(_states).length} gamestates!`);
      for (let state of Object.keys(_states)) {
        gameMap[state] = _states[state];
      }
      alert("Gamemap is now " + Object.keys(gameMap).length + " keys long");
      ns.write("ipvgo/go_illuminati5x5.json", JSON.stringify(gameMap), "w");
    }
  }
  return;
}
export {
  main
};
