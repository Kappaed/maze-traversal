import React, { useEffect, useRef } from "react";
import utilityFS from "../utility";

const useDFSTraversal = (
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

  const visited = useRef(new Set());
  const stack = useRef([]);
  const parents = useRef({});
  const shortestPathlength = useRef(0);
  const algSteps = useRef(0);

  useEffect(() => {
    if (!canTraverse) {
      visited.current = new Set();
      stack.current = [src];
      shortestPathlength.current = 0;
      algSteps.current = 0;
      parents.current = {};
    }
  }, [canTraverse, src]);

  useEffect(() => {
    if (
      canTraverse &&
      traversalMethod === utilityFS.availableTraversalMethods.dfs
    ) {
      const tID = setTimeout(() => {
        if (stack.current.length === 0) {
          const pathSrcToDest = utilityFS.getPath(src, dest, parents.current);
          dispatch({
            type: "change-color-multi",
            coords: pathSrcToDest,
            color: "pink",
          });
          setCanTraverse(false);
        }
        const sourceCoord = stack.current.pop();
        dispatch({ type: "move-pos", new: sourceCoord });
        visited.current.add(JSON.stringify(sourceCoord));
        algSteps.current += 1;
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
          newAverageSteps(pathSrcToDest.length, "shortest_path");
          newAverageSteps(algSteps.current, "dfs_path");
          setCanTraverse(false);
          return;
        }

        canTraverseNeighbours.forEach((neigh) => {
          if (!visited.current.has(JSON.stringify(neigh))) {
            parents.current[JSON.stringify(neigh)] = sourceCoord;
            stack.current.push(neigh);
          }
        });
      }, 100);
      return () => clearTimeout(tID);
    }
  }, [
    traversalMethod,
    dest,
    dispatch,
    maze,
    canTraverse,
    setCanTraverse,
    src,
    newAverageSteps,
  ]);
};

export default useDFSTraversal;
