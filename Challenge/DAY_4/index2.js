const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf-8").split("\n");
data.pop();

const gamesInstancesArray = Array(data.length).fill(1);
let gamePoints = 0;
for(let i = 0; i < data.length; i++){
    let wonCounter = 0;
    const cardGame = data[i].trim().split(": ");
    const gameSets = cardGame[1].split(" | ");
    const winningGames = gameSets[0]
      .trim()
      .split(" ")
      .filter((x) => x != "")
      .map((e) => parseInt(e.match(/\d+/)[0]));
    const selectedGames = gameSets[1]
      .trim()
      .split(" ")
      .filter((x) => x != "")
      .map((e) => parseInt(e.match(/\d+/)[0]));
    

    gamePoints += gamesInstancesArray[i]
    for (let game of selectedGames) {
      if (winningGames.includes(game)) {
        wonCounter += 1;
      }
    }

    if(wonCounter != 0){
      for (let k = i + 1; k < i + 1 + wonCounter; k++) {
      gamesInstancesArray[k] += gamesInstancesArray[i];
      }  
    }
}


console.log(gamePoints);



