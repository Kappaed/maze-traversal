import React, { useReducer, useState } from "react";
import utilityFs from "../utility";

const reducer = (state, action) => {
  switch (action.type) {
    case "clear-colors":
      const clearColorsCopy = state.maze((row) => row.slice());
      clearColorsCopy.forEach((row) => {
        row.forEach((cell, i) => {
          if (!(cell.color === "white")) {
            row[i].color = "white";
          }
        });
      });
      return { ...state, maze: clearColorsCopy };
    case "remove-border":
      const remove_border_copy = state.maze.map((row) => row.slice());
      const [coordY, coordX] = action.coord;
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
    case "change-color-multi":
      const coords = action?.coords;
      const color = action?.color;
      if (color == null) {
        console.log("no color given.");
        return state;
      }
      if (coords == null) {
        console.log("no coords given");
        return state;
      }
      const change_color_multi_copy = state.maze.map((row) => row.slice());
      coords.forEach((coord) => {
        change_color_multi_copy[coord[0]][coord[1]].color = color;
      });
      return { ...state, maze: change_color_multi_copy };

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

      copied[state.currPos[0]][state.currPos[1]].color = "orange";
      copied[new_coord[0]][new_coord[1]].color = "black";

      return { ...state, maze: copied, currPos: new_coord };
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
    case "reset":
      const newInitialState = {
        maze: [],
        src: null,
        currPos: null,
        dest: null,
      };

      utilityFs.initMaze(newInitialState);

      return newInitialState;
    default:
      return state;
  }
};

const initialState = { maze: [], src: null, currPos: null, dest: null };
utilityFs.initMaze(initialState);

const useMaze = () => {
  const [mazeState, dispatch] = useReducer(reducer, initialState);
  return {
    mazeState,
    dispatch,
  };
};

export default useMaze;
