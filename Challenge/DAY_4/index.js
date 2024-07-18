const fs = require('fs');
const data = fs.readFileSync('./data.txt','utf-8').split('\n');
data.pop()

let gamePoints = 0;
for(const g of data){
    let cardPoints = 0;
    const cardGame = g.trim().split(': ');
    const gameSets = cardGame[1].split(' | ');
    const winningGames = gameSets[0].trim().split(' ').filter(x => x != "").map(e => parseInt(e.match(/\d+/)[0]));
    const selectedGames = gameSets[1].trim().split(' ').filter(x => x != "").map(e => parseInt(e.match(/\d+/)[0]));

    for(let game of selectedGames){
        console.log(game);
        if(winningGames.includes(game)){
            cardPoints += 1;
        }
    }


    if(cardPoints != 0){
        const score = 2 ** Math.max(cardPoints - 1, 0);
        gamePoints += score;
    }
}

console.log(gamePoints)
