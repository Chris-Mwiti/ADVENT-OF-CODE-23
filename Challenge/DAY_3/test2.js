const fs = require('fs')
const input = fs.readFileSync("./data.txt", "utf-8").split("\n");

const numatchar = new RegExp('');

let numberMatchesCoords = [];
for(let y = 0; y < input.length; y++){
    const line = input[y];

    let numerals = Array.from(line.matchAll(/[0-9]+/g), m => m);

    for(const entry of numerals){
        const numberCoords = [entry];
        const length = entry[0].length;
        for(let i = 0; i < length; i++){
            numberCoords.push([y, entry.index + i]);
        }
        console.log(numberCoords)
        numberMatchesCoords.push(numberCoords);
    }
}

function isSymbol(n){
    return isNaN(n) && n !== "."
}

function isCellTouchingSymbol(x,y){

    //Checked for top bottom right left adjacent characters to confirm if their are symbols
    if(y > 0 && isSymbol(input[y - 1][x])) return true;
    if(y < input.length - 1 && isSymbol(input[y + 1][x])) return true;
    if (x > 0 && isSymbol(input[y][x-1])) return true;
    if(x < input[y].length - 1 && isSymbol(input[y][x + 1])) return true;

    if(y > 0 && x > 0 && isSymbol(input[y - 1][x - 1])) return true;
    if(y > 0 && x < input[y].length - 1 && isSymbol(input[y - 1][x + 1])) return true;
    if(y < input.length - 1 && x > 0 && isSymbol(input[y + 1][x - 1])) return true;
    if(y < input.length - 1 && x < input[y].length - 1 && isSymbol(input[y + 1][x + 1])) return true;
    
    return false;
}

let sum = 0;

for(const number of numberMatchesCoords){
    const [num, ...coords] = number;
    const [y,x] = coords[0]
    console.log(coords)
    let anytouching = false;
    for(const [y,x] of coords){
        if(isCellTouchingSymbol(x,y)){
            anytouching = true;
            break
        }
    }
    if(anytouching){
        sum += parseInt(num[0])
    }
}

console.log(sum)