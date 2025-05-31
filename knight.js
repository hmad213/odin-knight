const KNIGHT_TRANSLATIONS = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

function getValidMoves(x, y) {
  let arr = [];
  for (let i = 0; i < KNIGHT_TRANSLATIONS.length; i++) {
    if (isValid(KNIGHT_TRANSLATIONS[i][0] + x, KNIGHT_TRANSLATIONS[i][1] + y))
      arr.push([KNIGHT_TRANSLATIONS[i][0] + x, KNIGHT_TRANSLATIONS[i][1] + y]);
  }
  return arr;
}

function isValid(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function knightMoves(start, end) {
  if (!(isValid(...start) && isValid(...end))) {
    console.log("Invalid coordinates!");
    return;
  }

  if (start == end) {
    return start;
  }

  let queue = [start];
  let visited = new Set();
  let parent = {};
  let found = false;

  while (!found) {
    let coords = queue.shift();

    if (coords[0] == end[0] && coords[1] == end[1]) found = true;
    else {
      let arr = getValidMoves(coords[0], coords[1]);
      arr.forEach((node) => {
        if (!visited.has(`${node[0]}, ${node[1]}`)) {
          visited.add(`${node[0]}, ${node[1]}`);
          parent[node] = coords;
          queue.push(node);
        }
      });
    }
  }
  let path = [end];
  while (path[0][0] != start[0] || path[0][1] != start[1]) {
    path.unshift(parent[path[0]]);
  }

  console.log("You made it in " + path.length + " moves!");
  for (let i = 0; i < path.length; i++) {
    console.log(path[i]);
  }

  return path;
}

knightMoves([0, 0], [7, 7]);
