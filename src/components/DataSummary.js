import React, { useContext } from "react";
import styles from "./DataSummary.module.css";

const DataSummary = (props) => {
  console.log(props.averagePathValue);
  return (
    <div className={styles.container}>
      <div className="shortInfoStyle">
        {`avg no. of shortest path steps: ${props.averagePathValue["shortest_path"].val}`}
      </div>

      <div className="test">{`avg no. of A* iterations: ${props.averagePathValue["aStar"].val}`}</div>
      <div className="test">{`avg no. of BFS iterations: ${props.averagePathValue["bfs_path"].val}`}</div>
      <div className="blah">{`avg no. of DFS iterations: ${props.averagePathValue["dfs_path"].val}`}</div>
    </div>
  );
};

export default DataSummary;
