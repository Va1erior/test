import { escapeHTML, formatDate } from './utils.js';

// Рендеринг списка книг с активной кнопкой статуса
export function renderBooks(books, container) {
  container.innerHTML = '';
  const emptyMsg = document.getElementById('empty-message');
  if (books.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-id', book.id);
    card.innerHTML = `
      <h3>${escapeHTML(book.title)}</h3>
      <p>Автор: ${escapeHTML(book.author)}</p>
      <p>Год: ${book.year}</p>
      <p>Жанр: ${escapeHTML(book.genre)}</p>
      <!-- Активная кнопка статуса -->
      <button class="status-toggle-btn ${book.status}" data-id="${book.id}">
        ${book.status === 'read' ? '✅ Прочитана' : '📖 Не прочитана'}
      </button>
      <p class="date-info">Добавлена: ${formatDate(book.createdAt)}</p>
      <p class="date-info">Статус изменён: ${formatDate(book.statusChangedAt)}</p>
      <div style="margin-top: auto;">
        <button class="edit-btn" data-id="${book.id}">Редактировать</button>
        <button class="delete-btn" data-id="${book.id}">Удалить</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Заполнение выпадающего списка жанров уникальными значениями
export function populateGenreFilter(genres) {
  const select = document.getElementById('genre-filter');
  if (!select) return;
  const currentValue = select.value;
  select.innerHTML = '<option value="">Все жанры</option>';
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
  if (currentValue && genres.includes(currentValue)) {
    select.value = currentValue;
  } else {
    select.value = '';
  }
}

// Основная настройка событий
export function setupEventListeners(container, bookManager, applyAndRender) {
  // Делегирование кликов на карточках
  container.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const id = button.dataset.id;

    // Переключение статуса
    if (button.classList.contains('status-toggle-btn')) {
      const book = bookManager.getBookById(id);
      if (book) {
        const newStatus = book.status === 'read' ? 'unread' : 'read';
        bookManager.updateBook(id, { status: newStatus });
        applyAndRender();
      }
      return;
    }

    if (button.classList.contains('delete-btn')) {
      if (confirm('Удалить эту книгу?')) {
        bookManager.deleteBook(id);
        refreshGenresAndRender(bookManager, applyAndRender);
      }
      return;
    }

    if (button.classList.contains('edit-btn')) {
      const book = bookManager.getBookById(id);
      if (book) showEditForm(book);
      return;
    }
  });

  // Кнопка добавления
  document.getElementById('toggle-form-btn').addEventListener('click', () => {
    const panel = document.getElementById('book-form-panel');
    if (panel.style.display === 'none' || panel.style.display === '') {
      showAddForm();
    } else {
      hideForm();
    }
  });

  // Отмена редактирования
  document.getElementById('cancel-edit-btn').addEventListener('click', hideForm);

  // Фильтры и поиск
  document.getElementById('search-input').addEventListener('input', applyAndRender);
  document.getElementById('status-filter').addEventListener('change', () => {
    updateReadFilterButtonState();
    applyAndRender();
  });
  document.getElementById('genre-filter').addEventListener('change', applyAndRender);
  document.getElementById('sort-select').addEventListener('change', applyAndRender);

  // Кнопка "Прочитано" – быстрый переключатель
  const readFilterBtn = document.getElementById('read-filter-btn');
  readFilterBtn.addEventListener('click', () => {
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter.value === 'read') {
      statusFilter.value = '';
      readFilterBtn.classList.remove('active');
    } else {
      statusFilter.value = 'read';
      readFilterBtn.classList.add('active');
    }
    applyAndRender();
  });

  // Кнопка "Все книги" (Моя библиотека) – сброс всех фильтров и поиска
  document.getElementById('reset-filters-btn').addEventListener('click', resetAllFilters);

  // Клик по заголовку – сброс всех фильтров
  document.getElementById('main-title').addEventListener('click', resetAllFilters);

  function resetAllFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('genre-filter').value = '';
    document.getElementById('sort-select').value = 'title-asc';
    const readFilterBtn = document.getElementById('read-filter-btn');
    readFilterBtn.classList.remove('active');
    applyAndRender();
  }

  // Обновление состояния кнопки "Прочитано" при ручном изменении статуса
  function updateReadFilterButtonState() {
    const statusFilter = document.getElementById('status-filter');
    const readFilterBtn = document.getElementById('read-filter-btn');
    if (statusFilter.value === 'read') {
      readFilterBtn.classList.add('active');
    } else {
      readFilterBtn.classList.remove('active');
    }
  }
}

// Функция для обновления жанров и рендера (используется из app.js)
export function refreshGenresAndRender(manager, renderFn) {
  populateGenreFilter(manager.getAllGenres());
  renderFn();
}

// Управление панелью формы
const formPanel = document.getElementById('book-form-panel');
const form = document.getElementById('book-form');
const errorsDiv = document.getElementById('form-errors');
const formTitle = document.getElementById('form-panel-title');
const cancelBtn = document.getElementById('cancel-edit-btn');
const bookIdInput = document.getElementById('book-id');

export function hideForm() {
  formPanel.style.display = 'none';
  form.reset();
  bookIdInput.value = '';
  cancelBtn.style.display = 'none';
  formTitle.textContent = 'Добавить книгу';
}

function showAddForm() {
  hideForm();
  formTitle.textContent = 'Добавить книгу';
  cancelBtn.style.display = 'none';
  formPanel.style.display = 'block';
}

export function showEditForm(book) {
  formTitle.textContent = 'Редактировать книгу';
  bookIdInput.value = book.id;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('year').value = book.year;
  document.getElementById('genre').value = book.genre;
  document.getElementById('status').value = book.status;
  errorsDiv.innerHTML = '';
  cancelBtn.style.display = 'inline-block';
  formPanel.style.display = 'block';
  formPanel.scrollIntoView({ behavior: 'smooth' });
}

export function getFormData() {
  return {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    year: document.getElementById('year').value,
    genre: document.getElementById('genre').value,
    status: document.getElementById('status').value
  };
}