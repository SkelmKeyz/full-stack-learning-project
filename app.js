const cors = require('cors');
const express = require('express');
const data = require('./data/mockdata.json');
const productsRouter = require('./products');
const app = express();
let port = 3001;

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

// using the public folder at the root of the project
app.use(express.static("public"));

// using the router
app.use('/images', express.static('images'));

app.use(express.json());

app.use('/products', productsRouter);

app.get('/home', (req, res) => {
    res.send('Skelm is here');
});

app.get('/about', (req, res) => {
    res.send('Skelm route');
});

app.get('/contact', (req, res) => {
    res.send('Skelm route 2');
});


app.get('/message', (req, res) => {
    res.json({ 'message': 'Keyz to the ignition'});
});

app.post('/message', (req, res) => {
    const { name, message } = req.body

    console.log('New message: ', name, message)
    res.json({ message: 'Thank you for your cooporation'})
})

app.put('/put', (req, res) => {
    res.send('This is a PUT resquest at /edit');
})

app.delete('/delete', (req, res) => {
    res.send('This is a DELETE request at /delete')
})



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
    console.log(data);
});

