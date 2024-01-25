// NB: FIRST WORKING VERSION OF THE ALGORITHIM ONLY IMPLEMENTS THE EXAMPLE OF THE ADVENT OF CODE DAY CHALLENGE

function getTotalSeeds(seedsAlamanc:number[]){
  let seeds:number[] = [];
  for(let i = 0; i <= seedsAlamanc.length - 1; i+=2){
    const seedsValue = seedsAlamanc[i];
    const seedsRangeValue = seedsAlamanc[i + 1];
    for(let j = seedsValue; j < (seedsValue + seedsRangeValue); j++){
      seeds.push(j);
    }
  }
  return seeds;
}


let resourceMapperTable:Array<number[]>= [];

function generateInitialTableValues(mapElements:number[][], table:Array<number[]>){
  let lowestSourceValue = 0;
  for(let i = 0; i <= mapElements.length - 1; i++){

    if(mapElements[i + 1] != undefined){
      if((mapElements[i][1] > mapElements[i + 1][1])){
        lowestSourceValue = mapElements[i + 1][1];
      }
    }else if(mapElements[i][1] < lowestSourceValue){
      lowestSourceValue = mapElements[i][1];
    }else {
      console.log("lowest value not found");
    };

  }


  if(lowestSourceValue !== 0){
    for(let i = 0; i < lowestSourceValue; i++){
      let row:number[] = [];
      row[0] = i;
      row[1] = i;

      table.push(row);
    }
  }

  return table;
}

function regenerateMapTable(mapElem:Array<number[]>, table: Array<number[]>){
  for(let n = 0; n <= mapElem.length - 1; n++){

    let sourceValue = mapElem[n][1];
    let destinationValue = mapElem[n][0];
    let rangeValue = mapElem[n][2];
    let upperLimit = sourceValue + rangeValue;
    let lowerLimit = destinationValue + rangeValue;

    while(sourceValue < upperLimit && destinationValue < lowerLimit){
      table.push([sourceValue++,destinationValue++])
    }
  }

  return table;
}

function lookUpValuesInMapTable(values:number[] | number,table:Array<number[]>){
  let foundValuesObj:{[key:number]:number} = {};

  // Places the found values from the map table in the foundValuesObj
  if(Array.isArray(values)){
    values.forEach(value => {
      table.forEach(row => {
        if(row[0] == value) foundValuesObj[value] = row[1];
      })
    })
  }else {
    table.forEach(row => {
      if(row[0] == values) foundValuesObj[values] = row[1];
    })
  }

  // Re-enter the original value in the foundValueObj if not found in the map table
  const foundKeys = Object.keys(foundValuesObj)
  if(Array.isArray(values)){
    values.forEach(value => {
      if(!foundKeys.includes(String(value))){
        foundValuesObj[value] = value;
      }
    })
  }

  return foundValuesObj;
}


export interface IPlantationValues {
  seeds: number[];
  seedsToSoilMap:number[][];
  soilToFertilizerMap:number[][];
  fertilizerToWaterMap:number[][];
  waterToLightMap:number[][];
  lightToTemperatureMap:number[][];
  temperatureToHumidityMap:number[][];
  humidityToLocationMap:number[][];
}

