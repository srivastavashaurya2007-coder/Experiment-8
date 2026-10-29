const express=require("express")
const app=express();
app.use(express.json());
let books = [
    {id: 1, title: "Oliver Twist", author: "Charles Dickens"},
    {id: 2, title: "Legends of Shiva", author: "Amish Tripathi"},
    {id: 3, title: "Chacha Chaudhary:Raaka's chaos", author: "Pran"}
];
app.get('/books', (req, res) => {
    res.json(books);
});
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).send("Book not found");
    }

    res.json(book);
});
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).send("Book not found");
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).send("Book not found");
    }

    books.splice(index, 1);
    res.send("Book deleted successfully");
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
