import express from "express";
import mongoose from "mongoose";
import routes from "routes";
import { ATLAS_URI } from "/public-testing-env.js";
import cors from "cors";
const { loginRouter, signUpRouter, todoRouter, listRouter } = routes;
const app = express();
const port = 5000;

const uri = ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.json());
app.use(cors());

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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH");
    next();
});

app.use('/todo/login', loginRouter);
app.use('/todo/signup', signUpRouter);
app.use('/todo/todo', todoRouter);
app.use('/todo/list', listRouter);

app.listen(port, () => {
    console.log(`Server is currently running on port: ${port}`);
});
