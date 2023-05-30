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
    let foundName = products.find(prod => prod.name === searchRes);

    if(foundName){
        res.json(foundName);
    }else{
        res.status(404).json({ message: "error" });
    };
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    let foundId = products.find(prod => prod.id == productId);

    if(foundId){
        res.json(foundId);
    }else{
        res.status(404).json({ message: "error id not found" });
    };
   
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.send(newProduct);
});

router.put('/:id', (req, res) => {
    const newId = req.params.id;
    const newDetails = req.body;

    let updatedProduct = products.find(prod => prod.id == newId);

    if(updatedProduct){
        updatedProduct.name = newDetails.name;
        updatedProduct.price = newDetails.price;
    }else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;