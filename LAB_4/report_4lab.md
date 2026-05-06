
# Лабораторная работа: Наследование в JavaScript (прототипный подход vs классы ES6)

## 1. Цель работы
Изучить и сравнить два механизма наследования в JavaScript:
- **Прототипное наследование** с использованием функций-конструкторов,
- **Современный синтаксис классов ES6** (синтаксический сахар над прототипами).

На практике реализовать иерархию классов «Предмет инвентаря» → «Оружие», продемонстрировать полиморфизм, переопределение методов и работу с опциональной цепочкой.

## 2. Теоретические сведения

### 2.1. Функции-конструкторы и прототипы
Каждая функция в JavaScript имеет свойство `prototype`, которое используется при создании объектов через `new`. Методы, помещённые в `prototype`, разделяются всеми экземплярами. Наследование реализуется через цепочку прототипов:
- Родительский конструктор вызывается внутри дочернего с помощью `.call(this, ...)` для инициализации свойств.
- Прототип дочернего конструктора устанавливается как `Object.create(родительский.prototype)`, после чего вручную восстанавливается ссылка `constructor`.

### 2.2. Классы ES6
Ключевые слова `class`, `constructor`, `extends` и `super` предоставляют более лаконичный синтаксис, скрывающий прямое манипулирование прототипами. Классы строго следуют тем же прототипным принципам, но код становится читаемее и безопаснее.

### 2.3. Опциональная цепочка (Optional chaining)
Оператор `?.` позволяет безопасно обращаться к свойствам или вызывать методы глубоко вложенных объектов, не вызывая ошибку, если промежуточное значение равно `null` или `undefined`.

## 3. Практическая реализация

### 3.1. Прототипный подход

#### Родительский конструктор `ItemConstructor`
```javascript
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemConstructor.prototype.getInfo = function() {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemConstructor.prototype.setWeight = function(newWeight) {
  this.weight = newWeight;
};
```

#### Наследующий конструктор `WeaponConstructor`
```javascript
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity); // вызов родительского конструктора
  this.damage = damage;
  this.durability = durability;
}

// Настройка цепочки прототипов
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

// Методы, специфичные для оружия
WeaponConstructor.prototype.use = function() {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
    console.log(`${this.name} used. Durability: ${this.durability}`);
  } else {
    console.log(`${this.name} is broken and cannot be used.`);
  }
};

WeaponConstructor.prototype.repair = function() {
  this.durability = 100;
  console.log(`${this.name} repaired. Durability: ${this.durability}`);
};

// Переопределение метода getInfo (полиморфизм)
WeaponConstructor.prototype.getInfo = function() {
  const baseInfo = ItemConstructor.prototype.getInfo.call(this);
  return `${baseInfo}, Damage: ${this.damage}, Durability: ${this.durability}`;
};
```

### 3.2. Синтаксис классов ES6

#### Базовый класс `Item`
```javascript
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
```

#### Класс `Weapon`, расширяющий `Item`
```javascript
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
      console.log(`${this.name} used. Durability: ${this.durability}`);
    } else {
      console.log(`${this.name} is broken and cannot be used.`);
    }
  }

  repair() {
    this.durability = 100;
    console.log(`${this.name} repaired. Durability: ${this.durability}`);
  }

  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}
```

### 3.3. Опциональная цепочка
Пример использования оператора `?.` для безопасного вызова метода у объекта, который может отсутствовать:
```javascript
const inventory = { weapon: null };
inventory.weapon?.use(); // ничего не происходит

inventory.weapon = new Weapon("Iron Mace", 4.0, "common", 8, 50);
inventory.weapon?.use();
console.log(`Durability: ${inventory.weapon?.durability}`);
```

## 4. Результаты тестирования

### 4.1. Прототипный подход
```console
=== Тестирование функций-конструкторов ===
Item: Shadow Dagger, Weight: 1.2, Rarity: uncommon, Damage: 12, Durability: 80
Shadow Dagger used. Durability: 70
Shadow Dagger repaired. Durability: 100
Item: Shadow Dagger, Weight: 1.2, Rarity: uncommon, Damage: 12, Durability: 100
```

### 4.2. Классы ES6
```console
=== Тестирование классов ===
Item: Steel Sword, Weight: 3.5, Rarity: rare
Item: Steel Sword, Weight: 4, Rarity: rare
Item: Longbow, Weight: 2, Rarity: uncommon, Damage: 15, Durability: 100
Longbow used. Durability: 90
Durability after use: 90
Longbow repaired. Durability: 100
```

### 4.3. Опциональная цепочка
```console
Опциональная цепочка:
Iron Mace used. Durability: 40
Durability: 40
```

Все методы отработали корректно, исключений не возникло, полиморфное поведение метода `getInfo` подтверждено для обоих стилей написания кода.

## 5. Выводы
- Оба подхода реализуют одинаковую иерархию наследования и демонстрируют полиморфизм.  
- Код на классах ES6 компактнее, легче читается и меньше подвержен ошибкам (например, с восстановлением `constructor`).  
- Прототипный подход наглядно показывает внутреннее устройство наследования в JavaScript и остаётся важным для понимания работы языка.  
- Оператор опциональной цепочки `?.` — удобная синтаксическая возможность, повышающая безопасность кода при работе с необязательными свойствами и методами.

## 6. Полный код программы (приложение)
Файл `lab_inheritance.js` (объединённый листинг двух подходов и тестов):

```javascript
// --- Прототипный подход ---
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemConstructor.prototype.getInfo = function() {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemConstructor.prototype.setWeight = function(newWeight) {
  this.weight = newWeight;
};

function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

WeaponConstructor.prototype.use = function() {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
    console.log(`${this.name} used. Durability: ${this.durability}`);
  } else {
    console.log(`${this.name} is broken and cannot be used.`);
  }
};

WeaponConstructor.prototype.repair = function() {
  this.durability = 100;
  console.log(`${this.name} repaired. Durability: ${this.durability}`);
};

WeaponConstructor.prototype.getInfo = function() {
  const baseInfo = ItemConstructor.prototype.getInfo.call(this);
  return `${baseInfo}, Damage: ${this.damage}, Durability: ${this.durability}`;
};

// --- Классы ES6 ---
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
      console.log(`${this.name} used. Durability: ${this.durability}`);
    } else {
      console.log(`${this.name} is broken and cannot be used.`);
    }
  }

  repair() {
    this.durability = 100;
    console.log(`${this.name} repaired. Durability: ${this.durability}`);
  }

  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}

// --- Тесты ---
console.log('=== Тестирование функций-конструкторов ===');
const dagger = new WeaponConstructor("Shadow Dagger", 1.2, "uncommon", 12, 80);
console.log(dagger.getInfo());
dagger.use();
dagger.repair();
console.log(dagger.getInfo());

console.log('=== Тестирование классов ===');
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(`Durability after use: ${bow.durability}`);
bow.repair();

console.log('Опциональная цепочка:');
const inventory = { weapon: null };
inventory.weapon?.use();
inventory.weapon = new Weapon("Iron Mace", 4.0, "common", 8, 50);
inventory.weapon?.use();
console.log(`Durability: ${inventory.weapon?.durability}`);
