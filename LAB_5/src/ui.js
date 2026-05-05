/**
 * Модуль работы с DOM.
 * @module ui
 */

import { formatDate, truncateDescription } from './utils.js';
import { addTransaction, removeTransaction, getTransactions, calculateTotal } from './transactions.js';

// Кэшируем DOM-элементы
const form = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const tbody = document.getElementById('transaction-body');
const totalSpan = document.getElementById('total-amount');
const detailText = document.getElementById('detail-text');
const table = document.getElementById('transaction-table');

/**
 * Обновляет отображение общей суммы на странице.
 */
function updateTotal() {
  const total = calculateTotal();
  totalSpan.textContent = total.toFixed(2);
}

/**
 * Добавляет строку транзакции в таблицу.
 * @param {Object} transaction - Объект транзакции.
 */
function renderTransactionRow(transaction) {
  const row = document.createElement('tr');
  row.dataset.id = transaction.id;
  row.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');

  // Дата и время
  const dateCell = document.createElement('td');
  dateCell.textContent = formatDate(transaction.date);
  row.appendChild(dateCell);

  // Категория
  const categoryCell = document.createElement('td');
  categoryCell.textContent = transaction.category;
  row.appendChild(categoryCell);

  // Краткое описание
  const descCell = document.createElement('td');
  descCell.textContent = truncateDescription(transaction.description);
  row.appendChild(descCell);

  // Кнопка удаления
  const actionCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.classList.add('delete-btn');
  actionCell.appendChild(deleteBtn);
  row.appendChild(actionCell);

  tbody.appendChild(row);
}

/**
 * Перерисовывает всю таблицу (при необходимости, или можно обновлять по отдельности).
 */
function renderAllTransactions() {
  tbody.innerHTML = '';
  getTransactions().forEach(transaction => renderTransactionRow(transaction));
}

/**
 * Обработчик отправки формы добавления транзакции.
 * @param {Event} e - Событие отправки формы.
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const amount = amountInput.value.trim();
  const category = categorySelect.value;
  const description = descriptionInput.value.trim();

  // Простейшая валидация
  if (!amount || isNaN(amount)) {
    alert('Введите корректную сумму.');
    return;
  }
  if (!category) {
    alert('Выберите категорию.');
    return;
  }
  if (!description) {
    alert('Введите описание.');
    return;
  }

  const transaction = addTransaction(amount, category, description);
  renderTransactionRow(transaction);
  updateTotal();

  // Очистка формы
  amountInput.value = '';
  categorySelect.value = '';
  descriptionInput.value = '';
}

/**
 * Обработчик клика по таблице (делегирование событий).
 * - Если клик по кнопке "Удалить" -> удаление транзакции.
 * - Если клик по любой ячейке (кроме кнопки) -> отображение полного описания выбранной транзакции.
 * @param {Event} e - Событие клика.
 */
function handleTableClick(e) {
  const target = e.target;

  // Ищем ближайшую строку (tr), к которой относится клик
  const row = target.closest('tr');
  if (!row) return;

  const transactionId = row.dataset.id;

  // Если клик по кнопке удаления
  if (target.classList.contains('delete-btn')) {
    if (removeTransaction(transactionId)) {
      row.remove();
      updateTotal();
      // Если удаленная транзакция отображалась в деталях — очищаем
      if (detailText.dataset.id === transactionId) {
        detailText.textContent = '';
        delete detailText.dataset.id;
      }
    }
    return;
  }

  // Иначе клик по строке — показываем полное описание
  const transactionsArray = getTransactions();
  const transaction = transactionsArray.find(t => t.id === transactionId);
  if (transaction) {
    detailText.textContent = transaction.description;
    detailText.dataset.id = transactionId;
  }
}

/**
 * Инициализация приложения: загрузка начального состояния и навешивание обработчиков.
 */
export function initApp() {
  // Первоначальная отрисовка (если есть какие-то стартовые данные, пока пусто)
  renderAllTransactions();
  updateTotal();

  // Обработчик отправки формы
  form.addEventListener('submit', handleFormSubmit);

  // Делегирование событий клика на таблице
  table.addEventListener('click', handleTableClick);
}