//1.1
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
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

forEach([2, 4,9], (element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}`);
});


//2
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
function some(array, callback) {
    
    for (let i = 0; i < array.length; i++) {
        // Вызываем колбэк с текущим элементом, индексом и самим массивом
        // Колбэк может игнорировать лишние аргументы, это допустимо
        if (callback(array[i], i, array)) {
            return true; // Прекращаем обход при первом совпадении
        }
    }
    // Если ни один элемент не удовлетворил условию
    return false;
}