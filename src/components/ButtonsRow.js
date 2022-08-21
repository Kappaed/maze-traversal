import React, { useEffect, useState } from "react";
import Styles from "./ButtonsRow.module.css";
import SelectionMenu from "./SelectionMenu";

const ButtonsRow = (props) => {
  const { traversalInfo, mazeDispatch, generateInfo, traversalMethodInfo } =
    props;
  const canStart = !traversalInfo.canTraverse && !generateInfo.startGenerate;
  const cantStart = traversalInfo.canTraverse || generateInfo.startGenerate;
  const TraversalClickHandler = () => {
    // console.log("hello", canStartGenerate);
    if (canStart) {
      mazeDispatch({ type: "clear-colors" });
      traversalInfo.setCanTraverse(true);
    }
  };

  const generateClickHandler = () => {
    if (canStart) {
      mazeDispatch({ type: "reset" });
      generateInfo.setStartGenerate(true);
    }
  };

  return (
    <div className={Styles.container}>
      <button
        className={`${Styles.button} ${Styles["button-pink"]}`}
        onClick={generateClickHandler}
        disabled={cantStart}
      >
        Reset Graph
      </button>
      <button
        className={`${Styles.button} ${Styles["button-orange"]}`}
        onClick={TraversalClickHandler}
        disabled={cantStart}
      >
        Begin Traversal
      </button>
      <SelectionMenu
        selectionState={traversalMethodInfo}
        cantHover={cantStart}
      />
    </div>
  );
};

export default ButtonsRow;
