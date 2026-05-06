export function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function validateBookData({ title, author, year, genre }) {
  const errors = [];
  if (!title.trim()) errors.push('Название обязательно');
  if (!author.trim()) errors.push('Автор обязателен');
  const yearNum = Number(year);
  const currentYear = new Date().getFullYear();
  if (!year || isNaN(yearNum) || yearNum < 1000 || yearNum > currentYear) {
    errors.push(`Год должен быть числом от 1000 до ${currentYear}`);
  }
  if (!genre.trim()) errors.push('Жанр обязателен');
  return errors;
}

// Форматирование ISO даты в локальный короткий формат
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}