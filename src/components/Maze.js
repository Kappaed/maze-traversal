import React from "react";
import styles from "./Maze.module.css";
import classNames from "classnames";

const Maze = (props) => {
  let i = 0;
  return (
    <div className={styles.container}>
      {props.data.reduce((agg, row) => {
        const mappedRow = row.map((cell, j) => {
          const classes = classNames({
            [styles.cell]: true,
            [styles.rlLeft]: !cell.left,
            [styles.rRight]: !cell.right,
            [styles.rBottom]: !cell.bottom,
            [styles.rTop]: !cell.top,
            [styles.orange]: cell.color === "orange",
            [styles.pink]: cell.color === "pink",
            [styles.black]: cell.color === "black",
            [styles.white]: cell.color === "white",
            [styles.gray]: cell.color === "gray",
          });

          // console.log(
          //   styles.cell,
          //   styles.rlLeft,
          //   styles.rRight,
          //   styles.rBottom,
          //   styles.rTop,
          //   styles.orange,
          //   styles.pink,
          //   styles.black,
          //   styles.white,
          //   styles.gray
          // );

          return <div className={classes} key={`(${i},${j})`} />;
        });
        i += 1;
        return agg.concat(mappedRow);
      }, [])}
    </div>
  );
};

export default Maze;
