import fs from 'fs';

const input = fs.readFileSync("../data.txt","utf-8").trim().split("\n");
const time = parseInt(input[0].replace("Time: ","").replace(/ /g,""));
const distance = parseInt(input[1].replace("Distance: ","").replace(/ /g,""));

let ways = 0;

for(let s = 0; s <= time; s++){
    let timer = (time - s);
    let distanceCovered = timer * s;

    if(distanceCovered > distance){
        ways += 1;
    }
}

console.log(ways);