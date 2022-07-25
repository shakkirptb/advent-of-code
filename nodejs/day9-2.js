const fs = require("fs");
const content = fs.readFileSync("input-9", "utf8");

processFile(content);

function processFile(content) {
  const input = content
    .split("\n")
    .filter(Boolean)
    .map((item) => item.split("").map(Number));
  const height = input.length;
  const width = input[0].length;

  console.log("input", input, height, width);
  let basins = [0, 0, 0];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const basinSize = branchAndSearch(input, i, j, height, width);
      if (basinSize >= basins[0]) {
        basins.push(basinSize);
        basins = basins.sort((a, b) => a - b).slice(1);
      }
    }
  }

  console.log("result", basins, basins[0] * basins[1] * basins[2]);
}

function branchAndSearch(arr, row, col, height, width) {
  if (row < 0 || row >= height || col < 0 || col >= width) return 0;

  if (arr[row][col] < 9) {
    arr[row][col] = 9;
    return (
      1 +
      branchAndSearch(arr, row + 1, col, height, width) +
      branchAndSearch(arr, row - 1, col, height, width) +
      branchAndSearch(arr, row, col + 1, height, width) +
      branchAndSearch(arr, row, col - 1, height, width)
    );
  }
  return 0;
}
