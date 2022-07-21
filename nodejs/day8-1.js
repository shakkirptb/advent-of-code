const fs = require("fs");
const content = fs.readFileSync("input-8", "utf8");

processFile(content);

function processFile(content) {
  const input = content
    .split("\n")
    .filter((i) => i != "")
    .map((i) => [
      i
        .split("|")[0]
        .split(" ")
        .filter((x) => Boolean(x)),
      i.split("|")[1].split(" "),
    ]);

  console.log("input", input);

  let count = 0;
  input.forEach((row) => {
    row[1].forEach((item) => {
      if (whatIsTheNumber(item)) {
        count++;
      }
    });
  });

  console.log("count", count);
}

function whatIsTheNumber(pattern) {
  const len = pattern.length;
  if (len === 2) return 1;
  if (len === 4) return 4;
  if (len === 3) return 7;
  if (len === 7) return 8;
  return null;
}
