import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
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
import Album from "./pages/AlbumPage/album/Album";
import AlbumList from "./pages/AlbumPage/albumList/AlbumList";
import NewAlbum from "./pages/AlbumPage/newAlbum/NewAlbum";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAsyncUsers } from "./Redux/Slice/UserSlice";
import { fetchAsyncSingers } from "./Redux/Slice/SingerSlice";
import { fetchAsyncMusicians } from "./Redux/Slice/MusicianSlice";
import { fetchAsyncGenres } from "./Redux/Slice/GenreSlice";
import { fetchAsyncSongs } from "./Redux/Slice/SongSlice";
import { fetchAsyncAlbums } from "./Redux/Slice/AlbumSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAsyncUsers());
    dispatch(fetchAsyncSingers());
    dispatch(fetchAsyncMusicians());
    dispatch(fetchAsyncGenres());
    dispatch(fetchAsyncSongs());
    dispatch(fetchAsyncAlbums());
  },[])
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path='/users'>
            <UserList />    
          </Route>
          

          {/* route for singer */}
          <Route exact path='/singers'>
            <SingerList />   
          </Route>
          <Route exact path='/singers/add'>
            <NewSinger />
          </Route>
          <Route path='/singers/edit/:singerId'>
            <UpdateSinger />
          </Route>
          <Route path='/singers/:singerId'>
            <SingerDetail />
          </Route>
          

          {/* route for musician */}
          <Route exact path='/musicians'>
            <MusicianList />   
          </Route>
          <Route exact path='/musicians/add'>
            <NewMusician />
          </Route>
          <Route path='/musicians/edit/:musicianId'>
            <UpdateMusician />
          </Route>
          <Route path='/musicians/:musicianId'>
            <MusicianDetail />
          </Route>
          
          {/* route for song */}
          <Route exact path='/songs'>
            <ListSong />   
          </Route>
          <Route exact path='/songs/add'>
            <NewSong />
          </Route>
          <Route path='/songs/:songId'>
            <SongDetail />
          </Route>
          
          {/* route for genres */}
          <Route exact path='/genres'>
            <GenreList />   
          </Route>
          <Route exact path='/genres/add'>
            <NewGenre />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
