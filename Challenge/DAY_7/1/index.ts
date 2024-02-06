import fs from 'fs';
type THandsType = {
    values:string[];
    type:"Five_Kind" | "Four_Kind" | "Full_House" | "Three_Kind" | "Two_Pair" | "One_Pair" | "High_Card";
}

type TCards = "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";

const handsTypesArray:THandsType["type"][] = [
    "Five_Kind", "Four_Kind","Full_House","Three_Kind","Two_Pair","One_Pair","High_Card"
]

const typePrecedence:Record<THandsType["type"],number> = {
    "Five_Kind": 1,
    "Four_Kind": 2,
    "Full_House": 3,
    "Three_Kind": 4,
    "Two_Pair": 5,
    "One_Pair": 6,
    "High_Card": 7
}

const cardPrecedence:Record<string,number> = {
    "A" : 1,
    "K" : 2,
    "Q" : 3,
    "J" : 4,
    "T" : 5,
    "9" : 6,
    "8" : 7,
    "7" : 8,
    "6" : 9,
    "5" : 10,
    "4" : 11,
    "3" : 12,
    "2" : 13

}



const input = fs.readFileSync('sample.txt', "utf-8").trim().split("\n").map(value => value.trim().split(" "));

function sortHands(values:string[][]){
    let handsTypes:THandsType[] = [];

    for(let i = 0; i < values.length; i++){
        const hand = values[i][0];
        let pairs:string[] = [];
        let unPaired:string[] = [];
        
        
        const charMap:Map<string,number> = new Map();
        for(const char of hand){
            if(charMap.has(char)){
                charMap.set(char, charMap.get(char)! + 1);
            }else {
                charMap.set(char,1);
            }
        }

        for(const [char,count] of charMap.entries()){
            if(count >= 2){
               for(let i = 1; i <= count; i++){
                pairs.push(char);
               } 
            }else {
                unPaired.push(char)
            }
        }

        if(pairs.length == 5){
            const areElementsSame = pairs.every((value) => value === pairs[0]);
            if(areElementsSame){
                handsTypes.push({
                    values:values[i],
                    type: "Five_Kind"
                })
            }else {
                handsTypes.push({
                    values: values[i],
                    type: "Full_House"
                })
            }
        }else if(pairs.length == 4){

            const pairsCountMap:Map<string,number> = new Map();
            for(const char of pairs){
                if(pairsCountMap.has(char)){
                    pairsCountMap.set(char, (pairsCountMap.get(char)! + 1))
                }else {
                    pairsCountMap.set(char,1);
                }             
            }

            for(const count of pairsCountMap.values()){
                if(count == 4){
                    handsTypes.push({
                        values:values[i],
                        type: "Four_Kind"
                    })
                }else{
                    handsTypes.push({
                        values:values[i],
                        type: "Two_Pair"
                    })
                    break;
                }
            }

        }else {
            if(unPaired.length == 2){
                handsTypes.push({
                    values: values[i],
                    type: "Three_Kind"
                })
            } else if(unPaired.length == 3){
                handsTypes.push({
                    values: values[i],
                    type: "One_Pair"
                })
            } else  {
                handsTypes.push({
                    values: values[i],
                    type: "High_Card"
                })
            }
        }
    }

    handsTypes.sort((a,b) => typePrecedence[a.type] - typePrecedence[b.type]);

    const groupedTypesArray = handsTypesArray.map(type => {
        return handsTypes.filter(hand => hand.type == type)
    })
    for(const group of groupedTypesArray){
        group.sort((a,b) => {
            const hand1 = a.values[0];
            const hand2 = b.values[0];
            let counter = 0;

            while (counter <= 5){
                const isEqual = cardPrecedence[hand1[counter]] - cardPrecedence[hand2[counter]];
                if(isEqual == 0){
                    counter++;

                }else {
                    return isEqual
                }
            }
        })
    }

    return handsTypes;
}

const handsTypes = sortHands(input);
console.log(handsTypes);
