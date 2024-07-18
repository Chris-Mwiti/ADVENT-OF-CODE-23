import fs, { lstatSync } from "fs";

const data = fs.readFileSync("./data.txt", "utf-8");
const dataArray = data.trim().split("\r\n");

/**
 *
 */

let numWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

let sum = 0;
for (const item of dataArray) {
  let firstNum;
  loop1: for (let i = 0; i < item.length; i++) {
    if (parseInt(item[i]) || parseInt(item[i]) === 0) {
      firstNum = item[i];
      break;
    }

    for (let k = 0; k < numWords.length; k++) {
      if (item.slice(i, i + numWords[k].length).includes(numWords[k])) {
        firstNum = k;
        break loop1;
      }
    }
  }

  let lastNum;
  loop2: for (let j = item.length - 1; j >= 0; j--) {
    if (parseInt(item[j]) || parseInt(item[j]) === 0) {
      lastNum = item[j];
      break;
    }

    for (let n = 0; n < numWords.length; n++) {
      if (item.slice(j, j + numWords[n].length).includes(numWords[n])) {
        console.log(numWords[n]);
        lastNum = n;
        break loop2
      }
    }
  }

  // console.log(firstNum, lastNum);
  sum += parseInt(((firstNum! as string) + lastNum) as string);
}

console.log(sum);
