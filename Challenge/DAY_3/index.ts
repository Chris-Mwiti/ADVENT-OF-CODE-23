import fs from 'fs'
import { isNumberObject } from 'util/types';

const data = fs.readFileSync('./data.txt', 'utf-8').split("\n");
console.log(data);

function isNum(num:string){
    const numArr = [0,1,2,3,4,5,6,7,8,9]
    if(numArr.includes(parseInt(num))) return true;
    return false;
}

function isSymbol(elem:string){
    if(isNum(elem) || elem == '.') return false;
    return true;
}

function isDigitOrDot(engine:string[],row:number,col:number){
    return (
        (isNum(engine[row][col])) ||
        engine[row][col] == '.'
    )
}


function isAdjacentSymbol(engine:string[], row:number, col:number){
    if( row == 0){
        return (
            !isDigitOrDot(engine,row,col + 1) || 
            !isDigitOrDot(engine,row,col - 1)||
            isSymbol(engine[row + 1][col]) ||
            isSymbol(engine[row + 1][col + 1]) ||
            isSymbol(engine[row + 1][col - 1])
        )
    }

    if( row == engine.length - 1){
        return (
            !isDigitOrDot(engine,row,col + 1) || 
            !isDigitOrDot(engine,row,col - 1) ||
            isSymbol(engine[row - 1][col + 1]) ||
            isSymbol(engine[row - 1][col - 1]) ||
            isSymbol(engine[row - 1][col])
        )
    }
    return(
        !isDigitOrDot(engine,row,col + 1) || 
        !isDigitOrDot(engine,row,col - 1)||
        isSymbol(engine[row + 1][col]) || 
        isSymbol(engine[row - 1][col]) ||
        isSymbol(engine[row + 1][col + 1]) ||
        isSymbol(engine[row + 1][col - 1]) ||
        isSymbol(engine[row - 1][col + 1]) ||
        isSymbol(engine[row - 1][col - 1])
    )
}

function sumPartNumbers(engine:string[]){
    let sum = 0;
    let keepNumber = false;
    console.log(engine[0].length);
    for(let i = 0; i <= engine.length - 1; i++){
        let num = '';
        for(let j = 0; j < engine[i].length - 1; j++){
            if(Number(engine[i][j])){
                num += engine[i][j];
                if(isAdjacentSymbol(engine, i, j)){
                    keepNumber = true;
                }
            }
            else {
                if(keepNumber && num.length > 0){
                    sum += Number(num);
                }
                num = '';
                keepNumber = false;
            }
        }

        if(keepNumber && num.length  > 0){
            sum += Number(num);
        }

        keepNumber = false;
    }

    return sum;
}

const engineSchematic = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598.."
];


const sumOfAdjacentNums = sumPartNumbers(data);

console.log(sumOfAdjacentNums);