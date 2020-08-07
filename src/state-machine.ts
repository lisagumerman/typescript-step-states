import {State} from "./states/state";

export class StateMachine {

    private states : {[key: string] : State} = {};
    private startAt : string = null;
    private comment ?: string;
    private version : string = "1.0";
    private timeoutSeconds ?: number;


    addState(key : string, state : State) : boolean {
        if (key.length > 128) {
            return false;
        }

        if (this.states[key]) {
            return false;
        } else {
            this.states[key] = state;
            if (!this.startAt) {
                this.startAt = key; //set the first one so it's never null if we have a step
            }
        }
    }

    setStartAt(step : string) : boolean {
        if (this.states == {} || !this.states[step]) {
            return false;
        } else {
            this.startAt = step;
            return true;
        }
    }

    setComment(comment : string) {
        this.comment = comment;
    }

    setVersion(version : string) {
        this.version = version;
    }

    setTimeoutSeconds(seconds : number) {
        this.timeoutSeconds = Math.floor(seconds);
    }


    toJSON() : string {
        if (this.startAt) {
            let content = `"StartAt":"${this.startAt}","Version":"${this.version}"`;
            if (this.comment) {
                content += `,"Comment":"${this.comment}"`
            }
            if (this.timeoutSeconds) {
                content += `,"TimeoutSeconds":"${this.timeoutSeconds}"`
            }

            let stateKeys = Object.keys(this.states);
            let stateJSON = stateKeys.map((key : string) => {
                return this.states[key].toJSON()
            }).join(',');
            content += `,"States":${stateJSON}`;

            return `{${content}}`
        }


        return null;
    }




}