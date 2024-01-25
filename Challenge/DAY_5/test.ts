// NOTE: SECOND VERSION OF THE ALGORITHIM WORKS WITH BOTH THE EXAMPLE AND PROVIDED DATA

import fs from 'fs';
const fileData = fs.readFileSync('data.txt', "utf-8").split("\n").map(line => line.trim());
fileData.pop();

const seeds = fileData[0].replace("seeds: ","").split(" ").map(Number);

const splits = [
    fileData.indexOf("seed-to-soil map:"),
    fileData.indexOf("soil-to-fertilizer map:"),
    fileData.indexOf("fertilizer-to-water map:"),
    fileData.indexOf("water-to-light map:"),
    fileData.indexOf("light-to-temperature map:"),
    fileData.indexOf("temperature-to-humidity map:"),
    fileData.indexOf("humidity-to-location map:"),
    fileData.length + 1
];

const seedPairs:number[][] = [];

for(let i = 0; i < seeds.length; i+=2){
    const startSeed = seeds[i];
    const destSeed = (seeds[i + 1] + startSeed) - 1;

    seedPairs.push([startSeed,destSeed]);
}


//Creates various maps for plantation
const maps:number[][][] = [];

for(let i = 0; i < splits.length - 1; i++){
    const beiningOfArray = splits[i] + 1;
    const endOfArray = splits[i + 1] - 1;

    console.log(
        "First Index: " + beiningOfArray,
        "Second Index: " + endOfArray
    )

    const lines = fileData.slice(beiningOfArray, endOfArray);

    const splitArray:number[][] = [];

    for(const line of lines) {
        splitArray.push(line.split(" ").map(Number));
    }
    maps.push(splitArray);
}


//Maps every seed to corresponding maps

function getLocationOfSeed(seed:number){
    let loc = seed;

    for(let i = 0; i < maps.length; i++){
        for(let assignment of maps[i]){
            const [to,from,range] = assignment;

            if(loc >= from && loc <= from + range - 1){
                loc = to + (loc - from);
                break;
            }
        }
    }

    return loc
}


//Get min location of seeds within the seedsPair
const minLocOfSeedsInPairs: number[][] = [];

for(const seedPair in seedPairs){   
    const [startSeed, destSeed] = seedPair;
    let minLoc = Infinity;
    let minLocSeed = startSeed;

    for(let i = startSeed; i <= destSeed; i += 50000){
        let loc = getLocationOfSeed(Number(i));

        if(loc < minLoc){
            minLoc = loc;
            minLocSeed = i;
        }
    }

    minLocOfSeedsInPairs.push([minLoc,...[minLocSeed,startSeed,destSeed].map(Number)]);
}

//Get the min seed
let minLoc = Infinity;
let range = [0,0,0];

for(const [minLocInPair,minLocSeed,startSeed,destSeed] of minLocOfSeedsInPairs){
    if( minLocInPair < minLoc){
        minLoc = minLocInPair;
        range = [minLocSeed,startSeed,destSeed];
    }
}

let delta = 25000;
let minSearch = Math.max(range[0] - delta, range[1]);
let maxSearch = Math.min(range[0] + delta, range[2]);


let minLocSeed = minSearch;
let minLocSeedLoc = Infinity;
for(let i = minSearch; i <= maxSearch; i++){
    console.log(minSearch,maxSearch);
    const loc = getLocationOfSeed(i);
    if(loc < minLocSeedLoc){
        minLocSeedLoc = loc;
        minLocSeed = i;
    }
}

console.log(getLocationOfSeed(minLocSeed));