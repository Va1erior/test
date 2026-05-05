/**
 * Модуль вспомогательных функций.
 * @module utils
 */

/**
 * Генерирует уникальный идентификатор на основе текущего времени и случайного числа.
 * @returns {string} Уникальный строковый ID.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Форматирует объект Date в строку вида "ДД.ММ.ГГГГ ЧЧ:ММ".
 * @param {Date} date - Объект даты.
 * @returns {string} Отформатированная строка.
 */
export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Возвращает первые 4 слова строки, если слов больше, добавляет многоточие.
 * @param {string} text - Исходный текст.
 * @returns {string} Краткое описание (первые 4 слова).
 */
export function truncateDescription(text) {
  const words = text.trim().split(/\s+/);
  if (words.length <= 4) return text;
  return words.slice(0, 4).join(' ') + '…';
}