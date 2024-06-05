class Library {
    constructor() {
        this.bookList = document.getElementById('bookList');
        this.borrowButton = document.getElementById('borrowButton');
        this.clearLocalStorageButton = document.getElementById('clearLocalStorageButton');

        this.borrowButton.addEventListener('click', this.borrowBooks.bind(this));
        this.clearLocalStorageButton.addEventListener('click', this.clearLocalStorage.bind(this));
        this.displayBooks();
    }

    getBooks() {
        const storedBooks = localStorage.getItem('books');
        return storedBooks ? JSON.parse(storedBooks) : this.getDefaultBooks();
    }

    getDefaultBooks() {
        return [
            { title: "The Fall of the Roman Empire", author: "Peter Heather" },
            { title: "SPQR: A History of Ancient Rome", author: "Mary Beard" },
            { title: "Rubicon: The Last Years of the Roman Republic", author: "Tom Holland" },
            { title: "Caesar: Life of a Colossus", author: "Adrian Goldsworthy" },
            { title: "The Twelve Caesars", author: "Suetonius" },
            { title: "The Rise of Rome: The Making of the World's Greatest Empire", author: "Anthony Everitt" }
        ];
    }

    saveBooks(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    displayBooks() {
        const storedBooks = this.getBooks();
        this.bookList.innerHTML = '';

        storedBooks.forEach(book => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'selectedBooks';
            input.value = JSON.stringify(book);
            li.appendChild(input);
            li.appendChild(document.createTextNode(`${book.title} by ${book.author}`));
            this.bookList.appendChild(li);
        });
    }

    borrowBooks() {
        const selectedBooks = document.querySelectorAll('input[name="selectedBooks"]:checked');
        const borrowedBooks = [];

        selectedBooks.forEach(book => {
            const bookInfo = JSON.parse(book.value);
            borrowedBooks.push(bookInfo);
        });

        const storedBooks = this.getBooks();
        const updatedBooks = storedBooks.filter(book => !borrowedBooks.some(borrowedBook => borrowedBook.title === book.title));
        this.saveBooks(updatedBooks);
        window.location.reload();

        const storedBorrowedBooks = this.getBorrowedBooks();
        storedBorrowedBooks.push(...borrowedBooks);
        localStorage.setItem('borrowedBooks', JSON.stringify(storedBorrowedBooks));
        this.updateBorrowedList();
        this.displayBooks();
    }

    clearLocalStorage() {
        localStorage.clear();
        window.location.reload();
    }

    getBorrowedBooks() {
        const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
        return storedBorrowedBooks ? JSON.parse(storedBorrowedBooks) : [];
    }

    updateBorrowedList() {
        const borrowedList = document.getElementById('borrowedList');
        borrowedList.innerHTML = '';
        const borrowedBooks = this.getBorrowedBooks();

        borrowedBooks.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            borrowedList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Library();
});