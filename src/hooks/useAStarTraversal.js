import React, { useEffect, useRef } from "react";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import utilityFS from "../utility.js";
import { useContext } from "react";

const heuristic = (coord, dest) =>
  Math.abs(coord[0] - dest[0]) + Math.abs(coord[1] - dest[1]);

const useAStarTraversal = (
  mazeState,
  traversalState,
  traversalMethod,
  newAverageSteps
) => {
  const { canTraverse, setCanTraverse } = traversalState;
  const { maze, src, dest, currPos, dispatch } = mazeState ?? {
    maze: null,
    src: null,
    dest: null,
    currPos: null,
    dispatch: null,
  };
  const openList = useRef(MinPriorityQueue.fromArray([[0, src]]));
  const gValues = useRef({ [JSON.stringify(src)]: 0 });
  const parents = useRef({});
  const algSteps = useRef(0);
  useEffect(() => {
    if (!canTraverse) {
      openList.current = MinPriorityQueue.fromArray([[0, src]]);
      gValues.current = { [JSON.stringify(src)]: 0 };
      parents.current = {};
      algSteps.current = 0;
    }
  }, [canTraverse, src]);

  useEffect(() => {
    if (
      canTraverse &&
      traversalMethod === utilityFS.availableTraversalMethods.aStar
    ) {
      const tID = setTimeout(() => {
        if (openList.current.isEmpty()) {
          // console.log(currPos, dest, openList.current.toArray());
          // console.log(gValues.current);
          // console.log("blah");
          setCanTraverse(false);
          return;
        }
        algSteps.current += 1;
        const [_f, sourceCoord] = openList.current.dequeue();
        dispatch({ type: "move-pos", new: sourceCoord });
        const potentialNeighbours = utilityFS.getNeighs(sourceCoord, maze);
        const canTraverseNeighbours = utilityFS.filterCanTraverse(
          potentialNeighbours,
          sourceCoord,
          maze
        );

        if (utilityFS.twoCoordsEqual(dest, sourceCoord)) {
          const pathSrcToDest = utilityFS.getPath(src, dest, parents.current);
          dispatch({
            type: "change-color-multi",
            coords: pathSrcToDest,
            color: "pink",
          });
          // console.log(gValues.current[JSON.stringify(dest)]);
          // console.log(algSteps.current);
          newAverageSteps(pathSrcToDest.length, "shortest_path");
          newAverageSteps(algSteps.current, "aStar");
          setCanTraverse(false);
          return;
        }

        canTraverseNeighbours.forEach((neigh) => {
          const g_value = gValues.current[JSON.stringify(sourceCoord)] + 1;
          const h_value = heuristic(neigh, dest);
          // console.log(h_value, neigh);
          // console.log(g_value, h_value, neigh, sourceCoord);
          if (
            !(JSON.stringify(neigh) in gValues.current) ||
            gValues.current[JSON.stringify(neigh)] > g_value
          ) {
            gValues.current[JSON.stringify(neigh)] = g_value;
            openList.current.enqueue([g_value + h_value, neigh]);
            parents.current[JSON.stringify(neigh)] = sourceCoord;
          }
        });
      }, 100);
      return () => clearTimeout(tID);
    }
  }, [canTraverse, traversalMethod, dest, dispatch, setCanTraverse, maze, src]);

  return {
    shortestPathSteps: gValues.current?.dest,
    algorithmSteps: algSteps.current,
  };
};

export default useAStarTraversal;
