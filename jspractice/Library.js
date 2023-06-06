class Library{
    constructor(name){
        this.name = name;
        this.books = [];
    }

    addBook(book){
        this.books.push(book);
    }

    getBooks(){
        return this.books;
    }

    removeBook(book){
        this.books = this.books.filter(indivBook => indivBook !== book);
    }

    checkOutBook(book){
        book.checkOut();
    }

    checkInBook(book){
        book.checkIn();
    }

    findBookByTitle(title){
        return this.books.find(element => element.title == title);
    }

    findBooksByAuthor(name){
        return this.books.find(element => element.author == name);
    }

    getAllCheckedOutBooks(){
        return this.books.filter(element => element.checkOut());
    }

    getAllOverdueBooks(){
        return this.books.filter(element => element.dueDate < Date.now());
    }

    updateBook(title, bookDataObj){
        let found = this.findBookByTitle(title);
        found.title = bookDataObj.title;
        found.author = bookDataObj.author;
        this.books.push(found);
    }

    findMostPopularAuthor(){
        
        
    }

    compareTwoBooks(bookOne, bookTwo){
        return (bookOne.numPages > bookTwo.numPages ? bookOne : bookTwo);
    }

    addMultipleBooks(booksArr){
        for(let i = 0; i < booksArr.length; i++){
            this.addBook(booksArr[i]);
        }
        
    }

    saveToLocalStorage() {
        localStorage.setItem('libraryBooks', JSON.stringify(this.books));
    }
    // Load books from localStorage
    loadFromLocalStorage() {
        //attempts to load the value from localStorage, but if there is
        //nothing there yet, then an empty array is returned. That is what
        //the || [] is doing.
        this.books = JSON.parse(localStorage.getItem('libraryBooks')) || [];
    }
        
}