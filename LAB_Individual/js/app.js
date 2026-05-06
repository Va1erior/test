import { BookManager } from './bookManager.js';
import { renderBooks, setupEventListeners, refreshGenresAndRender, hideForm, getFormData } from './ui.js';
import { validateBookData } from './utils.js';

const bookManager = new BookManager();
const booksContainer = document.getElementById('books-container');

// Функция получения текущих значений фильтров и перерисовки
function applyAndRender() {
  const search = document.getElementById('search-input').value;
  const status = document.getElementById('status-filter').value;
  const genre = document.getElementById('genre-filter').value;
  const sortBy = document.getElementById('sort-select').value;
  const filtered = bookManager.getBooks({ search, status, genre, sortBy });
  renderBooks(filtered, booksContainer);
}

// Настройка событий
setupEventListeners(booksContainer, bookManager, applyAndRender);

// Первичное заполнение жанров
refreshGenresAndRender(bookManager, applyAndRender);

// Обработчик сохранения формы
const form = document.getElementById('book-form');
const errorsDiv = document.getElementById('form-errors');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = getFormData();
  const errors = validateBookData(data);

  if (errors.length > 0) {
    errorsDiv.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
    return;
  }

  const id = document.getElementById('book-id').value;
  if (id) {
    bookManager.updateBook(id, data);
  } else {
    bookManager.addBook(data);
  }

  hideForm();
  // После добавления/редактирования обновляем список жанров (мог добавиться новый жанр) и перерисовываем
  refreshGenresAndRender(bookManager, applyAndRender);
}); 