const formButton = document.querySelector('form');
const container = document.querySelector('.big-lists-container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

let ArrayBooks = [];
function BookStorage(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

class UI {
  static displaydata() {
    // Filter out duplicates based on the 'id' property
    const uniqueBooks = ArrayBooks.filter(
      (book, index, arr) => arr.findIndex((t) => t.id === book.id) === index,
    );

    const datas = uniqueBooks
      .map(
        (items) => `<div class="book-lists">
              <p>${items.title}</p>
              <p>${items.author}</p>
              <button class="clean" data-id=${items.id}>Remove</button>
              <hr>
          </div>`,
      )
      .join('');

    container.innerHTML = datas;
  }

  static cleanInputs() {
    title.value = '';
    author.value = '';
  }
}

formButton.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = ArrayBooks.length + 1;
  const listObject = new BookStorage(title.value, author.value, id);
  ArrayBooks = [...ArrayBooks, listObject];
  localStorage.setItem('awesomeBooks', JSON.stringify(ArrayBooks));
  UI.displaydata();
  UI.cleanInputs();
});

window.addEventListener('load', () => {
  if (localStorage.getItem('awesomeBooks')) {
    ArrayBooks = JSON.parse(localStorage.getItem('awesomeBooks'));
    UI.displaydata();
  }
});

container.addEventListener('click', (e) => {
  if (e.target.className.includes('clean')) {
    e.target.parentElement.remove();
    const dataId = e.target.dataset.id;
    // eslint-disable-next-line
    const index = ArrayBooks.findIndex((book) => book.id == dataId);
    ArrayBooks.splice(index, 1);
    const UpdatedArray = JSON.stringify(ArrayBooks);
    localStorage.setItem('awesomeBooks', UpdatedArray); // update local storage
    ArrayBooks = JSON.parse(UpdatedArray);
    UI.displaydata();
  }
});
