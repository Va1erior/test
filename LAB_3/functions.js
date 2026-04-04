// 1. Возвращает массив уникальных типов транзакций
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map((t) => t.transaction_type))];
}

// 2. Вычисляет сумму всех транзакций
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 3. [extra] Вычисляет общую сумму транзакций за указанный год, месяц и/или день
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter((t) => {
      const [y, m, d] = t.transaction_date.split("-").map(Number);
      if (year !== undefined && y !== year) return false;
      if (month !== undefined && m !== month) return false;
      if (day !== undefined && d !== day) return false;
      return true;
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 4. Возвращает транзакции указанного типа (debit или credit)
function getTransactionByType(transactions, type) {
  return transactions.filter((t) => t.transaction_type === type);
}

// 5. Возвращает транзакции в диапазоне дат [startDate, endDate] включительно
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return transactions.filter((t) => {
    const date = new Date(t.transaction_date);
    return date >= start && date <= end;
  });
}

// 6. Возвращает транзакции указанного продавца
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter((t) => t.merchant_name === merchantName);
}

// 7. Возвращает среднее значение суммы транзакций
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

// 8. Возвращает транзакции с суммой в диапазоне [minAmount, maxAmount]
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (t) => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
  );
}

// 9. Вычисляет общую сумму дебетовых транзакций
function calculateTotalDebitAmount(transactions) {
  return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}

// 10. Возвращает номер месяца с наибольшим числом транзакций
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;
  const counts = {};
  transactions.forEach((t) => {
    const month = Number(t.transaction_date.split("-")[1]);
    counts[month] = (counts[month] || 0) + 1;
  });
  return Number(Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)));
}

// 11. Возвращает номер месяца с наибольшим числом дебетовых транзакций
function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

// 12. Возвращает 'debit', 'credit' или 'equal'
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

// 13. Возвращает транзакции, совершённые строго до указанной даты
function getTransactionsBeforeDate(transactions, date) {
  const limit = new Date(date);
  return transactions.filter((t) => new Date(t.transaction_date) < limit);
}

// 14. Возвращает транзакцию по уникальному идентификатору
function findTransactionById(transactions, id) {
  return transactions.find((t) => t.transaction_id === id) || null;
}

// 15. Возвращает массив описаний транзакций
function mapTransactionDescriptions(transactions) {
  return transactions.map((t) => t.transaction_description);
}

module.exports = {
  getUniqueTransactionTypes,
  calculateTotalAmount,
  calculateTotalAmountByDate,
  getTransactionByType,
  getTransactionsInDateRange,
  getTransactionsByMerchant,
  calculateAverageTransactionAmount,
  getTransactionsByAmountRange,
  calculateTotalDebitAmount,
  findMostTransactionsMonth,
  findMostDebitTransactionMonth,
  mostTransactionTypes,
  getTransactionsBeforeDate,
  findTransactionById,
  mapTransactionDescriptions,
};