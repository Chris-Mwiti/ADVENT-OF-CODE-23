import fs from 'fs';
import { IPlantationValues } from '.';
function readDataFromFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function parseLine(line: string): number[] {
    const values = line.split(' ').map(Number).filter(value => !isNaN(value));
    return values;
}

 export default async function main() {
    try {
        const rawData = await readDataFromFile('data.txt');
        const lines = rawData.split('\n').map(line => line.trim());
        console.log(lines);
        const data:IPlantationValues = {
            seeds: parseLine(lines[0]),
            seedsToSoilMap: lines.slice(1, 49).map(parseLine),
            soilToFertilizerMap: lines.slice(51, 93).map(parseLine),
            fertilizerToWaterMap: lines.slice(95, 139).map(parseLine),
            waterToLightMap: lines.slice(141, 172).map(parseLine),
            lightToTemperatureMap: lines.slice(174, 196).map(parseLine),
            temperatureToHumidityMap: lines.slice(198, 213).map(parseLine),
            humidityToLocationMap: lines.slice(215, 242).map(parseLine)
        };

        return data
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}

main();