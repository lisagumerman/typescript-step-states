import {State} from "./state";
import {StateMachine} from "../state-machine";

export class TaskState extends State {

    private timeoutSeconds ?: number = 60;
    private heartbeatSeconds ?: number;

    constructor(private resource : string) {
        super("Task");
    }

    setTimeoutSeconds(seconds : number) {
        this.timeoutSeconds = Math.floor(Math.abs(seconds));
    }

    setHeartbeatSeconds(seconds : number) {
        this.heartbeatSeconds = Math.floor(Math.abs(seconds));
    }

    execute(input : {}) : {} {
        //TODO get next
        return {"resource": this.resource}
    }
}