import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;
const URI = "mongodb+srv://soundjoy:soundjoy@cluster0.nas64.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.json({ limit: '30mb'})); //gioi han dung luong client submit len server
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'})); 
app.use(cors());

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch(error => {
        console.log('error', error);
    })
