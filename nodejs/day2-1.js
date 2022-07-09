const fs = require("fs");
const content = fs.readFileSync("move-input", "utf8");

processFile(content);

function processFile(content) {
  const input = content
    .split("\n")
    .filter((i) => i != "")
    .map((i) => i.split(" "));
  const horizontal = input.reduce(
    (hor, i) => (i[0] === "forward" ? hor + Number(i[1]) : hor),
    0
  );
  const vertical = input.reduce(
    (ver, i) =>
      i[0] === "up"
        ? ver - Number(i[1])
        : i[0] === "down"
        ? ver + Number(i[1])
        : ver,
    0
  );

  console.log(horizontal * vertical);
}
