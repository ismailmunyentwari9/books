const formButton = document.querySelector('form');
const container = document.querySelector('.big-lists-container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

class BookStorage {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('awesomeBooks')) || [];
    this.displaydata();
    this.remove();
  }
  static cleanInputs(){
    title.value='';
    author.value='';
  }

  addBook(title, author) {
    const id = this.books.length + 1;
    const book = new BookStorage(title, author, id);
    this.books.push(book);
    localStorage.setItem('awesomeBooks', JSON.stringify(this.books));
    this.displaydata();
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
    localStorage.setItem('awesomeBooks', JSON.stringify(this.books));
    this.displaydata();
  }

  displaydata() {
    const uniqueBooks = this.books.filter((book, index, arr) => arr.findIndex((t) => t.id === book.id) === index);
    const datas = uniqueBooks.map((book) => {
      return `<div class="book-lists">
                <div><p>"${book.title}"</p>by<p>${book.author}</p></div>
                <button class="clean" data-id=${book.id}>Remove</button>
              </div>`;
    }).join('');
    container.innerHTML = datas;
  }

  remove() {
    container.addEventListener('click', (e) => {
      if (e.target.className.includes('clean')) {
        const dataId = e.target.dataset.id;
        this.removeBook(parseInt(dataId));
      }
    });
  }
}

const library = new Library();

formButton.addEventListener('submit', (e) => {
  e.preventDefault();
  library.addBook(title.value, author.value);
  Library.cleanInputs();
  
});
