import React from "react";
import styles from "./SelectionMenu.module.css";
import utilityFS from "../utility";
import classNames from "classnames";

const SelectionMenu = (props) => {
  const { selectionState, setSelectionState } = props.selectionState;
  const containerClassNames = classNames({
    [styles.container]: true,
    [styles.noHover]: props.cantHover,
  });
  const ssMap = utilityFS.traversalText;
  return (
    <div className={containerClassNames}>
      <div className={styles.selectedItem}>{ssMap[selectionState]}</div>
      <div className={styles.selectionMenu}>
        <button
          className={styles.selectionMenuItem}
          onClick={() =>
            setSelectionState(utilityFS.availableTraversalMethods.aStar)
          }
        >
          {ssMap[utilityFS.availableTraversalMethods.aStar]}
        </button>
        <button
          className={styles.selectionMenuItem}
          onClick={() =>
            setSelectionState(utilityFS.availableTraversalMethods.bfs)
          }
        >
          {ssMap[utilityFS.availableTraversalMethods.bfs]}
        </button>
        <button
          className={styles.selectionMenuItem}
          onClick={() =>
            setSelectionState(utilityFS.availableTraversalMethods.dfs)
          }
        >
          {ssMap[utilityFS.availableTraversalMethods.dfs]}
        </button>
      </div>
    </div>
  );
};

export default SelectionMenu;
