
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map((t) => t.transaction_type))];
}


function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}


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


function getTransactionByType(transactions, type) {
  return transactions.filter((t) => t.transaction_type === type);
}


function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return transactions.filter((t) => {
    const date = new Date(t.transaction_date);
    return date >= start && date <= end;
  });
}


function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter((t) => t.merchant_name === merchantName);
}


function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}


function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (t) => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
  );
}


function calculateTotalDebitAmount(transactions) {
  return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}


function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;
  const counts = {};
  transactions.forEach((t) => {
    const month = Number(t.transaction_date.split("-")[1]);
    counts[month] = (counts[month] || 0) + 1;
  });
  return Number(Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)));
}


function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

function getTransactionsBeforeDate(transactions, date) {
  const limit = new Date(date);
  return transactions.filter((t) => new Date(t.transaction_date) < limit);
}


function findTransactionById(transactions, id) {
  return transactions.find((t) => t.transaction_id === id) || null;
}

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