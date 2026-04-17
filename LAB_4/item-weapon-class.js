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