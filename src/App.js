import { useEffect } from "react";
import "./App.css";
import Maze from "./components/Maze";
import useGenerateMaze from "./hooks/useGenerateMaze";
import useMaze from "./hooks/useMaze";

function App() {
  //initially startGenerate is set to True, set default to False and toggle with button later.
  const { mazeState, dispatch } = useMaze();
  const { startGenerate, setStartGenerate } = useGenerateMaze(
    mazeState,
    dispatch
  );

  return <div className="App">{<Maze data={mazeState.maze} />}</div>;
}

export default App;
