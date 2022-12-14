import { useState } from "react";
import "./App.css";
import Maze from "./components/Maze";
import useGenerateMaze from "./hooks/useGenerateMaze";
import useTraverseMaze from "./hooks/useTraverseMaze";
import useMaze from "./hooks/useMaze";
import ButtonsRow from "./components/ButtonsRow";
import DataSummary from "./components/DataSummary";
import utilityFs from "./utility";

function App() {
  //initially startGenerate is set to True, set default to False and toggle with button later.
  const { mazeState, dispatch } = useMaze();
  const [canTraverse, setCanTraverse] = useState(false);
  const [traversalMethod, setTraversalMethod] = useState(
    utilityFs.availableTraversalMethods.aStar
  );
  const [averagePathSteps, setAveragePathSteps] = useState({
    shortest_path: { val: 0, num_runs: 0 },
    dfs_path: { val: 0, num_runs: 0 },
    bfs_path: { val: 0, num_runs: 0 },
    aStar: { val: 0, num_runs: 0 },
  });

  const newAverageSteps = (curr_val, key) => {
    // console.log(averagePathSteps.val + curr_val, averagePathSteps.num_runs + 1);
    console.log(key, curr_val);
    setAveragePathSteps((averagePathSteps) => ({
      ...averagePathSteps,
      [key]: {
        val: averagePathSteps[key].val + curr_val,
        num_runs: averagePathSteps[key].num_runs + 1,
      },
    }));
  };

  const { startGenerate, setStartGenerate } = useGenerateMaze(
    mazeState,
    dispatch
    // { setCanTraverse, setTraversalMethod }
  );

  useTraverseMaze(
    { canTraverse, setCanTraverse },
    traversalMethod,
    { ...mazeState, dispatch },
    newAverageSteps
  );

  return (
    <div className="App">
      <div class="title">Maze Traversal</div>
      <Maze data={mazeState.maze} />
      <ButtonsRow
        generateInfo={{ startGenerate, setStartGenerate }}
        traversalInfo={{ setCanTraverse, canTraverse }}
        traversalMethodInfo={{
          selectionState: traversalMethod,
          setSelectionState: setTraversalMethod,
        }}
        mazeDispatch={dispatch}
      />
      <DataSummary averagePathValue={averagePathSteps} />
    </div>
  );
}

export default App;
