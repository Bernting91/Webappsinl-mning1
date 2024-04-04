document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
});

function getBooks() {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : getDefaultBooks();
}

function getDefaultBooks() {
    return [
        { title: "The Fall of the Roman Empire", author: "Peter Heather" },
        { title: "SPQR: A History of Ancient Rome", author: "Mary Beard" },
        { title: "Rubicon: The Last Years of the Roman Republic", author: "Tom Holland" },
        { title: "Caesar: Life of a Colossus", author: "Adrian Goldsworthy" },
        { title: "The Twelve Caesars", author: "Suetonius" },
        { title: "The Rise of Rome: The Making of the World's Greatest Empire", author: "Anthony Everitt" }
    ];
}

function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
    const storedBooks = getBooks();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    storedBooks.forEach(book => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'selectedBooks';
        input.value = JSON.stringify(book);
        li.appendChild(input);
        li.appendChild(document.createTextNode(`${book.title} by ${book.author}`));
        bookList.appendChild(li);
    });
}

document.getElementById('borrowButton').addEventListener('click', function() {
    const selectedBooks = document.querySelectorAll('input[name="selectedBooks"]:checked');
    const borrowedBooks = [];

    selectedBooks.forEach(book => {
        const bookInfo = JSON.parse(book.value);
        borrowedBooks.push(bookInfo);
    });

    const storedBooks = getBooks();
    const updatedBooks = storedBooks.filter(book => !borrowedBooks.some(borrowedBook => borrowedBook.title === book.title));
    saveBooks(updatedBooks);
    window.location.reload();


    const storedBorrowedBooks = getBorrowedBooks();
    storedBorrowedBooks.push(...borrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(storedBorrowedBooks));
    updateBorrowedList();
    displayBooks();
});

document.getElementById('clearLocalStorageButton').addEventListener('click', function() {
    localStorage.clear();
    window.location.reload(); 
});


function getBorrowedBooks() {
    const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
    return storedBorrowedBooks ? JSON.parse(storedBorrowedBooks) : [];
}

function updateBorrowedList() {
    const borrowedList = document.getElementById('borrowedList');
    borrowedList.innerHTML = '';
    const borrowedBooks = getBorrowedBooks();

    borrowedBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        borrowedList.appendChild(li);
    });
}