import {StateMachine} from "./state-machine";
import {PassState} from "./states/pass-state";

const stateMachine = new StateMachine();
const firstPass = new PassState();
firstPass.setComment("Just a first pass");
stateMachine.addState("FirstPass", firstPass);

stateMachine.execute({"key": "value"});