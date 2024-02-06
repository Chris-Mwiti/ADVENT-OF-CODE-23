import fs from 'fs';
type THandsType = {
    values:string[];
    type:"Five_Kind" | "Four_Kind" | "Full_House" | "Three_Kind" | "Two_Pair" | "One_Pair" | "High_Card";
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


        console.log(charMap.entries());
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

    return handsTypes;
}

const handsTypes = sortHands(input);
console.log(handsTypes);
