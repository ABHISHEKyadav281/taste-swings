const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser")
const mongoDB = require('./db')
mongoDB();

app.get('/', (req, res) => {
    res.send("hello world");
})

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin",["https://taste-swings.vercel.app/","http://localhost:3000"]);
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Oringin,X-Requested-With,Content-Type,Accept",
//     );
//     next(); 
// })
app.use(
    require("cors")({
        origin: [
            "https://taste-swings.vercel.app",
            "http://localhost:3000",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api', require('./Routes/CreateUsers'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.listen(port, () => {
    console.log("listening");
});