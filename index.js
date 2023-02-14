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
                <div><p>"${book.title}"</p>by<p>${book.author}</p></div>
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
