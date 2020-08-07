export class State {

    private type : string;

    private comment ?: string;

    constructor(taskType : string) {
        this.type = taskType;
    }

    setComment(comment : string) {
        this.comment = comment;
    }

    toJSONPairs() : string {
        let content = `"Type":"${this.type}"`;

        if (this.comment) {
            content += `,"Comment":"${this.comment}"`
        }

        return content;
    }

    toJSON(pairs ?: string) {
        return `{${pairs || this.toJSONPairs()}}`
    }
}