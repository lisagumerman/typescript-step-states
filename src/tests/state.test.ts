import {PassState} from "../states/pass-state";
import {TaskState} from "../states/task-state";

const basicPass = new PassState("TestStatePass");
const basicTask = new TaskState("TestStateTask", "uri:test:task");

let states = [basicPass, basicTask];

test("states have names", () => {
    for (let state of states) {
        expect(state.getName()).toBe(`TestState${state.getType()}`)
    }
});

test("state names aren't serialized", () => {
    for (let state of states) {
        expect(state.toJSON().indexOf(`TestState${state.getType()}`)).toBe(-1)
    }
});

test("states can have a comment", () => {
    for (let state of states) {
        let comment = `commenting on ${state.getName()}`;
        state.setComment(comment);
        expect(state.toJSON().indexOf(`"Comment":"${comment}"`)).toBeGreaterThan(-1);
    }
});