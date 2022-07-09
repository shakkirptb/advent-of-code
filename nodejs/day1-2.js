const fs = require("fs");
const content = fs.readFileSync("input-1", "utf8");

processFile(content);

function processFile(content) {
  const input = content
    .split("\n")
    .filter((i) => Boolean(i) ?? i === 0)
    .map((i) => Number(i));
  let count = 0;
  const length = input.length;
  let prevSum = threeSum(input, 0);
  for (let i = 1; i + 3 <= length; i++) {
    const nowSum = threeSum(input, i);
    if (nowSum > prevSum) {
      count++;
    }
    prevSum = nowSum;
  }
  console.log(count);
}
function threeSum(input, i) {
  return input[i] + input[i + 1] + input[i + 2];
}
