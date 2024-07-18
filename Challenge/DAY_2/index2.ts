import fs from "fs";

const data = fs.readFileSync("./data.txt", "utf-8");
const splittedData = data.trim().split("\n");

const choicesHashMap: { [key: string]: number } = {
  blue: 14,
  green: 13,
  red: 12,
};


const choicesKeys = Object.keys(choicesHashMap);
let sumOfPower = 0;
for (const gameSet of splittedData) {
  gameSet.trim();
  const gameId = parseInt(gameSet.split(" ")[1]);
  const games = gameSet.replace(/Game\s\d+:/, "");
  console.log(games);
  let gameChoices: { [key: string]: number } = {
    blue: 0,
    red: 0,
    green: 0,
  };
  const sets = games.trim().split(";");
  console.log(sets);

  for (let game of sets) {
    const selectedChoices = game.trim().split(",");
    console.log(selectedChoices);
    for (let k = 0; k < selectedChoices.length; k++) {
      const play = selectedChoices[k].trim().split(" ");
      console.log(play);
      if (choicesKeys.includes(play[1])) {
        gameChoices[play[1]] = Math.max(
          gameChoices[play[1]],
          parseInt(play[0])
        );
      }
    }
  }

  const values = Object.values(gameChoices);
  
  sumOfPower += values.reduce((accum,val) => {
    accum *= val
    return accum;
  })
  
}
console.log(sumOfPower);
