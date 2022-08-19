import { useEffect, useRef, useState } from "react";
import utilityFs from "../utility";

const useGenerateMaze = (mData, dispatch) => {
  const [startGenerate, setStartGenerate] = useState(true);
  const visited = useRef(new Set());
  const { src, maze } = mData;
  const potential = useRef(new Set([JSON.stringify(src)]));

  useEffect(() => {
    const tID = setTimeout(() => {
      if (startGenerate) {
        if (potential.current.size < 1) {
          // console.log(maze, src);
          setStartGenerate(false);
          return;
        }
        let next_source = [...potential.current].reduce((agg, curr) =>
          agg > curr ? curr : agg
        );
        potential.current.delete(next_source);

        if (next_source in visited.current) {
          return;
        }
        next_source = JSON.parse(next_source);

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
        } else {
          const edgeDirec = utilityFs.getEdgeDirection(next_source);
          dispatch({
            type: "remove-border",
            coord: next_source,
            dir: edgeDirec,
          });
        }

        dispatch({ type: "change-color", coord: next_source, color: "white" });

        toTraverse.forEach((neigh) => {
          if (!visited.current.has(JSON.stringify(neigh))) {
            potential.current.add(JSON.stringify(neigh));
            dispatch({ type: "change-color", coord: neigh, color: "pink" });
          }
        });

        visited.current.add(JSON.stringify(next_source));
      }
    }, 50);
    return () => clearTimeout(tID);
  }, [startGenerate, dispatch, maze]);

  return { startGenerate, setStartGenerate };
};

export default useGenerateMaze;
