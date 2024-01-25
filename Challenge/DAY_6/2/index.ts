import fs from 'fs';
const readDataFromFileChallenge2 = (path:string) => {
    const data = fs.readFileSync(path,"utf-8").trim();
    const splittedData = data.split("\n")
    const time = splittedData[0].split(" ").map(Number).filter(value => !isNaN(value)).filter(value => value !== 0).join("");
    const distance = splittedData[1].split(" ").map(Number).filter(value => !isNaN(value)).filter(value => value !== 0).join("");
    
    return [Number(time),Number(distance)]
}

function findProductOfMarginOfError2(data:number[]){
    let marginOfErrorProductArr:number[] = [];
    for(let i = 0; i < data.length; i++){
        let quallifiedSpeeds:number[] = [];
        let values = 0;
        let speed = data[i] / 100;
        const regex = /^[-+]?[0-9]+\.[0-9]+$/;
        const isValueDecimal = regex.test(String(speed));

        if( i == 0){
            let recordedDistance = 0;
            const time = data[i];

            //Check if the the half of the time is a decimal and assign it as it as a speed
            if(isValueDecimal){
                let newSpeed = Math.round(speed);
                speed = newSpeed - 1;
            }
            let actualDistance = data[i + 1];
            let timer = time - speed;

            //Loop over untill the speed is equal to the actual time provided
            while( speed <= time){
                recordedDistance = speed * timer;
                console.log(`Time ${time}: timer: ${timer} speed:${speed} recordeDistance:${recordedDistance} actualDistance:${actualDistance}`)
                if(recordedDistance > actualDistance){
                        quallifiedSpeeds.push(speed);
                }
                timer-= 1;
                speed+= 1;
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

        console.log(`Time:${data[i]} length:${quallifiedSpeeds.length} items:${quallifiedSpeeds} values: ${values}`)
    }

    console.log(marginOfErrorProductArr);

    return marginOfErrorProductArr.reduce((accum,value) => accum * value);
}

const raceData = readDataFromFileChallenge2("../data.txt");
const marginOfErrorProduct = findProductOfMarginOfError2(raceData);
console.log(marginOfErrorProduct);