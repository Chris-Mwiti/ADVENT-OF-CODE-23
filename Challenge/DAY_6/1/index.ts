import path from "path";
import fs from 'fs';

const readDataFromFile = (path:string) => {
   const result =  fs.readFileSync(path, "utf-8").trim();
   const spllittedResult = result.split("\n");
   const time = spllittedResult[0].trim().split(" ").map(Number).filter(value => !isNaN(value)).filter(value => value !== 0);
   const distance = spllittedResult[1].trim().split(" ").map(Number).filter(value => !isNaN(value)).filter(value => value !== 0);

   const maps = [time,distance];

   return maps;
}


function findProductOfMarginOfError(data:number[][]){
    let marginOfErrorProductArr:number[] = [];
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].length; j++){ 

            let quallifiedSpeeds:number[] = [];
            let values = 0;
            let speed = data[i][j] / 2;
            const regex = /^[-+]?[0-9]+\.[0-9]+$/;
            const isValueDecimal = regex.test(String(speed));

                if( i == 0){
                    let recordedDistance = 0;
                    const time = data[i][j];

                    //Check if the the half of the time is a decimal and assign it as it as a speed
                    if(isValueDecimal){
                        let newSpeed = Math.round(speed);
                        speed = newSpeed - 1;
                    }
                    let actualDistance = data[i + 1][j];
                    let timer = time - speed;

                    //Loop over untill the speed is equal to the actual time provided
                    while( speed <= time){
                        recordedDistance = speed * timer;
                        console.log(`Time ${time}: timer: ${timer} speed:${speed} recordeDistance:${recordedDistance} actualDistance:${actualDistance}`)
                        if(recordedDistance > actualDistance){
                                quallifiedSpeeds.push(speed);
                        }
                        timer--;
                        speed++;
                    }

                    //If value is actually a decimal multiply the qualified speeds with two due to the fact that we splitted the actual time into two,
                    //Minus the value found with 2 due to the overlap obtained by the decimal

                    //Minus the obtained value with 1 if the value found is not a decimal
                    if(isValueDecimal){
                            values = (quallifiedSpeeds.length * 2) - 2;
                    }else{
                            values = (quallifiedSpeeds.length * 2) - 1;
                    }
                    marginOfErrorProductArr.push(values);
                }

            console.log(`Time:${data[i][j]} length:${quallifiedSpeeds.length} items:${quallifiedSpeeds} values: ${values}`)
        }
    }

    console.log(marginOfErrorProductArr);

    return marginOfErrorProductArr.reduce((accum,value) => accum * value);
}

const maps = readDataFromFile("./data.txt");
const marginOfErrorProduct = findProductOfMarginOfError(maps);
console.log(marginOfErrorProduct);