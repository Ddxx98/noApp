const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const CsvData = require('./models/csvData')


const app = express();
const port = process.env.PORT || 3000;

const MONGO_URI = 'mongodb+srv://deexith2016:9BcPF6lMARj8RySY@cluster0.bbhxwwb.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
    useNewUrlParser: true
}).then(() => { console.log("Connected to database") }).catch((err) => {
    console.log("Error")
});

app.use(express.json());
const auth = require('./routes/auth')
app.use("/",auth)

const uploadRoute = require("./routes/upload")
app.use("/",uploadRoute)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
