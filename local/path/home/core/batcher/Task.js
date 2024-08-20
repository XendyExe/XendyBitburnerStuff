// servers/home/core/batcher/Task.tsx
var incremental = 0;
var Task = class {
  id;
  file;
  target;
  threads;
  _arguments;
  startTime;
  executionTime;
  endTime;
  started;
  ram;
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
export {
  Task
};
