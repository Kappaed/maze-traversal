import React, { useReducer, useState } from "react";
import utilityFs from "../utility";

const reducer = (state, action) => {
  switch (action.type) {
    case "remove-border":
      const remove_border_copy = state.maze.map((row) => row.slice());
      const [coordY, coordX] = action.coord;
      const toColor = action.color;
      const direc = action.dir;
      remove_border_copy[coordY][coordX][direc] = false;
      return { ...state, maze: remove_border_copy };
    case "remove-borders":
      const remove_borders_copy = state.maze.map((row) => row.slice());
      const [fromY, fromX] = action.from;
      const [toY, toX] = action.to;
      const dir = utilityFs.getDirec(action.from, action.to);
      if (dir == null) {
        return state;
      }
      switch (dir) {
        case "up":
          remove_borders_copy[fromY][fromX].top = false;
          remove_borders_copy[toY][toX].bottom = false;
          break;
        case "down":
          remove_borders_copy[fromY][fromX].bottom = false;
          remove_borders_copy[toY][toX].top = false;
          break;
        case "left":
          remove_borders_copy[fromY][fromX].left = false;
          remove_borders_copy[toY][toX].right = false;
          break;
        case "right":
          remove_borders_copy[fromY][fromX].right = false;
          remove_borders_copy[toY][toX].left = false;
          break;
        default:
          break;
      }
      return { ...state, maze: remove_borders_copy };
    case "move-pos":
      const new_coord = action?.new;
      const copied = state.maze.map((row) => row.slice());
      if (new_coord == null) {
        console.log("missing new coordinates for bot.");
        return state;
      }
      if (state.currPos == null) {
        console.log("missing current coordinates for bot.");
        return state;
      }
      copied[state.currPos[0]][state.currPos[1]].color = "white";
      copied[new_coord[0]][new_coord[1]].color = "black";

      return { ...state, maze: copied, src: new_coord };
    case "change-color":
      // console.log(action);
      const coord = action?.coord;
      if (coord == null) {
        return state;
      }

      let [y, x] = coord;
      const copy = state.maze.map((row) => row.slice());
      copy[y][x] = { ...copy[y][x], color: action.color };
      return { ...state, maze: copy };
    case "clear":
      const arrCopy = state.maze.map((row) => row.slice());
      arrCopy.forEach((row, i) => {
        row.forEach((cell, j) => {
          arrCopy[i][j] = {
            ...arrCopy[i][j],
            color: "gray",
            bottom: true,
            top: true,
            left: true,
            right: true,
          };
        });
      });

      return { ...state, maze: arrCopy };
    default:
      return state;
  }
};

const initialState = { maze: [], src: null, currPos: null };
utilityFs.initMaze(initialState);

const useMaze = () => {
  const [mazeState, dispatch] = useReducer(reducer, initialState);
  return {
    mazeState,
    dispatch,
  };
};

export default useMaze;
