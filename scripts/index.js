class BorrowedBooks {
    constructor() {
        this.returnToLibraryButton = document.getElementById('returnToLibraryButton');
        this.clearLocalStorageButton = document.getElementById('clearLocalStorageButton');

        this.returnToLibraryButton.addEventListener('click', this.returnToLibrary.bind(this));
        this.clearLocalStorageButton.addEventListener('click', this.clearLocalStorage.bind(this));

        this.displayBorrowedBooks();
    }

    getBorrowedBooks() {
        const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
        return storedBorrowedBooks ? JSON.parse(storedBorrowedBooks) : [];
    }

    displayBorrowedBooks() {
        const borrowedBooks = this.getBorrowedBooks();
        const borrowedList = document.getElementById('borrowedList');
        borrowedList.innerHTML = '';

        borrowedBooks.forEach(book => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'selectedBorrowedBooks';
            input.value = JSON.stringify(book);
            li.appendChild(input);
            li.appendChild(document.createTextNode(`${book.title} by ${book.author}`));
            borrowedList.appendChild(li);
        });
    }

    returnToLibrary(event) { 
        event.preventDefault();
        const selectedBorrowedBooks = document.querySelectorAll('input[name="selectedBorrowedBooks"]:checked');
        const returnedBooks = [];

        selectedBorrowedBooks.forEach(book => {
            const bookInfo = JSON.parse(book.value);
            returnedBooks.push(bookInfo);
        });

        const storedBorrowedBooks = this.getBorrowedBooks();
        const updatedBorrowedBooks = storedBorrowedBooks.filter(book => !returnedBooks.some(returnedBook => returnedBook.title === book.title));
        localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));

        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        returnedBooks.forEach(returnedBook => {
            if (!storedBooks.some(book => book.title === returnedBook.title)) {
                storedBooks.push(returnedBook);
            }
        });
        localStorage.setItem('books', JSON.stringify(storedBooks));

        window.location.reload();
    }

    clearLocalStorage() {
        localStorage.clear();
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new BorrowedBooks();
});