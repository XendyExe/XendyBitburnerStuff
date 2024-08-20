let incremental = 0;
export class Task {
    id: number;
    file: string;
    target: string;
    threads: number;
    _arguments: string[];
    startTime: number;
    executionTime: number;
    endTime: number;
    started: boolean;
    ram: number;
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
}