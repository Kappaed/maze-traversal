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
  const aStarSteps = useAStarTraversal(
    mazeInfo,
    traversalInfo,
    traverseMethod,
    newAverageSteps
  );
  const BFSSteps = useBFSTraversal(
    mazeInfo,
    traversalInfo,
    traverseMethod,
    newAverageSteps
  );
  const DFSSteps = useDFSTraversal(
    mazeInfo,
    traversalInfo,
    traverseMethod,
    newAverageSteps
  );

  return { [UtilityFS.availableTraversalMethods.aStar]: aStarSteps };
};

export default useTraverseMaze;
