import React, { useEffect, useRef, useState } from "react";
import Queue from "../structures/queue";
import utilityFS from "../utility";

const useBFSTraversal = (
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
  const queue = useRef(new Queue());
  const parents = useRef({});
  const algSteps = useRef(0);

  useEffect(() => {
    if (!canTraverse) {
      visited.current = new Set();
      queue.current = new Queue();
      queue.current.enqueue(src);
      algSteps.current = 0;
    }
  }, [canTraverse, src]);

  useEffect(() => {
    if (
      canTraverse &&
      traversalMethod === utilityFS.availableTraversalMethods.bfs
    ) {
      const tID = setTimeout(() => {
        if (queue.current.length === 0) {
          const pathSrcToDest = utilityFS.getPath(src, dest, parents.current);
          dispatch({
            type: "change-color-multi",
            coords: pathSrcToDest,
            color: "pink",
          });
          setCanTraverse(false);
        }
        const sourceCoord = queue.current.dequeue();
        dispatch({ type: "move-pos", new: sourceCoord });
        algSteps.current += 1;
        visited.current.add(JSON.stringify(sourceCoord));
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
          newAverageSteps(algSteps.current, "bfs_path");
          setCanTraverse(false);
          return;
        }

        canTraverseNeighbours.forEach((neigh) => {
          if (!visited.current.has(JSON.stringify(neigh))) {
            parents.current[JSON.stringify(neigh)] = sourceCoord;
            queue.current.enqueue(neigh);
          }
        });
      }, 100);
      return () => clearTimeout(tID);
    }
  }, [traversalMethod, dest, dispatch, maze, canTraverse, setCanTraverse, src]);
  return {};
};

export default useBFSTraversal;
