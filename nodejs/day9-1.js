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
  const dips = [];
  input.forEach((rowItem, row) => {
    rowItem.forEach((item, col) => {
      if (isSmaller(input, item, row, col, height, width)) dips.push(item);
    });
  });

  console.log(dips.reduce((acc, item) => acc + item + 1, 0));
}

function isSmaller(arr, item, row, col, height, width) {
  return (
    item <
    Math.min(
      col - 1 >= 0 ? arr[row][col - 1] : 10,
      col + 1 < width ? arr[row][col + 1] : 10,
      row - 1 >= 0 ? arr[row - 1][col] : 10,
      row + 1 < height ? arr[row + 1][col] : 10
    )
  );
}
