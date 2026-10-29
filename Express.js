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
        res.status(404).json({ message: "Book not found" });
    }
});
app.post('/books', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    if (!title || !author) {
        return res.status(400).json({
            message: "Please enter the book title and author"
        });
    }
    let newBook = {
        id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
        title: title,
        author: author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    let title = req.body.title;
    let author = req.body.author;
    if (!title || !author) {
        return res.status(400).json({
            message: "Please enter the book title and author"
        });
    }
    book.title = title;
    book.author = author;
    res.json(book);
});
// Delete a book
app.delete('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
