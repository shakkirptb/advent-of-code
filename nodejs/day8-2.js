"use strict";
const fs = require("fs");
const content = fs.readFileSync("input-8", "utf8");

const displaySegmentMappingLookup = [
  "123456", //0
  "34", //1
  "02356", //2
  "02345", //3
  "0134", //4
  "01245", //5
  "012456", //6
  "234", //7
  "0123456", //8
  "012345", //9
];

const allKeys = "abcdefg".split("");

processFile(content);

function processFile(content) {
  const input =
    //"be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe"
    content
      .split("\n")
      .filter((i) => Boolean(i))
      .map((i) =>
        (([first, second]) => [
          first
            .split(" ")
            .sort((a, b) => a.length - b.length) // important
            .map((pattern) => splitAndSortString(pattern)),
          second.split(" ").map((pattern) => splitAndSortString(pattern)),
        ])(i.split(" | "))
      );

  console.log("input", JSON.stringify(input));

  console.log(
    "Sum:",
    input
      .map(([firstSet, secondSet]) => {
        console.log("First: ", firstSet);
        console.log("Second: ", secondSet);
        const dMap = whatIsTheCode(firstSet);
        console.log("Pixels: ", dMap);
        return Number(
          secondSet.map((item) => whatIsTheNumber(item, dMap)).join("")
        );
      })
      .reduce((a, i) => a + i, 0)
  );
}

function splitAndSortString(text) {
  return text.split("").sort();
}

function whatIsTheCode(sortedPatterns = []) {
  let digitMap = [
    allKeys,
    allKeys,
    allKeys,
    allKeys,
    allKeys,
    allKeys,
    allKeys,
  ];
  const identifiedKeys = [];
  sortedPatterns.forEach((patternArray) => {
    const theNumber =
      patternArray.length == 6
        ? sixthSense(patternArray, digitMap)
        : whatIsTheNumber(patternArray);

    if (theNumber == null || patternArray.length >= 6) return;
    const segmentMapping = displaySegmentMappingLookup[theNumber];
    const filteredPatternArray = patternArray.filter(
      (key) => identifiedKeys.indexOf(key) < 0
    );
    identifiedKeys.push(...filteredPatternArray);
    digitMap = digitMap.map((dMapkeys, index) => {
      return segmentMapping.indexOf(index.toString()) > -1 &&
        dMapkeys.length > 2
        ? filteredPatternArray
        : dMapkeys.filter((key) => filteredPatternArray.indexOf(key) < 0);
    });
  });
  return digitMap.map((keys) => keys[0]);
}

function whatIsTheNumber(pattern, digitMap) {
  const len = pattern.length;
  if (len === 2) return 1;
  if (len === 4) return 4;
  if (len === 3) return 7;
  if (len === 7) return 8;

  if (digitMap?.length) {
    const digitalPosition = pattern
      .map((key) => digitMap.indexOf(key))
      .sort()
      .join("");
    return displaySegmentMappingLookup.indexOf(digitalPosition);
  }
  return null;
}

function sixthSense(pattern, digitMap) {
  if (digitMap?.length && pattern.length == 6) {
    //0,6,9
    const missingKey = allKeys.filter((key) => pattern.indexOf(key) < 0)[0];
    if (!missingKey) return null;
    const missingKeyPosition = digitMap.findIndex(
      (keys) => keys.indexOf(missingKey) > -1
    );
    switch (missingKeyPosition) {
      case 0: //0
      case 1: //0
        setAndSwap(0, 1, missingKey, digitMap);
        return 0;
      case 3: //0
      case 4: //0
        setAndSwap(3, 4, missingKey, digitMap);
        return 6;
      case 5: //0
      case 6: //0
        setAndSwap(6, 5, missingKey, digitMap);
        return 9;
    }
  }
  return null;
}

function setAndSwap(right, wrong, missingKey, digitMap) {
  digitMap[right] = [missingKey];
  digitMap[wrong] = digitMap[wrong].filter((key) => key != missingKey);
}
