const { transactions } = require("./transactions");
const {
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
} = require("./functions");

function separator(title) {
  console.log("\n" + "─".repeat(50));
  console.log(" " + title);
  console.log("─".repeat(50));
}

function logTransactions(arr) {
  if (arr.length === 0) {
    console.log("  (пустой массив)");
    return;
  }
  arr.forEach((t) =>
    console.log(
      `  [${t.transaction_id}] ${t.transaction_date}  ${t.transaction_type.padEnd(6)}  $${t.transaction_amount.toFixed(2).padStart(8)}  ${t.merchant_name}`
    )
  );
}

separator("1. Уникальные типы транзакций");
console.log(getUniqueTransactionTypes(transactions));

separator("2. Общая сумма всех транзакций");
console.log("  $" + calculateTotalAmount(transactions).toFixed(2));

separator("3. [extra] Сумма за конкретную дату/период");
console.log("  2024 год:          $" + calculateTotalAmountByDate(transactions, 2024).toFixed(2));
console.log("  Январь 2024:       $" + calculateTotalAmountByDate(transactions, 2024, 1).toFixed(2));
console.log("  15 января 2024:    $" + calculateTotalAmountByDate(transactions, 2024, 1, 15).toFixed(2));
console.log("  Только 15-е числа: $" + calculateTotalAmountByDate(transactions, undefined, undefined, 15).toFixed(2));

separator("4. Транзакции по типу: debit");
logTransactions(getTransactionByType(transactions, "debit"));

separator("5. Транзакции в диапазоне дат 2024-02-01 … 2024-02-28");
logTransactions(getTransactionsInDateRange(transactions, "2024-02-01", "2024-02-28"));

separator("6. Транзакции продавца 'StreamService'");
logTransactions(getTransactionsByMerchant(transactions, "StreamService"));

separator("7. Среднее значение транзакций");
console.log("  $" + calculateAverageTransactionAmount(transactions).toFixed(2));

separator("8. Транзакции с суммой $100 – $500");
logTransactions(getTransactionsByAmountRange(transactions, 100, 500));

separator("9. Общая сумма дебетовых транзакций");
console.log("  $" + calculateTotalDebitAmount(transactions).toFixed(2));

separator("10. Месяц с наибольшим числом транзакций");
console.log("  Месяц №" + findMostTransactionsMonth(transactions));

separator("11. Месяц с наибольшим числом дебетовых транзакций");
console.log("  Месяц №" + findMostDebitTransactionMonth(transactions));

separator("12. Каких транзакций больше?");
console.log("  " + mostTransactionTypes(transactions));

separator("13. Транзакции до 2024-03-01");
logTransactions(getTransactionsBeforeDate(transactions, "2024-03-01"));

separator("14. Поиск транзакции по id 't007'");
console.log(findTransactionById(transactions, "t007"));

separator("15. Описания всех транзакций");
console.log(mapTransactionDescriptions(transactions));

separator("[extra] Пустой массив");
const empty = [];
console.log("  Уникальные типы:  ", getUniqueTransactionTypes(empty));
console.log("  Общая сумма:      ", calculateTotalAmount(empty));
console.log("  Средняя сумма:    ", calculateAverageTransactionAmount(empty));
console.log("  Макс. месяц:      ", findMostTransactionsMonth(empty));
console.log("  Тип транзакций:   ", mostTransactionTypes(empty));
console.log("  Описания:         ", mapTransactionDescriptions(empty));

separator("[extra] Массив с одной транзакцией");
const single = [
  {
    transaction_id: "s001",
    transaction_date: "2024-06-10",
    transaction_amount: 99.99,
    transaction_type: "debit",
    transaction_description: "Single test transaction",
    merchant_name: "TestShop",
    card_type: "debit",
  },
];
console.log("  Уникальные типы:  ", getUniqueTransactionTypes(single));
console.log("  Общая сумма:      ", calculateTotalAmount(single).toFixed(2));
console.log("  Средняя сумма:    ", calculateAverageTransactionAmount(single).toFixed(2));
console.log("  Макс. месяц:      ", findMostTransactionsMonth(single));
console.log("  Тип транзакций:   ", mostTransactionTypes(single));
console.log("  По типу debit:");
logTransactions(getTransactionByType(single, "debit"));
console.log("  Описания:         ", mapTransactionDescriptions(single));