function sumOfPartNumbers(engineSchematic:string[]) {
    const rows = engineSchematic.length;
    const cols = engineSchematic[0].length;

    const isSymbol = (char:string) => char === '*' || char === '#' || char === '+';

    const isPartNumber = (row:number, col:number) => {
        if (row < 0 || row >= rows || col < 0 || col >= cols || engineSchematic[row][col] === '.') {
            return false;
        }

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;

                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    if (isSymbol(engineSchematic[newRow][newCol])) {
                        return true;
                    }
                }
            }
        }

        return false
    };

    let sum = 0;

    for (let i = 0; i < rows; i++) {
        console.log(engineSchematic[i]);
        for (let j = 0; j < cols; j++) {
            const currentChar = engineSchematic[i][j];

            if (!isSymbol(currentChar) && isPartNumber(i, j)) {
                sum += parseInt(currentChar, 10);
            }
        }
    }

    return sum;
}

// Example engine schematic
const engineSchematic2 = [
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

// Calculate the sum of part numbers
const result = sumOfPartNumbers(engineSchematic2);

// Output the result
console.log("Sum of part numbers:", result);
