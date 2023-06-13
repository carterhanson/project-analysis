const express = require('express');
const router = express.Router();
const fs = require('fs');

const booksFile = './database/books.json';
let books = [];

fs.readFile(booksFile, (err, data) => {
    if(err){
        throw err;
    }

    books = JSON.parse(data);
})

router.get('/', (req, res) => {
    res.json(books);
});

router.get('/search', (req, res) => {
    const searchRes = req.query.title;
    let foundTitle = books.find(book => book.title === searchRes);

    if(foundTitle){
        res.json(foundTitle);
    }else{
        res.status(404).json({ message: "error" });
    }
})

router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    let found = books.find(book => book.id == bookId);

    if(found){
        res.json(found);
    }else{
        res.status(404).json({ message: "error" });
    }
})

router.post('/', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    fs.writeFile(booksFile, JSON.stringify(books), (err) => {
        if(err){
            console.log('error writing to fle', err);
        }else{
            console.log('successfully wrote file');
        }
    })
    res.status(201).json({ success: true, message: "book created successfully"});
})

router.put('/:id', (req, res) => {
    const newId = req.params.id;
    const newDetails = req.body;

    let updatedBook = books.find(book => book.id == newId);

    if(updatedBook){
        updatedBook.title = newDetails.title;
        updatedBook.author = newDetails.author;
        updatedBook.price = newDetails.price;
    }else{
        res.status(404).json({ message: "book not found"});
    }
})

module.exports = router;
