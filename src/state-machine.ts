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
        this.timeoutSeconds = Math.floor(Math.abs(seconds));
    }


    toJSON() : string {
        if (this.isValid()) {

            let keys = Object.keys(this);

            let content = keys.reduce((result : string[], key : string) => {
                if (key != 'states') {
                   result.push(`"${key.charAt(0).toUpperCase() + key.slice(1)}":"${this[key]}"`)
                }
                return result;
            }, []);

            let stateKeys = Object.keys(this.states);
            let stateJSON = stateKeys.map((key : string) => {
                return `{"${key}":${this.states[key].toJSON()}}`
            }).join(',');
            content.push(`"States":${stateJSON}`);

            return `{${content.join(',')}}`
        }


        return null;
    }

    isValid() : boolean {
        return !!this.startAt
    }

    execute(input : {}) {
        if (this.isValid()) {
            console.log("STARTING");
            console.log(this.states[this.startAt].execute(input, this));
            console.log("ENDING");
            console.log("EXECUTED:");
            console.log(this.toJSON());
        } else {
            console.log("UNABLE TO START -- STATE MACHINE INVALID")
        }
    }

}