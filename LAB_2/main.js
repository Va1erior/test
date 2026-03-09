//1.1
console.log("1printArray:");    
function printArray(array) {
    if (!Array.isArray(array)) {
        console.log("Input is not an array.");
        return;
    }

    for (const element of array) {
        console.log(element);
    }
}

printArray([1, 2, 3, 4, 5]);

//1.2
console.log("1.2forEach:");
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

forEach([2, 4,9], (element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}`);
});


//2
console.log("2map:");
function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

const numbers = [1, 2, 3];
const squared = map(numbers, (element) => element * element);
console.log(squared); 


//3
console.log("3filter:");
function filter(array, callback) {
  const result = [];    
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            if (callback(array[i], i, array)){
                result.push(array[i]);
            }
        }
    }   
    return result;
}
const numbers2 = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers2, (element) => element % 2 === 0);
console.log(evenNumbers); 

//4
console.log("4find:"); 
function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
} 

const numbersfind = [1, 2, 3, 4, 5];
const firstEven = find(numbersfind, (element) => element % 2 === 0);
console.log(firstEven);

//5
console.log("5some:");
function some(array, callback) {
    
    for (let i = 0; i < array.length; i++) {

        if (callback(array[i], i, array)) {
            return true; 
        }
    }

    return false;
}
const numbersome = [1, 2, 3, 4, 5];
const hasEven = some(numbersome, (element) => element % 2 === 0);
console.log(hasEven); 

//6
console.log("6every:");
function every(array, callback) {
   
    for (let i = 0; i < array.length; i++) {
      
        if (!callback(array[i], i, array)) {
            return false;
        }
    }
   
    return true;
}
const numbersevery = [2, 4, 6];
const allEven = every(numbersevery, (element) => element % 2 === 0);
console.log(allEven); // true

//7
console.log("7reduce:");
function reduce(array, callback, initialValue) {
    const hasInitialValue = arguments.length > 2; // проверяем, передан ли initialValue
    if (array.length === 0 && !hasInitialValue) {
        return undefined; // если массив пуст и нет начального значения
    }

    let accumulator;
    let startIndex;

    if (hasInitialValue) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}
const numbersreduce = [1, 2, 3, 4, 5];

const sum = reduce(numbersreduce , (accumulator, element) => accumulator + element, 0);

console.log(sum); 