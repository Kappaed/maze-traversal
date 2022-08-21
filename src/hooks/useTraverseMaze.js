import React from "react";
import useAStarTraversal from "./useAStarTraversal";
import useDFSTraversal from "./useDFSTraversal";
import useBFSTraversal from "./useBFSTraversal";
import UtilityFS from "../utility";

const useTraverseMaze = (
  traversalInfo,
  traverseMethod,
  mazeInfo,
  newAverageSteps
) => {
  useAStarTraversal(mazeInfo, traversalInfo, traverseMethod, newAverageSteps);
  useBFSTraversal(mazeInfo, traversalInfo, traverseMethod, newAverageSteps);
  useDFSTraversal(mazeInfo, traversalInfo, traverseMethod, newAverageSteps);
};

export default useTraverseMaze;
