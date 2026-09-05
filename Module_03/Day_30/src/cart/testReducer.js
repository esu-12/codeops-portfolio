import { initialState, cartReducer } from "./cartReducer.js";

const doroWat = {
  id: 1,
  name: "Doro Wat",
  price: 250
};

let state = initialState;

console.log("Starting state:", state);

state = cartReducer(state, {
  type: "ADD",
  dish: doroWat
});

console.log("After ADD:", state);

state = cartReducer(state, {
  type: "REMOVE",
  id: 1
});

console.log("After REMOVE:", state);

state = cartReducer(state, {
  type: "CLEAR"
});

console.log("After CLEAR:", state);