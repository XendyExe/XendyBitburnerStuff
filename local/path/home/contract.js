/** @type {NS} ns */
let ns;
let failedtosolve = false;
/** @param {NS} NETSCIPTAPI */
export async function main(NETSCIPTAPI) {
    ns = NETSCIPTAPI;
    const servers = scan();
    for (let hostname of servers) {
        for (let file of ns.ls(hostname)) {
            if (file.startsWith("contract-") && file.endsWith(".cct")) {
                let contractType = ns.codingcontract.getContractType(file, hostname);
                let contractDesc = ns.codingcontract.getDescription(file, hostname).replaceAll("&nbsp;", " ");
                let contractData = ns.codingcontract.getData(file, hostname);
                if (SOLVERS[contractType]) {
                    const reward = ns.codingcontract.attempt(SOLVERS[contractType](contractData), file, hostname);
                    if (reward) {
                        let msg = `${file} // ${reward}`;
                        ns.toast(msg, "success");
                        ns.tprint(msg);
                    }
                    else {
                        ns.toast(`${file} failed to solve.`, "error");
                        ns.tprint(`${hostname} // ${file}`)
                        ns.tprint(contractType)
                        ns.tprint("==================")
                        ns.tprint(contractDesc)
                        ns.tprint(contractData)
                        ns.tprint("\n\n\n\n\n");
                        failedtosolve = true;
                    }
                }
                else if (!failedtosolve){
                    ns.tprint(`${hostname} // ${file}`)
                    ns.tprint(contractType)
                    ns.tprint("==================")
                    ns.tprint(contractDesc)
                    ns.tprint(contractData)
                    ns.tprint("\n\n\n\n\n");
                }
            }
        }
    }

    ns.tprint(ns.codingcontract.getContractTypes());
}

// actual solving
const SOLVERS = {
    "Unique Paths in a Grid I": (data) => {
        let sx = data[0] - 1; let sy = data[1] - 1;
        let total = sx + sy;
        return ((factorial(total))/(factorial(sx) * factorial(total - sx)))
    },
    "Unique Paths in a Grid II": (data) => {
        let dp = [];
        for (let y = 0; y < data.length; y++) {
            let arr = [];
            for (let x = 0; x < data[0].length; x++) {
                arr.push(0);
            }
            dp.push(arr);
        }
        for (let y = 0; y < dp.length; y++) {
            for (let x = 0; x < dp[0].length; x++) {
                if (x == 0 && y == 0) {
                    dp[0][0] = 1;
                    continue;
                }
                if (data[y][x] == 0) {
                    let yw = y - 1 > -1 ? dp[y - 1][x] : 0;
                    let xw = x - 1 > -1 ? dp[y][x - 1] : 0;
                    console.log(x, y, yw, xw, yw + xw);
                    dp[y][x] = yw + xw;
                }
                else dp[y][x] = 0;
            }
        }
        console.log(dp);
        return dp[dp.length-1][dp[0].length-1]
    },
    "Shortest Path in a Grid": (data) => {
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        const direction_chars = ['D', 'U', 'R', 'L']
        // y, x again.
        let queue = [[[0,0], "", ["0,0"]]];
        while (queue.length > 0) {
            let [position, path, visited] = queue.shift();
            if (position[0] == data.length - 1 && position[1] == data[0].length-1) return path;
            let i = 0;
            for (let direction of directions) {
                let newPosition = [position[0] + direction[0], position[1] + direction[1]];
                let posString = JSON.stringify(newPosition);
                if (newPosition[0] >= 0 && newPosition[0] < data.length && newPosition[1] >= 0 && newPosition[1] < data[0].length &&
                    !visited.includes(posString) && data[newPosition[0]][newPosition[1]] != 1) {
                        queue.push([newPosition, path + direction_chars[i], [...visited, posString]]);
                }
                i += 1;
            }
        }
        return "";
    },
    "Find Largest Prime Factor": (num) => {
        let out = -1;
        let d = 2;
        while (num > 1) {
            while (num % d == 0) {
                if (d > out) out = d;
                num/=d;
            }
            d += 1;
        }
        return out;
    },
    "Compression I: RLE Compression": (data) => {
        let consumedString = data[0];
        let count = 0;
        let out = "";
        for (let letter of data.split("")) {
            if (letter == consumedString) {
                if (count == 9) {
                    out += `${count}${consumedString}`;
                    count = 1;
                    consumedString = letter;
                }
                else 
                    count += 1;
            }
            else {
                out += `${count}${consumedString}`;
                count = 1;
                consumedString = letter;
            }
        }
        return out + `${count}${consumedString}`;
    },

    "Encryption I: Caesar Cipher": (data) => {
        /** @type {String} plaintext
         * @type {Number} offset
         */
        let [plaintext, offset] = data;
        plaintext = plaintext.toUpperCase();
        let out = "";
        for (let letter of plaintext.split("")) {
            if (letter == " ") {
                out += " "; continue;
            }
            let x = letter.charCodeAt(0) - 65 - offset;
            if (x < 0) x += 26;
            out += String.fromCharCode((x % 26) + 65)
        }
        return out;
    },
    "Minimum Path Sum in a Triangle": (data) => {
        const calculate = (count, index, rawtriangle) => {
            let triangle = rawtriangle.slice();
            let entry = triangle.shift();
            if (triangle.length > 0) {
                return Math.min(calculate(count + entry[index], index, triangle), calculate(count + entry[index + 1], index + 1, triangle))
            }
            else {
                return count + Math.min(entry[index], entry[index + 1]);
            }
        }
        let num = data[0][0];
        data.shift();
        return calculate(num, 0, data);
    },
    "Merge Overlapping Intervals": (data) => {
        let res = [];
        let changed = false;
        for (let entry of data) {
            let found = false;
            for (let obj of res) {
                if ((obj[0] <= entry[0] && obj[1] >= entry[0]) || (obj[0] >= entry[1] && obj[1] <= entry[1])) {
                    found = true;
                    changed = true;
                    res[res.indexOf(obj)] = [Math.min(entry[0], obj[0]), Math.max(entry[1], obj[1])];
                    break;
                }
            }
            if (!found) res.push(entry);
        } 
        res.sort((a, b) => a[0]-b[0]);
        return changed ? SOLVERS["Merge Overlapping Intervals"](res) : res;
    },
    "Algorithmic Stock Trader I": (data) => {
        let m = 0;
        while (data.length > 0) {
            let start = data.shift();
            let end = Math.max(...data);
            let profit = end - start;
            if (m < profit) m = profit;
        }
        return m;
    }
}

function factorial(n) { 
    let ans = 1; 
    
    if(n === 0)
        return 1;
    for (let i = 2; i <= n; i++) 
        ans = ans * i; 
    return ans; 
}
// @returns {Server[]} hosts
const scan = () => {
    let hostnames = [];
    const recursiveScan = (host) => {
        hostnames.push(host);
        ns.scan(host).filter(elm => !hostnames.includes(elm)).forEach((elm) => {
            recursiveScan(elm);
        });
    }
    recursiveScan("home");
    return hostnames;
}