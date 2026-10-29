const express = require('express');
const app = express();
app.use(express.json());
let books = [
    { id: 1, title: "Oliver Twist", author: "Charles Dickens" },
    { id: 2, title: "Legends of Shiva", author: "Amish Tripathi" },
    { id: 3, title: "Chacha Chaudhary", author: "Pran" }
];
app.get('/books', (req, res) => {
    res.json(books);
});
app.get('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let book = books.find(book => book.id === id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});
app.post('/books', (req, res) => {
    let newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let book = books.find(book => book.id === id);

    if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});
app.delete('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.send("Book deleted successfully");
    } else {
        res.status(404).send("Book not found");
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