function findClosestLocationOfPlantation(plantationValues:IPlantationValues){
  let baseCaseLoops = 1;
  let lookUpValuesFound:{[key:string]:number} = {};
  let minLocation = 0;

  while(baseCaseLoops <= 7){
    let resourceMapperTable:Array<number[]> = [];
    switch (baseCaseLoops){
      case 1:
        const initialTable = generateInitialTableValues(
          plantationValues.seedsToSoilMap,
          resourceMapperTable
        );
        const regeneratedTable = regenerateMapTable(
          plantationValues.seedsToSoilMap,
          initialTable
        );
        const valuesFound = lookUpValuesInMapTable(
          getTotalSeeds(plantationValues.seeds),
          regeneratedTable
        );
        lookUpValuesFound = valuesFound;
        baseCaseLoops++;
      break;

      case 2:
        const soilToFertilizerInitalTable = generateInitialTableValues(
          plantationValues.soilToFertilizerMap,
          resourceMapperTable
        );
        const regeneratedSoilFertilizerTable = regenerateMapTable(
          plantationValues.soilToFertilizerMap,
          soilToFertilizerInitalTable
        );
        const soilValues = Array.from(Object.values(lookUpValuesFound));
        const fertilizerValuesFound = lookUpValuesInMapTable(
          soilValues,
          regeneratedSoilFertilizerTable
        );
        lookUpValuesFound = fertilizerValuesFound;
        baseCaseLoops++
      break;

      case 3:
        const fertilizerToWaterInitialTable = generateInitialTableValues(
          plantationValues.fertilizerToWaterMap,
          resourceMapperTable
        );
        const regeneratedFertilizerWaterTable = regenerateMapTable(
          plantationValues.fertilizerToWaterMap,
          fertilizerToWaterInitialTable
        );
        const fertilizerValues = Array.from(Object.values(lookUpValuesFound));
        const waterValuesFound = lookUpValuesInMapTable(
          fertilizerValues,
          regeneratedFertilizerWaterTable
        );
        lookUpValuesFound = waterValuesFound
        baseCaseLoops++;
      break;

      case 4:
        const waterToLightInitialTable = generateInitialTableValues(
          plantationValues.waterToLightMap,
          resourceMapperTable
        );
        const regeneratedWaterLightTable = regenerateMapTable(
          plantationValues.waterToLightMap,
          waterToLightInitialTable
        );
        const waterValues = Array.from(Object.values(lookUpValuesFound));
        const lightValuesFound = lookUpValuesInMapTable(
          waterValues,
          regeneratedWaterLightTable
        );
        lookUpValuesFound = lightValuesFound;
        baseCaseLoops++;
      break;

      case 5:
        const lightTemperatureIntialTable = generateInitialTableValues(
          plantationValues.lightToTemperatureMap,
          resourceMapperTable
        );
        const regeneratedLightTempTable = regenerateMapTable(
          plantationValues.lightToTemperatureMap,
          lightTemperatureIntialTable
        );
        const lightValues = Array.from(Object.values(lookUpValuesFound));
        const temperatureValuesFound = lookUpValuesInMapTable(
          lightValues,
          regeneratedLightTempTable
        );
        lookUpValuesFound = temperatureValuesFound;
        baseCaseLoops++;
      break;

      case 6:
        const temperatureHumidityInitialTable = generateInitialTableValues(
          plantationValues.temperatureToHumidityMap,
          resourceMapperTable
        );
        const regeneratedTempHumidityTable = regenerateMapTable(
          plantationValues.temperatureToHumidityMap,
          temperatureHumidityInitialTable
        );
        const tempValues = Array.from(Object.values(lookUpValuesFound));
        const humidityValuesFound = lookUpValuesInMapTable(
          tempValues,
          regeneratedTempHumidityTable
        );
        lookUpValuesFound = humidityValuesFound;
        baseCaseLoops++;
      break;

      case 7:
        const humidityLocationIntialTable = generateInitialTableValues(
          plantationValues.humidityToLocationMap,
          resourceMapperTable
        );
        const regeneratedHumidityLocationTable = regenerateMapTable(
          plantationValues.humidityToLocationMap,
          humidityLocationIntialTable
        );
        const humidityValues = Array.from(Object.values(lookUpValuesFound));
        const locationValuesFound = lookUpValuesInMapTable(
          humidityValues,
          regeneratedHumidityLocationTable
        );
        lookUpValuesFound = locationValuesFound;
        
        const locationValues = Array.from(Object.values(locationValuesFound));
        minLocation = Math.min(...locationValues);
        baseCaseLoops++;
      break

      default:
        return lookUpValuesFound
    }

  }

  return minLocation;
}

const minLocationOfPlantation = findClosestLocationOfPlantation({
  seeds: [79,14,55,13],
  seedsToSoilMap:[
    [50,98,2],
    [52,50,48]
  ],
  soilToFertilizerMap:[
    [0,15,37],
    [37,52,2],
    [39,0,15]
  ],
  fertilizerToWaterMap:[
    [49,53,8],
    [0,11,42],
    [42,0,7],
    [57,7,4]
  ],
  waterToLightMap:[
    [88,18,7],
    [18,25,70]
  ],
  lightToTemperatureMap:[
    [45,77,23],
    [81,45,19],
    [68,64,13]
  ],
  temperatureToHumidityMap:[
    [0,69,1],
    [1,0,69]
  ],
  humidityToLocationMap:[
    [60,56,37],
    [56,93,4]
  ]
})

console.log(minLocationOfPlantation);