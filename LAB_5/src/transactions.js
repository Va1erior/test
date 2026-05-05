/**
 * Модуль управления массивом транзакций.
 * @module transactions
 */

import { generateId } from './utils.js';

/** @type {Array<Object>} Массив транзакций */
let transactions = [];

/**
 * Добавляет новую транзакцию в массив.
 * @param {number} amount - Сумма транзакции (может быть отрицательной).
 * @param {string} category - Категория.
 * @param {string} description - Полное описание.
 * @returns {Object} Созданный объект транзакции.
 */
export function addTransaction(amount, category, description) {
  const newTransaction = {
    id: generateId(),
    date: new Date(),
    amount: parseFloat(amount),
    category,
    description,
  };
  transactions.push(newTransaction);
  return newTransaction;
}

/**
 * Удаляет транзакцию по идентификатору.
 * @param {string} id - Идентификатор транзакции.
 * @returns {boolean} true, если транзакция удалена, иначе false.
 */
export function removeTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Возвращает копию массива всех транзакций.
 * @returns {Array<Object>} Массив транзакций.
 */
export function getTransactions() {
  return [...transactions];
}

/**
 * Вычисляет общую сумму всех транзакций.
 * @returns {number} Общая сумма.
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}