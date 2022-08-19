import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "change-color":
      // console.log(action);
      const coord = action?.coord;
      if (coord == null) {
        return;
      }

      let [y, x] = coord;
      const copy = [];
      for (let i = 0; i < state.length; i++) {
        copy.push(state[i].slice());
      }
      copy[y][x] = { ...copy[y][x], color: action.color };
      return copy;
    default:
      break;
  }
  return state;
};

const initialState = [];
for (let i = 0; i < 10; i++) {
  const row = [];
  for (let j = 0; j < 10; j++) {
    row.push({
      coord: `${i},${j}`,
      left: true,
      right: true,
      top: true,
      bottom: true,
    });
  }
  initialState.push(row);
}
const useMaze = () => {
  const [mazeState, dispatch] = useReducer(reducer, initialState);
  return {
    mazeState,
    dispatch,
  };
};
export default useMaze;
