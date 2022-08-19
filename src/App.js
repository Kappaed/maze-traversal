import { useEffect } from "react";
import "./App.css";
import Maze from "./components/Maze";
import useMaze from "./hooks/useMaze";

function App() {
  const { mazeState, dispatch } = useMaze();

  return <div className="App">{<Maze data={mazeState} />}</div>;
}

export default App;
