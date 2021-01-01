import express from "express";
import mongoose from "mongoose";


const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/signup');
const todoRouter = require('./routes/todo');
const listRouter = require('./routes/list');


const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(express.json());

app.get('/health-check', (req, res, next) => {
    res.status(200).json({ ok: 1})
})
app.use((req, res, next) => {
    console.log(`HOST ${req.headers.host} [${req.method}] ${req.originalUrl}`);
    next();
});


app.get('/health-check', (req, res, next) => {
    res.status(200).json({ ok: 1})
})


app.use('/todo/login', loginRouter);
app.use('/todo/signup', signUpRouter);
app.use('/todo/todo', todoRouter);
app.use('/todo/list', listRouter);

app.listen(port, () => {
    console.log(`Server is currently running on port: ${port}`);
});
