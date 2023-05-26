const express = require('express');
const router = express.Router();

const products = [
    { id: 1, name: 'Guitar', price: 10 },
    { id: 2, name: 'Piano', price: 20 },
    { id: 3, name: 'Drum', price: 30 },
];


//GET localhost:3000/products
router.get('/', (req, res) => {
    res.json(products);
});

router.get('/search', (req, res) => {
    const searchRes = req.query.name;
    let found = products.find(element => element.name === searchRes);
    if(found){
        res.json(found);
    }else{
        res.status(404).json("error");
    };
});

router.get('/:id', (req, res) => {
    const productsId = req.params.id;
    let foundId = products.find(element => element.id == productsId);
    if(foundId){
        res.json(foundId)
    }else{
        res.status(404).json("error id not found");
    };
   
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.send(newProduct);
    
});

router.put('/:id', (req, res) => {
    const updatedProduct = req.body;
    res.json(updatedProduct);
});

module.exports = router;