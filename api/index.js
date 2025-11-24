const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const mongoDB = require('./db');

mongoDB();

app.use(
    require("cors")({
        origin: [
            "https://tasteswings.onrender.com",
            "http://localhost:3000",              
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello world");
});

// Routes
app.use('/api', require('./Routes/CreateUsers'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
    console.log("Server listening on port", port);
});
