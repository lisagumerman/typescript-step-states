import {StateMachine} from "../state-machine";
import {PassState} from "../states/pass-state";
import {TaskState} from "../states/task-state";

const basicStateMachine = new StateMachine();
const firstPass = new PassState("FirstPass");
firstPass.setComment("Just a first pass");
basicStateMachine.addState(firstPass);

const someTask = new TaskState("SomeTask", "uri:task:HelloWorld");
basicStateMachine.addState(someTask);
someTask.setNext(firstPass.getName());

basicStateMachine.setStartAt(someTask.getName());

test("machines are invalid by default", () => {
    expect(new StateMachine().isValid()).toBeFalsy()
});

test("invalid machines don't serialize", () => {
    expect(new StateMachine().toJSON()).toBeNull()
});

test("machines have a version", () => {
    expect(basicStateMachine.toJSON().indexOf(`"Version":"1.0"`)).toBeGreaterThan(-1);
});

test("machines have a starting point", () => {
    expect(basicStateMachine.toJSON().indexOf(`"StartAt":"SomeTask"`)).toBeGreaterThan(-1);
});

test("machines can have timeout seconds", () => {
    basicStateMachine.setTimeoutSeconds(7);
    expect(basicStateMachine.toJSON().indexOf(`"TimeoutSeconds":"7"`)).toBeGreaterThan(-1);
});

test("machines can have weird timeout seconds", () => {
    basicStateMachine.setTimeoutSeconds(-24.9);
    expect(basicStateMachine.toJSON().indexOf(`"TimeoutSeconds":"24"`)).toBeGreaterThan(-1);
});