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
    let foundTitle = books.find(prod => prod.title === searchRes);

    if(foundTitle){
        res.json(foundTitle);
    }else{
        res.status(404).json({ message: "error" });
    }
})

router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    let foundId = books.find(prod => prod.id === bookId);

    if(foundId){
        res.json(foundId);
    }else{
        res.status(404).json({ message: "error" });
    }
})

module.exports = router;
