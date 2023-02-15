const formButton = document.querySelector('form');
const container = document.querySelector('.big-lists-container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

class AwesomeLibrary {
  static cleanInputs() {
    title.value = '';
    author.value = '';
  }

  static addBook(title, author) {
    const books = JSON.parse(localStorage.getItem('awesomeBooks')) || [];
    const id = books.length + 1;
    const book = { title, author, id };
    books.push(book);
    localStorage.setItem('awesomeBooks', JSON.stringify(books));
    this.displaydata(books);
  }

  static removeBook(id) {
    const books = JSON.parse(localStorage.getItem('awesomeBooks')) || [];
    const updatedBooks = books.filter((book) => book.id !== id);
    localStorage.setItem('awesomeBooks', JSON.stringify(updatedBooks));
    this.displaydata(updatedBooks);
  }

  static displaydata(books) {
    const uniqueBooks = books.filter(
      (book, index, arr) => arr.findIndex((t) => t.id === book.id) === index,
    );
    const datas = uniqueBooks
      .map(
        (book) => `<div class="book-lists">
                <div class="listText"><p>"${book.title}"</p>by<p>${book.author}</p></div>
                <button class="clean" data-id=${book.id}>Remove</button>
              </div>`,
      )
      .join('');
    container.innerHTML = datas;
  }

  static remove() {
    container.addEventListener('click', (e) => {
      if (e.target.className.includes('clean')) {
        const dataId = e.target.dataset.id;
        this.removeBook(parseInt(dataId, 10));
      }
    });
  }

  static initialize() {
    const books = JSON.parse(localStorage.getItem('awesomeBooks')) || [];
    this.displaydata(books);
    this.remove();
  }
}

AwesomeLibrary.initialize();

formButton.addEventListener('submit', (e) => {
  e.preventDefault();
  AwesomeLibrary.addBook(title.value, author.value);
  AwesomeLibrary.cleanInputs();
});

const listLink = document.querySelector('.listLink');
const addNewLink = document.querySelector('.addNewLink');
const contactLink = document.querySelector('.contactLink');
const bookList = document.querySelector('.bookList');
const addBook = document.querySelector('.addBook');
const contact = document.querySelector('.contact');
const date = document.querySelector('.date');

listLink.addEventListener('click', () => {
  bookList.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
});

addNewLink.addEventListener('click', () => {
  addBook.classList.remove('hide');
  bookList.classList.add('hide');
  contact.classList.add('hide');
});

contactLink.addEventListener('click', () => {
  contact.classList.remove('hide');
  addBook.classList.add('hide');
  bookList.classList.add('hide');
});

const currentDate = new Date();
const datetime = currentDate.toLocaleDateString('en-US', {
  dateStyle: 'long',
});

const time = currentDate.toLocaleTimeString('en-US', {
  timeStyle: 'medium',
});

date.innerHTML = `${datetime}, ${time}`;
