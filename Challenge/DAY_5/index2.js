const fs = require("fs");

const data = fs.readFileSync("data.txt", "utf-8").split("\r\n");

const seeds = data[0]
  .split("seeds: ")[1]
  .split(" ")
  .map((e) => parseInt(e));
console.log(seeds);


const mappers = [
  data.indexOf("seed-to-soil map:"),
  data.indexOf("soil-to-fertilizer map:"),
  data.indexOf("fertilizer-to-water map:"),
  data.indexOf("water-to-light map:"),
  data.indexOf("light-to-temperature map:"),
  data.indexOf("temperature-to-humidity map:"),
  data.indexOf("humidity-to-location map:"),
  data.length + 1,
];
const maps = [];

for (let i = 0; i < mappers.length; i++) {
  let firstIndex = mappers[i];
  let lastIndex = mappers[i + 1] - 1;

  const lines = data.slice(firstIndex + 1,lastIndex);
  const splits = [];

  for(const line of lines){
    splits.push(line.split(" ").map(Number).filter(e => !isNaN(e)))
  }

  maps.push(splits)

}

console.log(maps);

let locations = []
for(let x = 0; x < seeds.length; x+=2){
    for (let seed = seeds[x]; seed <= seeds[x] + (seeds[x + 1]); seed+= 5000) {
      let loc = seed;
      console.log(loc);

      for (let i = 0; i < maps.length; i++) {
        for (let assignment of maps[i]) {
          const [to, from, range] = assignment;
          if (loc >= from && loc <= from + range - 1) {
            loc = to + (loc - from);
            break;
          }
        }
      }

      console.log("....");
      locations.push(loc);
    }
}

console.log(locations)
console.log(locations.join(" "))
console.log(Math.min(...locations));

