const getRandomIdx = (arr) => Math.floor(Math.random() * arr.length);
const getRandomMazeCoord = (maze) => {
  const candidates = [];
  for (let i = 0; i < maze[0].length; i++) {
    if (i > 0 && i < maze[0].length) {
      candidates.push([0, i]);
      candidates.push([maze.length - 1, i]);
    }
    candidates.push([i, 0]);
    candidates.push([i, maze[0].length - 1]);
  }
  const idx = getRandomIdx(candidates);
  return candidates[idx];
};
const getNeighs = (coord, maze) => {
  const neighs = [];
  const [y, x] = coord;
  [
    [y + 1, x],
    [y - 1, x],
    [y, x + 1],
    [y, x - 1],
  ].forEach((neigh) => {
    const [neigh_y, neigh_x] = neigh;
    const within_limits =
      neigh_y >= 0 &&
      neigh_y < maze.length &&
      neigh_x >= 0 &&
      neigh_x < maze[0].length;

    if (within_limits) {
      neighs.push(neigh);
    }
  });
  return neighs;
};
const getDirec = (fromCoord, toCoord) => {
  if (toCoord[0] - fromCoord[0] === 1) {
    return "down";
  } else if (toCoord[0] - fromCoord[0] === -1) {
    return "up";
  } else if (toCoord[1] - fromCoord[1] === 1) {
    return "right";
  } else if (toCoord[1] - fromCoord[1] === -1) {
    return "left";
  } else {
    console.log("something went wrong in deciding direction to move.");
    return null;
  }
};

const getEdgeDirection = (coord) => {
  const [y, x] = coord;
  if (y === 0) {
    return "top";
  } else if (y === 9) {
    return "bottom";
  } else if (x === 0) {
    return "left";
  } else if (x === 9) {
    return "right";
  } else {
    console.log("Something went wrong. Edge coordinate was not given.");
    return null;
  }
};

const getRandomDest = (srcCoord) => {
  const candidatePos = [...Array(10).keys()];
  const chosenCoord = candidatePos[getRandomIdx(candidatePos)];
  if (srcCoord[0] === 0) {
    return [[9, chosenCoord], "bottom"];
  } else if (srcCoord[0] === 9) {
    return [[0, chosenCoord], "top"];
  } else if (srcCoord[1] === 0) {
    return [[chosenCoord, 9], "right"];
  } else if (srcCoord[1] === 9) {
    return [[chosenCoord, 0], "left"];
  } else {
    console.log("invalid src coordinate given");
  }
};

const initMaze = (initialState) => {
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push({
        coord: `${i},${j}`,
        left: true,
        right: true,
        top: true,
        bottom: true,
        color: "gray",
      });
    }
    initialState.maze.push(row);
  }

  const [randomY, randomX] = getRandomMazeCoord(initialState.maze);
  initialState.src = [randomY, randomX];
  const [destCoords, peelDir] = getRandomDest([randomY, randomX]);
  initialState.maze[destCoords[0]][destCoords[1]][peelDir] = false;
  initialState.currPos = initialState.src;
};
const fs = {
  getRandomIdx,
  getRandomMazeCoord,
  getNeighs,
  getDirec,
  getEdgeDirection,
  getRandomDest,
  initMaze,
};
export default fs;
