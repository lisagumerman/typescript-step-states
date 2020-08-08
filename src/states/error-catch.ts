import {State} from "./state";

export class ErrorCatch {

    next : string;
    state : State;

    constructor(private errorEquals : string[]) {
        this.setNext();
    }

    setNext(next ?: string) : boolean {
        if (next && this.state) {
            //unbeautiful validation
            if (this.state.getMachine() && this.state.getMachine().getState(next)) {
                this.next = next;
                return true;
            } else {
                return false;
            }
        } else {
            this.next = "End";
            return true;
        }
    }

    toJSON() : string {
        return `{${Object.keys(this).reduce((result : string[], key : string) => {
            if (key != 'state') {
                result.push(`"${key.charAt(0).toUpperCase() + key.slice(1)}":"${this[key]}"`)
            }
            return result;
        }, []).join(',')}}`
    }

}