import { useEffect, useRef, useState } from "react";
import utilityFs from "../utility";
import Queue from "../structures/queue";

const useGenerateMaze = (mData, dispatch) => {
  const [startGenerate, setStartGenerate] = useState(true);
  const visited = useRef(new Set());
  const { src, maze } = mData;
  const potential = useRef(new Set([JSON.stringify(src)]));
  const twoRecent = useRef(new Queue());

  useEffect(() => {
    if (!startGenerate) {
      visited.current = new Set();
      potential.current = new Set([JSON.stringify(src)]);
      twoRecent.current = new Queue();
    }
  }, [startGenerate, src]);
  useEffect(() => {
    const tID = setTimeout(() => {
      if (startGenerate) {
        // console.log("test");
        if (potential.current.size < 1) {
          // console.log(maze, src);
          while (twoRecent.current.length > 0) {
            // console.log(twoRecent);
            const poppedCoord = twoRecent.current.dequeue();
            dispatch({
              type: "change-color",
              coord: poppedCoord,
              color: "white",
            });
          }
          setStartGenerate(false);
          // setCanTraverse(true);
          // setTraversalMethod(utilityFs.availableTraversalMethods.aStar);
          return;
        }
        const potential_arr = [...potential.current];
        let next_source = potential_arr[utilityFs.getRandomIdx(potential_arr)];
        potential.current.delete(next_source);

        if (next_source in visited.current) {
          return;
        }

        next_source = JSON.parse(next_source);
        if (twoRecent.current.length >= 2) {
          const poppedCoord = twoRecent.current.dequeue();
          dispatch({
            type: "change-color",
            coord: poppedCoord,
            color: "white",
          });
        }
        twoRecent.current.enqueue(next_source);

        const neighbors = utilityFs.getNeighs(next_source, maze);
        // console.log(neighbors.map((coord) => maze[coord[0]][coord[1]]));
        const hasTraversed = neighbors.filter((neigh) =>
          visited.current.has(JSON.stringify(neigh))
        );

        const toTraverse = neighbors.filter(
          (neigh) => !visited.current.has(JSON.stringify(neigh))
        );
        // console.log(hasTraversed, next_source, src);
        if (hasTraversed.length > 0) {
          const randomVisited =
            hasTraversed[utilityFs.getRandomIdx(hasTraversed)];
          dispatch({
            type: "remove-borders",
            from: randomVisited,
            to: next_source,
          });
        }

        dispatch({ type: "change-color", coord: next_source, color: "orange" });

        toTraverse.forEach((neigh) => {
          if (!visited.current.has(JSON.stringify(neigh))) {
            potential.current.add(JSON.stringify(neigh));
            dispatch({ type: "change-color", coord: neigh, color: "pink" });
          }
        });

        visited.current.add(JSON.stringify(next_source));
      }
    }, 20);
    return () => clearTimeout(tID);
  }, [startGenerate, dispatch, maze]);

  return { startGenerate, setStartGenerate };
};

export default useGenerateMaze;
