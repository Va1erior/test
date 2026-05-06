export class BookManager {
  constructor() {
    const now = new Date().toISOString();
    this.books = [
      { id: 'b1', title: 'Преступление и наказание', author: 'Фёдор Достоевский', year: 1866, genre: 'Классика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b2', title: 'Война и мир', author: 'Лев Толстой', year: 1869, genre: 'Классика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b3', title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1967, genre: 'Фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b4', title: '1984', author: 'Джордж Оруэлл', year: 1949, genre: 'Антиутопия', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b5', title: 'О дивный новый мир', author: 'Олдос Хаксли', year: 1932, genre: 'Антиутопия', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b6', title: '451 градус по Фаренгейту', author: 'Рэй Брэдбери', year: 1953, genre: 'Научная фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b7', title: 'Три товарища', author: 'Эрих Мария Ремарк', year: 1936, genre: 'Роман', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b8', title: 'Над пропастью во ржи', author: 'Джером Д. Сэлинджер', year: 1951, genre: 'Роман', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b9', title: 'Убить пересмешника', author: 'Харпер Ли', year: 1960, genre: 'Роман', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b10', title: 'Сто лет одиночества', author: 'Габриэль Гарсиа Маркес', year: 1967, genre: 'Магический реализм', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b11', title: 'Портрет Дориана Грея', author: 'Оскар Уайльд', year: 1890, genre: 'Классика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b12', title: 'Гордость и предубеждение', author: 'Джейн Остен', year: 1813, genre: 'Классика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b13', title: 'Джейн Эйр', author: 'Шарлотта Бронте', year: 1847, genre: 'Классика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b14', title: 'Великий Гэтсби', author: 'Фрэнсис Скотт Фицджеральд', year: 1925, genre: 'Классика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b15', title: 'Анна Каренина', author: 'Лев Толстой', year: 1877, genre: 'Классика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b16', title: 'Идиот', author: 'Фёдор Достоевский', year: 1869, genre: 'Классика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b17', title: 'Братья Карамазовы', author: 'Фёдор Достоевский', year: 1880, genre: 'Классика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b18', title: 'Мы', author: 'Евгений Замятин', year: 1924, genre: 'Антиутопия', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b19', title: 'Скотный двор', author: 'Джордж Оруэлл', year: 1945, genre: 'Антиутопия', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b20', title: 'Повелитель мух', author: 'Уильям Голдинг', year: 1954, genre: 'Роман', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b21', title: 'Цветы для Элджернона', author: 'Дэниел Киз', year: 1959, genre: 'Научная фантастика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b22', title: 'Марсианские хроники', author: 'Рэй Брэдбери', year: 1950, genre: 'Научная фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b23', title: 'Автостопом по галактике', author: 'Дуглас Адамс', year: 1979, genre: 'Научная фантастика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b24', title: 'Дюна', author: 'Фрэнк Герберт', year: 1965, genre: 'Научная фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b25', title: 'Игра Эндера', author: 'Орсон Скотт Кард', year: 1985, genre: 'Научная фантастика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b26', title: 'Хоббит', author: 'Дж. Р. Р. Толкин', year: 1937, genre: 'Фэнтези', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b27', title: 'Властелин колец', author: 'Дж. Р. Р. Толкин', year: 1954, genre: 'Фэнтези', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b28', title: 'Гарри Поттер и философский камень', author: 'Дж. К. Роулинг', year: 1997, genre: 'Фэнтези', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b29', title: 'Имя розы', author: 'Умберто Эко', year: 1980, genre: 'Исторический детектив', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b30', title: 'Тень ветра', author: 'Карлос Руис Сафон', year: 2001, genre: 'Мистика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b31', title: 'Алхимик', author: 'Пауло Коэльо', year: 1988, genre: 'Приключения', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b32', title: 'Код да Винчи', author: 'Дэн Браун', year: 2003, genre: 'Триллер', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b33', title: 'Шерлок Холмс: Этюд в багровых тонах', author: 'Артур Конан Дойл', year: 1887, genre: 'Детектив', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b34', title: 'Десять негритят', author: 'Агата Кристи', year: 1939, genre: 'Детектив', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b35', title: 'Убийство в Восточном экспрессе', author: 'Агата Кристи', year: 1934, genre: 'Детектив', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b36', title: 'Тихий Дон', author: 'Михаил Шолохов', year: 1928, genre: 'Роман-эпопея', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b37', title: 'Доктор Живаго', author: 'Борис Пастернак', year: 1957, genre: 'Роман', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b38', title: 'Жизнь и судьба', author: 'Василий Гроссман', year: 1960, genre: 'Роман', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b39', title: 'Остров Крым', author: 'Василий Аксёнов', year: 1981, genre: 'Альтернативная история', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b40', title: 'Пикник на обочине', author: 'Братья Стругацкие', year: 1972, genre: 'Научная фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b41', title: 'Понедельник начинается в субботу', author: 'Братья Стругацкие', year: 1965, genre: 'Фантастика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b42', title: 'Трудно быть богом', author: 'Братья Стругацкие', year: 1964, genre: 'Фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b43', title: 'Град обреченный', author: 'Братья Стругацкие', year: 1989, genre: 'Фантастика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b44', title: 'Заводной апельсин', author: 'Энтони Бёрджесс', year: 1962, genre: 'Антиутопия', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b45', title: 'Вино из одуванчиков', author: 'Рэй Брэдбери', year: 1957, genre: 'Роман', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b46', title: 'Солярис', author: 'Станислав Лем', year: 1961, genre: 'Научная фантастика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b47', title: 'Часодеи. Часовой ключ', author: 'Наталья Щерба', year: 2011, genre: 'Фэнтези', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b48', title: 'Метро 2033', author: 'Дмитрий Глуховский', year: 2005, genre: 'Постапокалиптика', status: 'read', createdAt: now, statusChangedAt: now },
      { id: 'b49', title: 'Мечтают ли андроиды об электроовцах?', author: 'Филип К. Дик', year: 1968, genre: 'Научная фантастика', status: 'unread', createdAt: now, statusChangedAt: now },
      { id: 'b50', title: 'Щегол', author: 'Донна Тартт', year: 2013, genre: 'Роман', status: 'read', createdAt: now, statusChangedAt: now }
    ];
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  addBook(bookData) {
    const now = new Date().toISOString();
    const newBook = {
      id: this.generateId(),
      ...bookData,
      status: bookData.status || 'unread',
      createdAt: now,
      statusChangedAt: now
    };
    this.books.push(newBook);
    return newBook;
  }

  deleteBook(id) {
    this.books = this.books.filter(book => book.id !== id);
  }

  getBookById(id) {
    return this.books.find(book => book.id === id);
  }

  updateBook(id, newData) {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      const oldBook = this.books[index];
      const updatedBook = { ...oldBook, ...newData };
      // Если статус изменился, обновляем время изменения статуса
      if (oldBook.status !== updatedBook.status) {
        updatedBook.statusChangedAt = new Date().toISOString();
      }
      this.books[index] = updatedBook;
      return true;
    }
    return false;
  }

  // Получить все уникальные жанры из книг
  getAllGenres() {
    const genres = this.books.map(book => book.genre);
    return [...new Set(genres)].sort();
  }

  // Получить книги с фильтрацией, поиском и сортировкой
  getBooks({ search = '', status = '', genre = '', sortBy = 'title-asc' } = {}) {
    let result = [...this.books];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }

    if (status) {
      result = result.filter(book => book.status === status);
    }

    // Новый фильтр по жанру
    if (genre) {
      result = result.filter(book => book.genre === genre);
    }

    const [field, direction] = sortBy.split('-');
    result.sort((a, b) => {
      let valA, valB;
      if (field === 'year') {
        valA = a.year;
        valB = b.year;
      } else {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      }
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }
}