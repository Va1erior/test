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

/**
 * @returns {string} Полная информация.
 */
WeaponConstructor.prototype.getInfo = function() {
  const baseInfo = ItemConstructor.prototype.getInfo.call(this);
  return `${baseInfo}, Damage: ${this.damage}, Durability: ${this.durability}`;
};

// --- Тестирование функций-конструкторов ---
console.log('\n=== Тестирование функций-конструкторов ===');
const dagger = new WeaponConstructor("Shadow Dagger", 1.2, "uncommon", 12, 80);
console.log(dagger.getInfo());
dagger.use();
dagger.repair();
console.log(dagger.getInfo());