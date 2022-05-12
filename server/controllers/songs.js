import cloudinary from "../cloudinary.js";
import { ListenModel } from "../models/ListenModel.js";
import { SongModel } from "../models/SongModel.js";
import ContentBasedRecommender from 'content-based-recommender';
import { LikelistModel } from "../models/LikelistModel.js";
import { CommentModel } from "../models/CommentModel.js";
export const getSongs = async (req, res) => {
    try {
        const songs = await SongModel.find();
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSong = async (req, res) => {
    try {
        const song = await SongModel.findOne({ _id: req.params.id });
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRecentSongs = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today - 24 * 60 * 60 * 1000);
        const songs = await SongModel.find({ createdAt: { $gt: tomorrow, $lte: today } });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getTopSongs = async (req, res) => {
    try {
        const songs = await SongModel.find().limit(10).sort('-rating -listens');
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getBadSongs = async (req, res) => {
    try {
        const songs = await SongModel.find().limit(10).sort('rating listens');
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongByGenre = async (req, res) => {
    try {
        const songs = await SongModel.find({ genre: req.params.id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongByAlbum = async (req, res) => {
    try {
        const songs = await SongModel.find({ album: req.params.id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongByMusician = async (req, res) => {
    try {
        const songs = await SongModel.find({ musician: req.params.id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongBySinger = async (req, res) => {
    try {
        const songs = await SongModel.find({ singer: req.params.id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postSong = async (req, res) => {
    try {
        // cloudinary.v2.uploader.upload(file, options, callback);
        const resultImage = await cloudinary.uploader.upload(req.files.image[0].path, { folder: 'SoundJoy/Images', resource_type: 'auto' });
        const resultAudio = await cloudinary.uploader.upload(req.files.mp3[0].path, { folder: 'SoundJoy/Audios', resource_type: 'auto' });

        // console.log(resultImage);
        // console.log(resultAudio);
        const newSong = req.body;
        newSong.image = resultImage.secure_url;
        newSong.link_mp3 = resultAudio.secure_url;
        newSong.cloudinary_image_id = resultImage.public_id;
        newSong.cloudinary_mp3_id = resultAudio.public_id;
        // console.log(newSong);
        const song = new SongModel(newSong);
        // console.log(song);
        await song.save();
        // res.status(200);
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
        // console.log(err);
    }
};

export const updateSong = async (req, res) => {
    try {
        const song = await SongModel.findById(req.params.id);
        const updateSong = req.body;
        
        if (req.file !== undefined) {
            await cloudinary.uploader.destroy(song.cloudinary_image_id);
            await cloudinary.uploader.destroy(song.cloudinary_mp3_id);
            const resultImage = await cloudinary.uploader.upload(req.files.image[0].path, { folder: 'SoundJoy/Images', resource_type: 'auto' });

            const resultAudio = await cloudinary.uploader.upload(req.files.mp3[0].path, { folder: 'SoundJoy/Audios', resource_type: 'auto' });
            
            song.image = resultImage.secure_url;
            song.link_mp3 = resultAudio.secure_url;
            song.cloudinary_image_id = resultImage.public_id;
            song.cloudinary_mp3_id = resultAudio.public_id;
            
        }
        const newsong = await SongModel.findOneAndUpdate({ _id: req.params.id }, updateSong, { new: true });
        res.status(200).json(newsong);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const song = await SongModel.findOneAndDelete({ _id: req.params.id });
        await cloudinary.uploader.destroy(song.cloudinary_image_id);
        await cloudinary.uploader.destroy(song.cloudinary_mp3_id);
        await ListenModel.deleteMany({ song: req.params.id });
        await CommentModel.deleteMany({ song: req.params.id });
        
        const likelists = await LikelistModel.find({ songs: req.params.id }).select('songs');
        likelists.forEach(likelist => {
            likelist.songs = likelist.songs.filter(song => song.toString() !== req.params.id);
        });

        likelists.forEach(async (likelist) => {
            const updateLikelist = likelist;
            delete  updateLikelist._id;
            await LikelistModel.findOneAndUpdate({ _id: likelist._id }, updateLikelist);
        });

        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRecommendSongs = async (req, res) => {
    try {
        let songs = await SongModel.find();
        let listens = await ListenModel.find({ user: req.params.id }).select('song');
        let notListens= songs.slice();
        let listened = []
        for (let i=0; i<listens.length; i++){
            notListens = notListens.filter(song => song._id.toString() !== listens[i].song.toString());
            let listenSong = songs.filter(song => song._id.toString() === listens[i].song.toString());
            listened.push(...listenSong);
        }

        const recommender = new ContentBasedRecommender({
            minScore: 0.01,
            maxSimilarDocuments: 100
        });

        const documents = songs.map(item => {
            return {
                    ...item,
                    id: item._id.toString(),
                    content: item.name,
                };
        });

        const documentsListened = listened.map((item) => {
            return {
                ...item,
                id: item._id.toString(),
                content: item.name,
            };
        });

        recommender.train(documents);
        
        let idSimilar = [];
        for (let i=0; i<documentsListened.length; i++){
            let similarDocuments = recommender.getSimilarDocuments(documentsListened[i].id, 0, 5);
            idSimilar = [...idSimilar, ...similarDocuments];
        }
        
        
        // console.log(recommenderSong);

        let likelists = await LikelistModel.find({ user: req.params.id }).select('songs');
        let likelistsSong = []
        for (let i=0; i<likelists.length; i++){
            likelistsSong.push(...likelists[i].songs);
        }
        likelistsSong = likelistsSong.map((song) => {
            return { id: song.toString()};
        });

        for (let i=0;i<listens.length;i++){
            likelistsSong = likelistsSong.filter(song => song.id !== listens[i].song.toString());
        }
        for (let i=0; i<likelistsSong.length; i++){
            let similarDocuments = recommender.getSimilarDocuments(likelistsSong[i].id, 0, 5);
            idSimilar = [...idSimilar, ...similarDocuments];
        }
        let recommenderSong = []
        for (let i=0; i<idSimilar.length; i++){
            let Song = songs.filter(song => song._id.toString() === idSimilar[i].id);
            recommenderSong.push(...Song);
        }

        let topSong = await SongModel.find().sort('-rating -listens');

        //remove songs in listens
        for (let i=0;i<listens.length;i++){
            topSong = topSong.filter(song => song._id.toString() !== listens[i].song.toString());
        }

        //remove songs in likelists
        for (let i=0;i<likelistsSong.length;i++){
            topSong = topSong.filter(song => song.id !== likelistsSong[i].id);
        }

        //remove  songs recommender
        for (let i=0; i<idSimilar.length; i++){
            topSong = topSong.filter(song => song._id.toString() !== idSimilar[i].id);
        }

        let limit = 10;
        if (recommenderSong.length<limit){
            for (let i=0; i<topSong.length; i++){
                recommenderSong.push(topSong[i]);
                if (recommenderSong.length === limit)  break;
            }
        }

        res.status(200).json({ recommend: recommenderSong});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};