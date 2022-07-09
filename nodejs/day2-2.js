const fs = require("fs");
const content = fs.readFileSync("move-input", "utf8");

processFile(content);

function processFile(content) {
  const input = content
    .split("\n")
    .filter((i) => i != "")
    .map((i) => [i.split(" ")[0], Number(i.split(" ")[1])]);
  const output = input.reduce(
    ([hor, ver, aim], [command, value]) => {
      switch (command) {
        case "forward":
          hor = hor + value;
          ver = ver + aim * value;
          break;
        case "up":
          aim = aim - value;
          break;
        case "down":
          aim = aim + value;
          break;
      }
      return [hor, ver, aim];
    },
    [0, 0, 0]
  );

  console.log(output[0] * output[1]);
}
