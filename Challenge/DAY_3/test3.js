/**
 * Lessons learnt:
 *  1. The sequence on how you arrange your loops is crucial
 *  2. How to loop through elements in a rectangular dimension both horizontally, vertically, diagonally,
 *  3. Boolean flags are crucial to determine if an operation will be executed
 */


const fs = require("fs");
const input = fs.readFileSync("./data.txt", "utf-8").split("\n");

const numatchar = new RegExp("");

let numberMatchesCoords = [];
for (let y = 0; y < input.length; y++) {
  const line = input[y];

  let numerals = Array.from(line.matchAll(/[0-9]+/g), (m) => m);

  for (const entry of numerals) {
    const numberCoords = [entry];
    const length = entry[0].length;
    for (let i = 0; i < length; i++) {
      numberCoords.push([y, entry.index + i]);
    }
    numberMatchesCoords.push(numberCoords);
  }
}

function isSymbol(n) {
  return isNaN(n) && n !== ".";
}

function isGear(n){
    return isNaN(n) && n === '*'
}

function isCellTouchingSymbol(x, y) {
  //Checked for top bottom right left adjacent characters to confirm if their are symbols
  if (y > 0 && isSymbol(input[y - 1][x])) return true;
  if (y < input.length - 1 && isSymbol(input[y + 1][x])) return true;
  if (x > 0 && isSymbol(input[y][x - 1])) return true;
  if (x < input[y].length - 1 && isSymbol(input[y][x + 1])) return true;

  if (y > 0 && x > 0 && isSymbol(input[y - 1][x - 1])) return true;
  if (y > 0 && x < input[y].length - 1 && isSymbol(input[y - 1][x + 1]))
    return true;
  if (y < input.length - 1 && x > 0 && isSymbol(input[y + 1][x - 1]))
    return true;
 if (
    y < input.length - 1 &&
    x < input[y].length - 1 &&
    isSymbol(input[y + 1][x + 1])
  )
    return true;

  return false;
}

function isCellAdjacentToGear(x,y){
    if(y < 0 && isGear(input[y - 1][x])) return true;
    if(y < input.length - 1 && isGear(input[y + 1][x])) return true;
    if(x > 0 && isGear(input[y][x - 1])) return true;
    if(x < input[y].length - 1 && isGear(input[y][x + 1])) return true;

    if(y > 0 && x > 0 && isGear(input[y - 1][x - 1])) return true;
    if(y > 0 && x < input[y].length - 1 && isGear(input[y - 1][x + 1])) return true;
    if(y < input.length - 1 && x > 0 && isGear(input[y + 1][x - 1])) return true;
    if(y < input.length - 1 && x < input[y].length - 1 && isGear(input[y + 1][x + 1])) return true;

    return false;

}

function isCellTouchingLocation(x,y,nx,ny){
    let deltaX = Math.abs(x - nx)
    let deltaY = Math.abs(y - ny)

    return deltaX <= 1 && deltaY <= 1
}

let sum = 0;
let gearsLocation = [];
//loop over the input to find the location of the stars
for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[i].length; j++){
        if(isGear(input[i][j])) gearsLocation.push([i,j]); 
    }
}
for(const [y,x] of gearsLocation){
    let gearsLocation = [];
    for (const number of numberMatchesCoords) {
        const [num, ...coords] = number;
        console.log(coords);
        let anytouching = false;
        for (const [ny, nx] of coords) {
            //checks whether a digit is adjacent to a gear(star)
            if (isCellTouchingLocation(nx,ny,x,y)) {
                anytouching = true;
                break;
            }
        }
        if (anytouching) {
            gearsLocation.push(num[0])
        }

    }

    if(gearsLocation.length == 2){
        sum += gearsLocation.reduce((accum,val) => {
            accum *= val;
            return accum;
        })
    }
}

console.log(sum);
