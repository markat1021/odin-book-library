let myLibrary = [];
let selectedBookID = null;

let addBookButton = document.querySelector("#addNewBook");
addBookButton.addEventListener("click", () => {
  console.log("add Plus button pressed")
  openDialog("add")
});

let closeBookButton = document.querySelector("#close");
closeBookButton.addEventListener("click", closeDialog); 

let commitAddBookButton = document.querySelector("#add");
commitAddBookButton.addEventListener("click", () => {
  if (commitAddBookButton.textContent == "Add"){ 
    addBookToLibraryObject() 
  } else {
    console.log("selectedBookID: "+selectedBookID);
    myLibrary[selectedBookID].title = document.querySelector("#title").value;
    myLibrary[selectedBookID].author = document.querySelector("#author").value;
    myLibrary[selectedBookID].pages = document.querySelector("#page-count").value;
    myLibrary[selectedBookID].read = document.querySelector("#read").checked;
    paintLibrary()
  }
  closeDialog();
}); 

function deleteBook() {
  myLibrary.splice(selectedBookID,1);
  paintLibrary();
  closeDialog();
}

function editBook(index) {
  selectedBookID = index;
  openDialog("edit");
  document.querySelector("#title").value = myLibrary[index].title;
  document.querySelector("#author").value = myLibrary[index].author;
  document.querySelector("#page-count").value = myLibrary[index].pages;
  document.querySelector("#read").checked = myLibrary[index].read;
};

function openDialog(addOrEdit) {  
  //get proper dialog
  let newDialog = document.querySelector("#container-hidden")
  newDialog.id = "container-revealed";
  let instructionElement = document.querySelector("#instructions");
  if (addOrEdit == "add") {
    instructionElement.textContent = "Add Book Info";
    document.querySelector("#add").textContent = "Add";
    document.querySelector("#delete").style.visibility = "hidden";
  } else {
    instructionElement.textContent = "Edit Book Info";
    document.querySelector("#add").textContent = "Save";
    document.querySelector("#delete").style.visibility = "visible";
  }

  //stop body scrolling
  document.querySelector("body").style["overflow"] = "hidden";
}

function closeDialog () { 
  console.log("closing dialog")
  let newDialog = document.querySelector("#container-revealed");
  newDialog.id = "container-hidden";

  //re-enable body scrolling
  document.querySelector("body").style["overflow"] = "visible";
}

function addBookToLibraryObject() {
  console.dir(document.querySelector("#read"));
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#page-count").value;
  let read = document.querySelector("#read").checked;
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
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let div = document.createElement("div");
    div.classList.add("Book");
    div.id = `div_${i}`;
    let edit = document.createElement("img");
    let title = document.createElement("h2");
    let by_line = document.createElement("p");
    let author = document.createElement("h3");
    let pages = document.createElement("h4");
    let read = document.createElement("div");
    read.classList.add("onoffswitch");
    read.id = `tog_${i}`;
    let info = 
      `<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" 
          id="myonoffswitch" tabindex="0" checked>
        <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
        </label>`
    
    edit.src = "./images/edit_white_24dp.svg";
    title.textContent = book.title;
    by_line.textContent = "by";
    author.textContent = book.author;
    pages.textContent = book.pages+" pgs"
    read.innerHTML = info;
    div.append(edit,title,by_line,author,pages,read);
    mainDiv.appendChild(div);
    paintReadUnreadToggle(i);
  };


  // change read/unread status by clicking on toggle for each book
  [...document.getElementsByClassName("Book")].forEach(
    (element, index, array) => {
      element.querySelector("div").addEventListener("mousedown", (e) => {
        const id = index;
        invertReadUnreadSetting(id);
        paintReadUnreadToggle(id);
        return false;  // unsure how to stop toggling from causing scrolling back to top
      });

      element.querySelector("img").addEventListener("mousedown", (e) => {
        const id = index;
        editBook(index);
        return false;  // unsure how to stop toggling from causing scrolling back to top
      });
    }
);
};

function invertReadUnreadSetting(index) {
  if (myLibrary[index].read == true) {
    myLibrary[index].read = false;
  } else {
    myLibrary[index].read = true;
  }
};

function paintReadUnreadToggle(index) {
  let tog_label = document.querySelector(`#div_${index} .onoffswitch`);
  let tog_inner = document.querySelector(`#div_${index} .onoffswitch-inner`);
  let tog_switch = document.querySelector(`#div_${index} .onoffswitch-switch`);

  if (myLibrary[index].read == false) {
    tog_label.style["margin-left"] = "0"; 
    tog_label.style["right"] = "0px";
    tog_inner.style["margin-left"] = "-100%";
    tog_switch.style["right"] = "60px";
  } else {
    tog_label.style['margin-left'] = '0';
    tog_label.style['right'] = '0px';
    tog_inner.style['margin-left'] = '0';
    tog_inner.style["color"] = "red";
    tog_switch.style["right"] = "0px";
  }
}

myLibrary.push(new Book("The Hobbit","J.R.R. Tolkien",295,true));
myLibrary.push(new Book("The Claw","Eli Wittington",387,false));
myLibrary.push(new Book("Where Have You Been?","Mark Hagge",125,true));
myLibrary.push(new Book("I Like to Read, and So Should You","Maslow Smith",5,true));
myLibrary.push(new Book("In the Middle of the Night","Jimmeny Cricket",45,true));
myLibrary.push(new Book("Cooking for Geniuses","Chef Paulo",1278,true));
paintLibrary();