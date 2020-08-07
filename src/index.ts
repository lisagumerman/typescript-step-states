import {StateMachine} from "./state-machine";
import {PassState} from "./states/pass-state";
import {TaskState} from "./states/task-state";

const stateMachine = new StateMachine();
const firstPass = new PassState("FirstPass");
firstPass.setComment("Just a first pass");
stateMachine.addState(firstPass);

const someTask = new TaskState("SomeTask", "uri:task:HelloWorld");
stateMachine.addState(someTask);
someTask.setNext(firstPass.getName());

stateMachine.execute({"key": "value"});