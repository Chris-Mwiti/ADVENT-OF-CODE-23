import fs from 'fs';
const input  = fs.readFileSync('../data.txt', "utf-8").trim().split("\n");
const time = Array.from(input[0].replace("Time: ","").matchAll(/\d+/g), m => parseInt(m[0]));
const distance = Array.from(input[1].replace("Distance: ","").matchAll(/\d+/g), m => parseInt(m[0]));

let prod = 1
for(let t = 0; t < time.length; t++){
    let recordedTime = time[t];
    let recordedDistance = distance[t];

    let ways = 0
    for(let s = 0; s < recordedTime; s++){
        let timer = (recordedTime - s);
        let distanceCovered = timer * s;

        if(distanceCovered > recordedDistance){
            ways++
        }
    }

    prod *= ways;
}

console.log(prod);