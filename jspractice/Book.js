class Book{
//     Each book object should have properties for title , author , numPages , dueDate (Date), and isCheckedOut
//     (boolean). Implement a constructor method that initializes these properties, and also implement a checkOut() and a checkIn()
//     method for checking out and checking in a book, respectively.
    constructor(title, author, pages, isCheckedOut, dueDate){
        this.title = title;
        this.author = author;
        this.numPages = pages;
        this.isCheckedOut = isCheckedOut;
        this.dueDate = dueDate;
    }


    checkOut(){
        this.isCheckedOut = true;
    }

    checkIn(){
        this.isCheckedOut = false;
    }


}