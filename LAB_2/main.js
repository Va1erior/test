/**
 * Выводит элементы массива в консоль в формате "Element N: value X"
 * @param {Array} array - Исходный массив
 * @returns {void}
 */
function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i}: value ${array[i]}`);
  }
}

/**
 * Выводит элементы массива в консоль в формате "N: X"
 * @param {Array} array - Исходный массив
 * @returns {void}
 */
function printArray1(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`${i}:  ${array[i]}`);
  }
}

/**
 * Выполняет переданный колбэк для каждого элемента массива.
 * @param {Array} array - Исходный массив
 * @param {function(*, number, Array): void} callback - Функция, вызываемая для каждого элемента.
 *   Принимает: текущий элемент, индекс, весь массив.
 * @returns {void}
 */
function forEach(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

/**
 * Создаёт новый массив, содержащий результаты вызова колбэка для каждого элемента.
 * @param {Array} array - Исходный массив
 * @param {function(*, number, Array): *} callback - Функция преобразования.
 *   Принимает: текущий элемент, индекс, весь массив. Возвращает новое значение.
 * @returns {Array} Новый массив с преобразованными элементами
 */
function map(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

/**
 * Формирует новый массив из элементов, для которых колбэк вернул true.
 * @param {Array} array - Исходный массив
 * @param {function(*, number, Array): boolean} callback - Функция-предикат.
 *   Принимает: текущий элемент, индекс, весь массив. Возвращает boolean.
 * @returns {Array} Новый массив с отфильтрованными элементами
 */
function filter(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * Возвращает первый элемент массива, для которого колбэк вернул true.
 * @param {Array} array - Исходный массив
 * @param {function(*, number, Array): boolean} callback - Функция-предикат.
 *   Принимает: текущий элемент, индекс, весь массив. Возвращает boolean.
 * @returns {*|undefined} Первый найденный элемент или undefined
 */
function find(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * Проверяет, существует ли хотя бы один элемент, удовлетворяющий условию.
 * Прекращает обход при первом совпадении.
 * @param {Array} array - Исходный массив
 * @param {function(*, number, Array): boolean} callback - Функция-предикат.
 *   Принимает: текущий элемент, индекс, весь массив. Возвращает boolean.
 * @returns {boolean} true если хотя бы один элемент удовлетворяет условию
 */
function some(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Проверяет, удовлетворяют ли все элементы массива заданному условию.
 * Прекращает обход при первом несоответствии.
 * @param {Array} array - Исходный массив
 * @param {function(*, number, Array): boolean} callback - Функция-предикат.
 *   Принимает: текущий элемент, индекс, весь массив. Возвращает boolean.
 * @returns {boolean} true если все элементы удовлетворяют условию
 */
function every(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

/**
 * Последовательно обрабатывает элементы массива, накапливая результат в аккумуляторе.
 * @param {Array} array - Исходный массив
 * @param {function(*, *, number, Array): *} callback - Функция-редьюсер.
 *   Принимает: аккумулятор, текущий элемент, индекс, весь массив. Возвращает новый аккумулятор.
 * @param {*} [initialValue] - Начальное значение аккумулятора (необязательно).
 *   Если не передано, используется первый элемент массива.
 * @returns {*} Итоговое значение аккумулятора. undefined если массив пуст и initialValue не передан.
 */
function reduce(array, callback, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  const hasInitial = arguments.length >= 3;

  if (array.length === 0 && !hasInitial) {
    return undefined;
  }

  let accumulator = hasInitial ? initialValue : array[0];
  const startIndex = hasInitial ? 0 : 1;

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}


console.log("=== printArray ===");
printArray(["a", "b", "c"]);

console.log("\n=== printArray1 ===");
printArray1(["a", "b", "c"]);

console.log("\n=== forEach ===");
forEach([1, 2, 3], (element, index) => {
  console.log(`Element: ${element}, Index: ${index}`);
});

console.log("\n=== map ===");
const squared = map([1, 2, 3], (el) => el * el);
console.log(squared); // [1, 4, 9]

console.log("\n=== filter ===");
const evens = filter([1, 2, 3, 4, 5], (el) => el % 2 === 0);
console.log(evens); // [2, 4]

console.log("\n=== find ===");
const firstEven = find([1, 2, 3, 4, 5], (el) => el % 2 === 0);
console.log(firstEven); // 2

console.log("\n=== some ===");
const hasEven = some([1, 2, 3], (el) => el % 2 === 0);
console.log(hasEven); // true

console.log("\n=== every ===");
const allEven = every([2, 4, 6], (el) => el % 2 === 0);
console.log(allEven); // true

console.log("\n=== reduce ===");
const sum = reduce([1, 2, 3, 4, 5], (acc, el) => acc + el, 0);
console.log(sum); // 15

const sumNoInit = reduce([1, 2, 3, 4, 5], (acc, el) => acc + el);
console.log(sumNoInit); // 15

const emptyReduce = reduce([], (acc, el) => acc + el);
console.log(emptyReduce); // undefined