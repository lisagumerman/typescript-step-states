import {TaskState} from "../states/task-state";

const basicTask = new TaskState("TestState", "uri:test:task");

test("correct type", () => {
    expect(basicTask.toJSON().indexOf(`"Type":"Task"`)).toBeGreaterThan(-1);
});

test("has resource", () => {
    expect(basicTask.toJSON().indexOf(`"Resource":"uri:test:task"`)).toBeGreaterThan(-1);
});

test("can have timeoutseconds", () => {
    basicTask.setTimeoutSeconds(51);

    expect(basicTask.toJSON().indexOf(`"TimeoutSeconds":"51"`)).toBeGreaterThan(-1);
});

test("can have weird timeoutseconds", () => {
    basicTask.setTimeoutSeconds(-57.6);

    expect(basicTask.toJSON().indexOf(`"TimeoutSeconds":"57"`)).toBeGreaterThan(-1);
});

test("can have heartbeatseconds", () => {
    basicTask.setHeartbeatSeconds(12);

    expect(basicTask.toJSON().indexOf(`"HeartbeatSeconds":"12"`)).toBeGreaterThan(-1);
});

test("can have weird heartbeatseconds", () => {
    basicTask.setHeartbeatSeconds(-21.78);

    expect(basicTask.toJSON().indexOf(`"HeartbeatSeconds":"21"`)).toBeGreaterThan(-1);
});