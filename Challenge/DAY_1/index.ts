import fs, { lstatSync } from 'fs';

const data = fs.readFileSync("./data.txt", "utf-8");
const dataArray = data.trim().split("\r\n");


/**
 * 
 */
let sum = 0;
for (const item of dataArray){
   let firstNum = ''
   for(let i = 0; i <= item.length - 1; i++){
        if(parseInt(item[i]) || parseInt(item[i]) === 0){
            firstNum = item[i];
        }
   }

   let lastNum = ''
   for(let j = item.length - 1; j >= 0; j--){
    if(parseInt(item[j]) || parseInt(item[j]) === 0){
        lastNum = item[j]
    }
   }

   console.log(firstNum,lastNum)
    sum += parseInt(lastNum + firstNum)
    
}


console.log(sum);


