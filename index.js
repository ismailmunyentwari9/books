const formButton = document.querySelector('form');
let container = document.querySelector('.big-lists-container');
let title = document.querySelector('#title');
let author = document.querySelector('#author');

let ArrayBooks=[];
function BookStorage (title,author,id){
     this.title=title;
     this.author=author;
     this.id=id;
}

class UI{
    static displaydata() {
        // Filter out duplicates based on the 'id' property
        let uniqueBooks = ArrayBooks.filter((book, index, arr) =>
          arr.findIndex(t => t.id === book.id) === index
        );
      
        let datas = uniqueBooks.map((items) => {
          return `<div class="book-lists">
              <p>${items.title}</p>
              <p>${items.author}</p>
              <button class="clean" data-id=${items.id}>Remove</button>
              <hr>
          </div>`;
        }).join('');
      
        container.innerHTML = datas;
      }
      

    static cleanInputs(){
        title.value='';
        author.value='';
    }
}


formButton.addEventListener('submit', (e) =>{
    e.preventDefault();
    id = ArrayBooks.length+1;
    listObject= new BookStorage(title.value,author.value,id);
    ArrayBooks=[...ArrayBooks,listObject];
    localStorage.setItem('awesomeBooks', JSON.stringify(ArrayBooks));
    UI.displaydata();
    UI.cleanInputs();
    
})

window.addEventListener('load',()=>{
    if(localStorage.getItem('awesomeBooks')){
        ArrayBooks=JSON.parse(localStorage.getItem('awesomeBooks'));
        UI.displaydata();
    }
})

container.addEventListener('click',(e) =>{
    if(e.target.className.includes('clean')){
        e.target.parentElement.remove();
        dataId= e.target.dataset.id;
        const index = ArrayBooks.findIndex(book => book.id == dataId);
        ArrayBooks.splice(index,1);
        const UpdatedArray= JSON.stringify(ArrayBooks);
        localStorage.setItem('awesomeBooks', UpdatedArray); // update local storage
        ArrayBooks = JSON.parse(UpdatedArray);
        UI.displaydata();
    }
})






