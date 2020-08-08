import {PassState} from "../states/pass-state";

const basicPass = new PassState("TestState");

test("correct type", () => {
   expect(basicPass.toJSON().indexOf(`"Type":"Pass"`)).toBeGreaterThan(-1);
});