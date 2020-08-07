import {State} from "./states/state";

export class StateMachine {

    private states : {[key: string] : State} = {};
    private startAt : string = null;
    private comment ?: string;
    private version : string = "1.0";
    private timeoutSeconds ?: number;


    addState(state : State) : boolean {
        let key = state.getName();

        if (key.length > 128) {
            return false;
        }

        if (this.states[key]) {
            return false;
        } else {
            state.setMachine(this);
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
            let currentState = this.states[this.startAt];
            this.continue(currentState, input);
            console.log("ENDING");
            console.log("EXECUTED:");
            console.log(this.toJSON());
        } else {
            console.log("UNABLE TO START -- STATE MACHINE INVALID")
        }
    }

    continue(state : State, input : {}) {
        //TODO make name a property on State bc otherwise logging & assigning is irritating
        console.log("State:")
        console.log(state.toJSON());
        let nextInput = state.execute(input);
        let next = state.getNext();
        if (next instanceof State) {
            this.continue(next, nextInput);
        }
    }

    getState(name : string) : State {
        return this.states[name] || null;
    }
}