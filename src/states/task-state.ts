import {State} from "./state";

export class TaskState extends State {

    private timeoutSeconds ?: number = 60;
    private heartbeatSeconds ?: number;

    constructor(name : string, private resource : string) {
        super(name, "Task");
        this.setNext();
    }

    setTimeoutSeconds(seconds : number) {
        this.timeoutSeconds = Math.floor(Math.abs(seconds));
    }

    setHeartbeatSeconds(seconds : number) {
        this.heartbeatSeconds = Math.floor(Math.abs(seconds));
    }

    execute(input : {}) : {} {
        super.execute(input);
        return {"resource": this.resource}
    }

    setCatch(next: string, errors?: string[]): boolean {
        return super.setCatch(next, ["States.ALL"]);
    }
}