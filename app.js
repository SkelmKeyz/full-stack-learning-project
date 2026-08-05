const cors = require('cors');
const express = require('express');
const data = require('./data/mockdata.json');
const productsRouter = require('./products');
const app = express();
let port = 3001;

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

// JSON parser first
app.use(express.json());

// using the public folder at the root of the project
app.use(express.static("public"));

// using the router
app.use('/images', express.static('images'));

// using express.json and urlencoded
app.use(express.json())

app.use(express.urlencoded({ extended: true }));


// Get with next
app.get('/next', (req, res, next) => {
    console.log('The ignition key');
    next();
}, (req, res) => {
    res.send('Ignition route sep up with a second callback')
})

// Get - redirect method
app.get('/redirect', (req, res) => {
    res.redirect('http://www.google.com');
})

//route chaining
//Get
app
   .route('/class', (req, res) => {
    res.send('http://www.google.com');
})
   .get((req, res) => {
    res.send(data);
    throw new error();
})
   .put((req, res) => {
    res.send('This is a PUT resquest at /edit');
})
   .delete((req, res) => {
    res.send('This is a DELETE request at /delete')
})
   

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something is out of order!")
});

//Get
app.get('/', (req, res) => {
    res.json(data);
})

//Post - express.json and express.urlencoded
app.post('/item', (req, res) => {
  const { name, item } = req.body;
  console.log('New item:', name, item);

  res.json({
    message: 'Item received successfully',
    name,
    item
  });
});



// Get with routing parameters
app.get('/class/:id', (req, res) => {
    // Middleware: Acess the routing parameters
    const StudentId = Number(req.params.id); 
    
    const Student = data.filter(item => item.id === StudentId);
//Everything above this line is Middleware
    res.json(Student);
})





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







app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
    console.log(`Loaded ${data.length} records`);
});

