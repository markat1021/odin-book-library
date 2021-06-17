let myLibrary = [];

let addBookButton = document.querySelector("#addNewBook");
addBookButton.addEventListener("click", () => {
  let newDialog = document.querySelector("#container-hidden")
  newDialog.id = "container-revealed";
}); 

let closeBookButton = document.querySelector("#close");
closeBookButton.addEventListener("click", closeDialog); 

let commitAddBookButton = document.querySelector("#add");
commitAddBookButton.addEventListener("click", () => {
  addBookDialog();
  closeDialog();
}); 

function closeDialog () { 
  let newDialog = document.querySelector("#container-revealed");
  newDialog.id = "container-hidden";
}

function addBookDialog() {
  console.dir(document.querySelector("#read"));
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#page-count").value;
  let read = document.querySelector("#read").checked;
  console.log(read)
  let newBook = new Book(title,author,pages,read);
  addBook(newBook);
}

function addBook(book) {
  myLibrary.push(book);
  paintLibrary();
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${(read) ? "read" : "not read yet"}`;
    };
  }
}


function paintLibrary() {
  var paintedBooks = document.getElementsByClassName('Book');
  while(paintedBooks[0]) {
      paintedBooks[0].parentNode.removeChild(paintedBooks[0]);
  }
  let mainDiv = document.querySelector("main");
  myLibrary.forEach(book => {
    let div = document.createElement("div")
    div.classList.add("Book");
    div.textContent = book.info();
    mainDiv.appendChild(div);
  });
};

myLibrary.push(new Book("The Hobbit","J.R.R. Tolkien",295,true));
myLibrary.push(new Book("The Claw","Eli Wittington",387,false));
myLibrary.push(new Book("The GOAT","Mark Hagge",125,true));
myLibrary.push(new Book("The GOAT2","Mark Hagge",125,true));
myLibrary.push(new Book("The GOAT3","Mark Hagge",125,true));
myLibrary.push(new Book("The GOAT4","Mark Hagge",125,true));
paintLibrary();