import { CoreComponent } from "../CoreComponent";
import { CoreGUI } from "../gui";
const HACK_RAM_AMOUNT = 1.7;
const UTILITY_RAM_AMOUNT = 1.75;
const SHARE_RAM_AMOUNT = 4;
const ACTION_SEPERATION_TIME = 10; // time in ms between actions
const BATCH_TIME_DELAY = 0;
const START_TIME_DELAY = 100;
const START_SCRIPT_TIME = 5000; // time in ms before starting a script.
const HACK_PERCENTAGE = 0.90; // Amount of money to hack in one turn.

export class Batcher extends CoreComponent{
    constructor(gui: CoreGUI) {
        super(gui, "Batcher");


    }
    init() {

    }

    tick(): void {
        
    }

    
}