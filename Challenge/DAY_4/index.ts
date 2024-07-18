import fs from 'fs';
const data = fs.readFileSync(
    './data.txt',
    'utf-8'
).split(':')

function calculateCardPoints(acquiredValues:string[], winningValues:string[]){
    let cardPoints = 0;
    acquiredValues.forEach(value => {
        let isValueAcquired = winningValues.includes(value);
        if(isValueAcquired){
            return cardPoints == 0 ? cardPoints += 1 : cardPoints *= 2;
        }
    })

    return cardPoints;
}

function evaluateTotalCardPoints(cards:string[]){
    let sumPoints = 0;

    for(const card of cards){
        const cardSplitted = card.split(" ");
        
        const splitterPosition = cardSplitted.findIndex((value) => value === "|");

        let winningValues:string[] = [];
        let acquiredValues:string[] = [];
        
        // Push the winning values in the winning array;
        winningValues.push(...cardSplitted.slice(0,splitterPosition - 1));
        // Push the acquired values in the 
        acquiredValues.push(...cardSplitted.slice(splitterPosition + 1));
        
        let cardPoints = calculateCardPoints(acquiredValues,winningValues);

        sumPoints += cardPoints;
    }

    return sumPoints;
}

const cards = [
    "41 48 83 86 17 | 83 86  6 31 17 9 48 53",
    "13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "31 18 13 56 72 | 74 77 10 23 35 67 36 11"
];

const totalCardPoints = evaluateTotalCardPoints(data);

console.log(totalCardPoints);
