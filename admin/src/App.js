import "./App.css";
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/UserPage/userList/UserList";
import ListSong from "./pages/SongPage/ListSongs/listSongs";
import SongDetail from "./pages/SongPage/SongDetail/SongDetail";
import NewSong from "./pages/SongPage/NewSong/newSong";
import SingerList from "./pages/SingerPage/singerList/SingerList";
import SingerDetail from "./pages/SingerPage/singer/Singer";
import UpdateSinger from "./pages/SingerPage/updateSinger/updateSinger";
import NewSinger from "./pages/SingerPage/newSinger/NewSinger";
import MusicianDetail from "./pages/MusicianPage/musican/Musican";
import MusicianList from "./pages/MusicianPage/musicanList/MusicanList";
import NewMusician from "./pages/MusicianPage/newMusican/NewMusican";
import UpdateMusician from "./pages/MusicianPage/updateMusician/updateMusician"
import GenreList from "./pages/GenrePage/genreList/GenreList";
import NewGenre from "./pages/GenrePage/newGenre/NewGenre";

import AlbumList from "./pages/AlbumPage/albumList/AlbumList";
import NewAlbum from "./pages/AlbumPage/newAlbum/NewAlbum";
import GenreUpdate from "./pages/GenrePage/GenreUpdate/GenreUpdate";
import AlbumUpdate from "./pages/AlbumPage/AlbumUpdate/AlbumUpdate";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAsyncUsers } from "./Redux/Slice/UserSlice";
import { fetchAsyncSingers } from "./Redux/Slice/SingerSlice";
import { fetchAsyncMusicians } from "./Redux/Slice/MusicianSlice";
import { fetchAsyncGenres } from "./Redux/Slice/GenreSlice";
import { fetchAsyncSongs } from "./Redux/Slice/SongSlice";
import { fetchAsyncAlbums } from "./Redux/Slice/AlbumSlice";
import Layout from "./Layout";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncUsers());
    dispatch(fetchAsyncSingers());
    dispatch(fetchAsyncMusicians());
    dispatch(fetchAsyncGenres());
    dispatch(fetchAsyncSongs());
    dispatch(fetchAsyncAlbums());
  }, [])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout page={Home} />
        </Route>
        <Route exact path='/users'>
          <Layout page={UserList} />
        </Route>


        {/* route for singer */}
        <Route exact path='/singers'>
          <Layout page={SingerList} />
        </Route>
        <Route exact path='/singers/add'>
          <Layout page={NewSinger} />
        </Route>
        <Route path='/singers/edit/:singerId'>
          <Layout page={UpdateSinger} />
        </Route>
        <Route path='/singers/:singerId'>
          <Layout page={SingerDetail} />
        </Route>


        {/* route for musician */}
        <Route exact path='/musicians'>

          <Layout page={MusicianList} />
        </Route>
        <Route exact path='/musicians/add'>
          <Layout page={NewMusician} />
        </Route>
        <Route path='/musicians/edit/:musicianId'>
          <Layout page={UpdateMusician} />
        </Route>
        <Route path='/musicians/:musicianId'>
          <Layout page={MusicianDetail} />
        </Route>

        {/* route for song */}
        <Route exact path='/songs'>

          <Layout page={ListSong} />
        </Route>
        <Route exact path='/songs/add'>
          <Layout page={NewSong} />
        </Route>
        <Route path='/songs/:songId'>
          <SongDetail />
          <Layout page={NewSong} />
        </Route>

        {/* route for genres */}
        <Route exact path='/genres'>

          <Layout page={GenreList} />
        </Route>
        <Route exact path='/genres/add'>
          <Layout page={NewGenre} />
        </Route>
        <Route exact path='/genres/edit/:genreId'>
          <Layout page={GenreUpdate} />
        </Route>

        {/* route for album */}
        <Route exact path='/albums'>

          <Layout page={AlbumList} />
        </Route>
        <Route exact path='/albums/add'>
          <Layout page={NewAlbum} />
        </Route>
        <Route exact path='/albums/edit/:albumId'>
          <Layout page={AlbumUpdate} />
        </Route>
        <Route path='/albums/:albumId'>
          {/* <AlbumDetail /> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
