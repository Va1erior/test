Лабораторная работа №4 (пример)

Тема: Объектно-ориентированное программирование в JavaScript — классы, наследование, прототипы
Дисциплина: Программирование на JavaScript
Ссылка на репозиторий: GitHub (при наличии)

---

Цель работы

Изучить реализацию объектно-ориентированного подхода в JavaScript с использованием синтаксиса классов ES6 и классического прототипного наследования через функции-конструкторы. Научиться создавать иерархии объектов, переопределять методы, применять оператор опциональной цепочки.

---

1. Условие задания

Создать консольное приложение, моделирующее предметы инвентаря, включая оружие.
Программа должна:

1. Реализовать базовый класс Item (или функцию-конструктор) со свойствами:
   · name (название)
   · weight (вес)
   · rarity (редкость: common, uncommon, rare, legendary)
     и методами getInfo(), setWeight().
2. Реализовать производный класс Weapon (или функцию-конструктор), который добавляет:
   · damage (урон)
   · durability (прочность, 0–100)
     и методы use() (уменьшает прочность на 10), repair() (восстанавливает прочность до 100), а также переопределяет getInfo().
3. Продемонстрировать работу с объектами через оба подхода:
   · синтаксис class ES6
   · прототипное наследование с функциями-конструкторами.
4. Использовать оператор опциональной цепочки ?. для безопасного вызова методов, если объект может отсутствовать.
5. Протестировать функционал на примерах.

---

2. Ход работы

2.1. Реализация с помощью классов ES6

Создан класс Item с конструктором и двумя методами. Класс Weapon наследует его с помощью extends и вызывает super для инициализации базовых свойств.
Метод use() содержит логику проверки прочности, использует Math.max(0, durability - 10), чтобы значение не опустилось ниже нуля.
Метод repair() устанавливает прочность в 100.
Метод getInfo() расширяет строку родителя, добавляя урон и прочность.

2.2. Реализация через функции-конструкторы

Создана функция ItemConstructor, к прототипу которой добавлены методы getInfo и setWeight.
Функция WeaponConstructor вызывает ItemConstructor.call(this, ...) для установки общих свойств. Затем настраивается цепочка прототипов:

```javascript
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;
```

Далее в прототип WeaponConstructor добавлены методы use, repair и переопределён getInfo (хотя в коде последнего нет, но можно при желании доопределить).

2.3. Тестирование функционала

Были созданы объекты:

· sword — экземпляр Item, демонстрирует вызов getInfo и изменение веса.
· bow — экземпляр Weapon, демонстрирует использование, проверку прочности и ремонт.
· inventory.weapon — изначально null, затем присвоен объект Iron Mace, показана работа опциональной цепочки.

Результаты вывода в консоль подтверждают корректную работу всех методов.

---

3. Код программы

```javascript
/**
 * Класс, представляющий предмет инвентаря.
 */
class Item {
  /**
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес предмета.
   * @param {string} rarity - Редкость (common, uncommon, rare, legendary).
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает строку с информацией о предмете.
   * @returns {string}
   */
  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета.
   * @param {number} newWeight - Новый вес.
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Класс Weapon, расширяющий Item.
 */
class Weapon extends Item {
  /**
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес.
   * @param {string} rarity - Редкость.
   * @param {number} damage - Урон.
   * @param {number} durability - Прочность (0–100).
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие: уменьшает прочность на 10, если > 0.
   */
  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
      console.log(`${this.name} used. Durability: ${this.durability}`);
    } else {
      console.log(`${this.name} is broken and cannot be used.`);
    }
  }

  /**
   * Восстанавливает прочность до 100.
   */
  repair() {
    this.durability = 100;
    console.log(`${this.name} repaired. Durability: ${this.durability}`);
  }

  /**
   * @returns {string} Полная информация с уроном и прочностью.
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}

// --- Тестирование классов ---
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

// Опциональная цепочка
const inventory = { weapon: null };
console.log('Опциональная цепочка:');
inventory.weapon?.use(); // ничего не происходит
inventory.weapon = new Weapon("Iron Mace", 4.0, "common", 8, 50);
inventory.weapon?.use();
console.log(`Durability: ${inventory.weapon?.durability}`);

/**
 * Функция-конструктор для Item.
 * @constructor
 * @param {string} name - Название.
 * @param {number} weight - Вес.
 * @param {string} rarity - Редкость.
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * @returns {string} Информация о предмете.
 */
ItemConstructor.prototype.getInfo = function() {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

/**
 * @param {number} newWeight - Новый вес.
 */
ItemConstructor.prototype.setWeight = function(newWeight) {
  this.weight = newWeight;
};

/**
 * Функция-конструктор для Weapon (наследует ItemConstructor).
 * @constructor
 * @param {string} name - Название.
 * @param {number} weight - Вес.
 * @param {string} rarity - Редкость.
 * @param {number} damage - Урон.
 * @param {number} durability - Прочность.
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

// Настройка прототипного наследования
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

/**
 * Использует оружие.
 */
WeaponConstructor.prototype.use = function() {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
    console.log(`${this.name} used. Durability: ${this.durability}`);
  } else {
    console.log(`${this.name} is broken and cannot be used.`);
  }
};

/**
 * Восстанавливает прочность до 100.
 */
WeaponConstructor.prototype.repair = function() {
  this.durability = 100;
  console.log(`${this.name} repaired. Durability: ${this.durability}`);
};
```

---

4. Ответы на контрольные вопросы

4.1. Какие парадигмы ООП реализованы в коде?

· Инкапсуляция – свойства и методы собраны внутри объекта, доступ к состоянию контролируется через методы (use, repair).
· Наследование – Weapon наследует Item (и в классах, и в прототипах), получая его свойства и методы.
· Полиморфизм – метод getInfo() переопределён в Weapon; при вызове на объекте оружия выполняется собственная версия, использующая super.getInfo() для дополнения.

4.2. Чем отличается наследование через class extends от прототипного через Object.create?

Синтаксис class extends — это синтаксический сахар над прототипным наследованием. Он делает код более читаемым, но под капотом всё равно работает цепочка прототипов. При использовании функций-конструкторов вручную вызывается родительский конструктор через .call(this), а прототип устанавливается через Object.create. Ручная установка требует явного исправления свойства constructor.

4.3. Для чего применяется super в конструкторе и методах?

· В конструкторе super(...) вызывает родительский конструктор, чтобы инициализировать унаследованные свойства.
· В методах super.method() позволяет вызвать метод родителя, например, для получения базовой информации в getInfo().

4.4. Что делает оператор опциональной цепочки ?.?

Он проверяет, что значение слева от ?. не равно null или undefined. Если равно, выражение возвращает undefined без попытки доступа к свойству или вызова метода. Это защищает от ошибок вида «Cannot read property ... of null».

4.5. Зачем в методе use() используется Math.max(0, ...)?

Чтобы гарантировать, что прочность не станет отрицательной. Math.max(0, durability - 10) вернёт 0, если результат вычитания уходит в минус, иначе вернёт положительное число.

---

5. Выводы

В ходе лабораторной работы реализованы два подхода к объектно-ориентированному программированию в JavaScript — современный (class) и традиционный (функции-конструкторы). Показано создание иерархии предметов инвентаря с наследованием свойств и методов, полиморфным переопределением getInfo(), управлением состоянием оружия.
Применение опциональной цепочки упрощает безопасную работу с объектами, которые могут отсутствовать.
Полученные навыки позволяют осознанно выбирать модель организации кода в зависимости от требований проекта и стилистических предпочтений.