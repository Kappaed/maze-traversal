import React, { useContext } from "react";
import styles from "./DataSummary.module.css";

const calcAvg = (sm, dvr) => (dvr !== 0 ? (sm / dvr).toFixed(2) : 0);
const DataSummary = (props) => {
  const { averagePathValue } = props;
  const { shortest_path, aStar, bfs_path, dfs_path } = averagePathValue;
  const shortest_path_average = calcAvg(
    shortest_path.val,
    shortest_path.num_runs
  );
  const aStar_avg = calcAvg(aStar.val, aStar.num_runs);
  const dfs_avg = calcAvg(dfs_path.val, dfs_path.num_runs);
  const bfs_avg = calcAvg(bfs_path.val, bfs_path.num_runs);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {`avg no. of shortest path steps: ${shortest_path_average}`}
      </div>
      <div
        className={styles.text}
      >{`avg no. of A* iterations: ${aStar_avg}`}</div>
      <div
        className={styles.text}
      >{`avg no. of BFS iterations: ${bfs_avg}`}</div>
      <div
        className={styles.text}
      >{`avg no. of DFS iterations: ${dfs_avg}`}</div>
    </div>
  );
};

export default DataSummary;
