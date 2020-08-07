export class State {

    readonly type : string;

    private comment ?: string;

    private inputPath ?: string;
    private outputPath ?: string;
    private parameters ?: string;
    private resultPath ?: string;

    private next ?: string;

    retry ?: string;
    catch ?: string;

    constructor(taskType : string) {
        this.type = taskType;
        this.setNext();
    }

    setNext(next ?: string) : boolean {
        let allowed = ["Pass", "Task","Wait", "Parallel", "Map"];
        if (allowed.indexOf(this.type) > -1) {
            this.next = next || "End";
            return true;
        }
        return false;
    } //TODO validate w/ state machine validity of next value

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

        return keys.map((key : string) => {
            return `"${key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}:${this[key]}"`
        }).join(',')
    }

    toJSON(pairs ?: string) {
        return `{${pairs || this.toJSONPairs()}}`
    }
}