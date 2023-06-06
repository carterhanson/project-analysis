// create some sample books
let book1 = new Book('Moby Dick', 'Herman Melville', 378, false, new Date(2023, 5, 20));
let book2 = new Book('1984', 'George Orwell', 328, false, new Date(2023, 5, 25));
let book3 = new Book('Brave New World', 'Aldous Huxley', 311, false, new Date(2023, 5, 30));
let book4 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false, new Date(2023, 5, 28));
let book5 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false, new Date(2023, 5, 18));
let book6 = new Book('The Catcher in the Rye', 'J.D. Salinger', 277, false, new Date(2023, 5, 18));

// create a library
let library = new Library("Extensive Library");

// create an array to store test results
let testResults = [];

// add individual books to the library
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Test 1: Check the number of books in the library (expecting 3)
testResults.push(library.getBooks().length === 3); // true

// Test 2: Remove a book from the library
library.removeBook(book1);
testResults.push(library.getBooks().length === 2); // true

// Test 3: Check out a book
library.checkOutBook(book2);
testResults.push(library.findBookByTitle('1984').isCheckedOut === true); // true

// Test 4: Check in a book
library.checkInBook(book2);
testResults.push(library.findBookByTitle('1984').isCheckedOut === false); // true

// Test 5: Find a book by title
testResults.push(library.findBookByTitle('1984') === book2); // true

// add additional books to the library
library.addBook(book4);
library.addBook(book5);
library.addBook(book6);

// Test 6: Find books by author
testResults.push(library.findBooksByAuthor('J.D. Salinger') === book6); // true

// Test 7: Get all checked out books (none at this point)
testResults.push(library.getAllCheckedOutBooks().length === 0); // true

// Test 8: Get all overdue books (none at this point)
testResults.push(library.getAllOverdueBooks().length === 0); // true

// Check out and set some overdue books
let pastDueDate = new Date();
pastDueDate.setDate(pastDueDate.getDate() - 1); // set to yesterday
book2.checkOut();
book2.dueDate = pastDueDate; // this book is now overdue

// Test 9: Check again for all overdue books (expecting 1)
testResults.push(library.getAllOverdueBooks().length === 1); // true

// Test 10: Update a book
let newBookData = {
title: 'Nineteen Eighty-Four',
author: 'Eric Arthur Blair',
numPages: 328,
isCheckedOut: false,
dueDate: new Date(2023, 6, 30)
};

library.updateBook(book2.title, newBookData);
testResults.push(library.findBookByTitle('Nineteen Eighty-Four').author === 'Eric Arthur Blair'); // true

// Test 11: Find the most popular author
// testResults.push(library.findMostPopularAuthor() === 'Aldous Huxley'); // true

// Test 12: Compare two books
testResults.push(library.compareTwoBooks(book1, book2) === book1); // true

// create an array of books
let newBooks = [
new Book('Book 7', 'Author 7', 200, false, new Date(2023, 5, 20)),
new Book('Book 8', 'Author 8', 250, false, new Date(2023, 5, 25)),
new Book('Book 9', 'Author 9', 300, false, new Date(2023, 5, 30))
];

// Test 13: Add multiple books
library.addMultipleBooks(newBooks);
console.log(library.getBooks());
testResults.push(library.getBooks().length === 9); // true

library.saveToLocalStorage();
// log the test results
console.log(testResults);