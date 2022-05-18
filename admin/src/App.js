import "./App.css";
import Home from './pages/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncUserByAccount, fetchAsyncUsers } from "./Redux/Slice/UserSlice";

import Layout from "./Layout";
import AlbumDetail from "./pages/AlbumPage/album/AlbumDetail";
import GenreDetail from "./pages/GenrePage/genre/GenreDetail";
import { getIsLoggedin } from "./Redux/Slice/AccountSlice";
import LandingPage from "./pages/LandingPage";

function App() {
  const dispatch = useDispatch();
  const logged = useSelector(getIsLoggedin)
  console.log(logged && Object.keys(logged).length === 0)
  console.log(logged)
  useEffect(() => {
    if (logged && Object.keys(logged).length > 0)
      dispatch(fetchAsyncUserByAccount(logged.accountId))

  }, [logged])


  return (
    <BrowserRouter>
      <Routes>

        {logged && Object.keys(logged).length === 0 &&
          <>

            <Route path="/welcome" element={<LandingPage />} />
          </>
        }

        {
          logged && Object.keys(logged).length !== 0 &&
          <>
            <Route exact path="/" element={<Layout page={Home} />} />

            <Route exact path='/users' element={<Layout page={UserList} />} />
            {/* route for singer */}
            <Route path='/singers'>
              <Route path="" element={<Layout page={SingerList} />} />
              <Route path="add" element={<Layout page={NewSinger} />} />
              <Route path="edit/:singerId" element={<Layout page={UpdateSinger} />} />
              <Route path=":singerId" element={<Layout page={SingerDetail} />} />
            </Route>
            {/* route for musician */}
            <Route exact path='/musicians'>
              <Route path="" element={<Layout page={MusicianList} />} />
              <Route path="add" element={<Layout page={NewMusician} />} />
              <Route path="edit/:musicianId" element={<Layout page={UpdateMusician} />} />
              <Route path=":musicianId" element={<Layout page={MusicianDetail} />} />

            </Route>

            {/* route for song */}
            <Route exact path='/songs'>
              <Route path="" element={<Layout page={ListSong} />} />
              <Route path="add" element={<Layout page={NewSong} />} />
              <Route path=":songId" element={<Layout page={SongDetail} />} />

            </Route>


            {/* route for genres */}
            <Route exact path='/genres'>
              <Route path="" element={<Layout page={GenreList} />} />
              <Route path="add" element={<Layout page={NewGenre} />} />
              <Route path="edit/:genreId" element={<Layout page={GenreUpdate} />} />
              <Route path=":genreId" element={<Layout page={GenreDetail} />} />

            </Route>
            {/* route for album */}
            <Route exact path='/albums'>
              <Route path="" element={<Layout page={AlbumList} />} />
              <Route path="add" element={<Layout page={NewAlbum} />} />
              <Route path="edit/:albumId" element={<Layout page={AlbumUpdate} />} />
              <Route path=":albumId" element={<Layout page={AlbumDetail} />} />

            </Route>
          </>
        }
        <Route path='*' element={<Navigate to={(logged && Object.keys(logged).length !== 0) ? "/" : "/welcome"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
