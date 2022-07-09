const fs = require("fs");
const content = fs.readFileSync("input", "utf8");

processFile(content);

function processFile(content) {
  const input = content.split("\n").filter((i) => Boolean(i) ?? i === 0);
  let count = 0;
  input.forEach((item, i) => {
    if (i !== 0 && Number(item) > Number(input[i - 1])) {
      count++;
    }
  });
  console.log(count);
}
