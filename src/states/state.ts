import {StateMachine} from "../state-machine";

export class State {

    readonly type : string;

    private comment ?: string;

    private inputPath ?: string;
    private outputPath ?: string;
    private parameters ?: string;
    private resultPath ?: string;

    private next ?: string;

    private machine ?: StateMachine;

    retry ?: string;
    catch ?: string;

    constructor(private name : string, taskType : string) {
        this.type = taskType;
        this.setNext();
    }

    getName() {
        return this.name;
    }

    setMachine(machine : StateMachine) {
        this.machine = machine;
    }

    setNext(next ?: string) : boolean {
        let allowed = ["Pass", "Task","Wait", "Parallel", "Map"];
        if (allowed.indexOf(this.type) > -1) {
            if (next && this.machine) {
                if (this.machine.getState(next)) {
                    this.next = next;
                } else {
                    return false;
                }
            } else {
                this.next = "End";
                return true;
            }
        }
        return false;
    }

    getNext() : State | string {
        if (this.next) {
            return this.machine.getState(this.next) || "End";
        }
        return null;
    }

    isEndState() : boolean {
        return !(this.type == "Succeed" || this.type == "Fail");
    }

    setComment(comment : string) {
        this.comment = comment;
    }

    setInputPath(path : string) : boolean {
        if (this.type == "Fail") {
            return false;
        }
        this.inputPath = path;
    }

    setOutputPath(path : string) : boolean {
        if (this.type == "Fail") {
            return false;
        }
        this.outputPath = path;
    }

    setParameters(params : string) : boolean {
        let allowed = ["Pass", "Task", "Parallel", "Map"];
        if (allowed.indexOf(this.type) > -1) {
            this.parameters = params;
            return true;
        }
        return false;
    }

    setResultPath(path : string) : boolean {
        let allowed = ["Pass", "Task", "Parallel", "Map"];
        if (allowed.indexOf(this.type) > -1) {
            this.resultPath = path;
            return true;
        }
        return false;
    }

    setRetry(retry : string) : boolean {
        let allowed = ["Task", "Parallel", "Map"];
        if (allowed.indexOf(this.type) > -1) {
            this.retry = retry;
            return true;
        }
        return false;
    }

    setCatch(caught : string) : boolean {
        let allowed = ["Task", "Parallel", "Map"];
        if (allowed.indexOf(this.type) > -1) {
            this.catch = caught;
            return true;
        }
        return false;
    }


    toJSONPairs() : string {
        let keys = Object.keys(this);

        return keys.reduce((result : string[], key : string) => {
            if (key != 'machine' && key != 'name') {
                result.push(`"${key.charAt(0).toUpperCase() + key.slice(1)}":"${this[key]}"`)
            }
            return result;
        }, []).join(',')
    }

    toJSON(pairs ?: string) {
        return `{${pairs || this.toJSONPairs()}}`
    }

    execute(input : {}) : {} {
        console.log("Input:");
        console.log(input);
        return input;
    }
}