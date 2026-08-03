const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'Skelm', price: 1100 },
        { id: 2, name: 'Skelmtwo', price: 1200 },
        { id: 3, name: 'Skelmthree', price: 1300 },
    ])
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);   

    const products = [
        { id: 1, name: 'Skelm', price: 1100 },
        { id: 2, name: 'Skelmtwo', price: 1200 },
        { id: 3, name: 'Skelmthree', price: 1300 },
    ];

    const requestedProduct = products.find((product) => product.id === id);

    if (requestedProduct) {
        res.json(requestedProduct);     
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.post('/', (req, res) => {
    const { name, price } = req.body
    const newProduct = {
        name,
        price,
    }
    console.log(newProduct)
    res.json({ message: "New product added", product: newProduct })
});

module.exports = router;