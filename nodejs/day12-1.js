const fs = require("fs");
const content = fs.readFileSync("input-8", "utf8");

processFile(content);

function processFile(content) {
  const input = ["A", "b", "c", "d", "end"];

  const allCombo = permutator(input).map((i) => ["start", ...i]);

  allCombo.map((item) => {});
  console.log(
    "input",
    permutator(input).map((i) => ["start", ...i])
  );
}

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur,
      memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}
