import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';


import users from './routers/users.js';
import genres from './routers/genres.js';
import musicians from './routers/musicians.js';
import singers from './routers/singers.js';
import albums from './routers/albums.js';
import songs from './routers/songs.js';
import comments from './routers/comments.js';
import likelists from './routers/likelists.js';

const app = express();
const PORT = 5000;
const URI = "mongodb+srv://soundjoy:soundjoy@cluster0.nas64.mongodb.net/SoundJoyDB?retryWrites=true&w=majority";

app.use(bodyParser.json({ limit: '30mb' })); //gioi han dung luong client submit len server
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' })); 
app.use(cors());

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch(error => {
        console.log('error', error);
    })

app.use('/users', users);
app.use('/genres', genres);
app.use('/musicians', musicians);
app.use('/singers', singers);
app.use('/albums', albums);
app.use('/songs', songs);
app.use('/comments', comments);
app.use('/likelists', likelists);