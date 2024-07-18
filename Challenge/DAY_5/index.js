const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8").split("\r\n");

const seeds = data[0]
  .split("seeds: ")[1]
  .split(" ")
  .map((e) => parseInt(e));
console.log(seeds);

let pointBreakers = data
  .map((e, i) => {
    if (e == "") return i;
  })
  .filter((e) => typeof e == "number")
  .splice(1);

pointBreakers.push(33);

const mappers = [
  "seed-to-soil map:",
  "soil-to-fertilizer map:",
  "fertilizer-to-water map:",
  "water-to-light map:",
  "light-to-temperature map:",
  "temperature-to-humidity map:",
  "humidity-to-location map:",
];
const mappersPointers = [];

for (let i = 0; i < mappers.length; i++) {
  let elem = [];
  const currPointer = data.indexOf(mappers[i]);
  console.log(`${mappers[i]}: ${currPointer}`);
  for (let k = currPointer + 1; k < pointBreakers[i]; k++) {
    elem.push(data[k].split(","));
  }
  mappersPointers.push(elem);
}

console.log(mappersPointers);

//Working out of sum

for (const seed of seeds) {
  let mapValues = Array(mappers.length).fill(0);
  for (let m = 0; m < mappersPointers.length; m++) {
    if ((m == 0)) {
      mapElem: for (let k = 0; k < mappersPointers[m].length; k++) {
        let [dm, sm, r] = mappersPointers[m][k][0].split(" ").map(Number);
        let upperLimit = sm + r;
        let lowerLimit = dm + r;
        if (
          k == mappersPointers[m].length - 1 &&
          (seed > upperLimit || seed > lowerLimit)
        ) {
          mapValues[m + 1] = seed;
          break mapElem;
        }
        if (seed < sm) break;
        if (seed > upperLimit || seed > lowerLimit) break;
        let pos = seed - sm + dm;
        console.log(pos);
        mapValues[m + 1] = pos;
      }
    }
    mapElem2: for (let k = 0; k < mappersPointers[m].length; k++) {
      let [dm, sm, r] = mappersPointers[m][k][0].split(" ").map(Number);
      let upperLimit = sm + r;
      let lowerLimit = dm + r;
      if (
        k == mappersPointers[m].length - 1 &&
        (mapValues[m] > upperLimit || mapValues[m] > lowerLimit)
      ) {
        mapValues[m + 1] = mapValues[m];
        break mapElem2;
      }
      if (mapValues[m] < sm) break;
      if (mapValues[m] > upperLimit || mapValues[m] > lowerLimit) break;
      let pos = seed - sm + dm;
      console.log(pos);
      mapValues[m + 1] = pos;
    }
  }

  console.log(mapValues);
}
