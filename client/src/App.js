import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"
import Home from "./Components/Home/Home";
import "./index.css"
import { Container, Grid } from "@mui/material";
import Search from "./Components/Searchpage/Search";
import LandingPage from "./Components/LandingPage"
import LeftBar from "./Components/LeftBar/LeftBar";
import Genres from "./Components/Genres/Genres";
import Singer from "./Components/Singers/Singer";
import Musicians from "./Components/Musician/Musician";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedin } from './Redux/Slices/AccountSlice';
import { fetchAsyncUserByAccount, fetchAsyncUsers, getListUsers, getUser } from "./Redux/Slices/UserSlice";
import Layout from "./layout";
import SingerDetail from "./Components/Singers/SingerDetail";
import MusicianDetail from "./Components/Musician/MusicianDetail";
import GenreDetail from "./Components/Genres/GenreDetail";
import SongDetail from "./Components/Song/SongDetail";
import Albums from "./Components/Album/Albums";
import AlbumDetail from "./Components/Album/AlbumDetail";
import Profile from "./Components/User/Profile";
import DetailList from "./Components/Likelist/DetailList";
import PlaysongBar from './Components/PlaysongBar/PlaysongBar';

function App() {
   const logged = useSelector(getIsLoggedin);
   const dispatch = useDispatch();
   console.log(logged===undefined)
   useEffect(()=>{
      if(logged && Object.keys(logged).length>0)
      dispatch(fetchAsyncUserByAccount(logged.accountId))
   },[logged,dispatch])
   return (
      <BrowserRouter>
         <ScrollToTop />
         <Routes>
            {!logged &&
               <>
                  <Route path="/welcome" element={<LandingPage />} />
               </>
            }
            {
               logged!==undefined && Object.keys(logged).length!==0 &&
               <>
                  <Route exact path="/" element={<Layout page={Home} />} />
                  <Route exact path="/search" element={<Layout page={Search} />} />
                  {/* genre */}
                  <Route exact path="/genres" element={<Layout page={Genres} />} />
                  <Route path="/genre">
                     <Route path=":genreId" element={<Layout page={GenreDetail} />} />

                  </Route>
                  {/* album */}
                  <Route path="/albums">
                     <Route path="" element={<Layout page={Albums} />} />
                     <Route path=":albumId" element={< Layout page={AlbumDetail} />} />

                  </Route>
                  {/* singers */}
                  <Route exact path="/singers" element={<Layout page={Singer} />} />
                  <Route path="/singer" >
                     <Route path=":singerId" element={<Layout page={SingerDetail} />} />
                  </Route>
                  {/* musician */}
                  <Route exact path="/musicians" element={<Layout page={Musicians} />} />
                  <Route path="/musician" >
                     <Route path=":musicianId" element={<Layout page={MusicianDetail} />} />
                  </Route>
                  {/* song */}
                  <Route path="/song" >
                     <Route path=":songId" element={<Layout page={SongDetail} />} />
                  </Route>
                  {/* user */}
                  <Route path="/user" >
                     <Route path=":userId" element={<Layout page={Profile} />} />
                  </Route>

                  {/* likelist */}
                  <Route path="/likelist" >
                     <Route path=":likelistId" element={<Layout page={DetailList} />} />
                  </Route>
               </>
            }

            <Route path='*' element={<Navigate to={logged!==undefined && Object.keys(logged).length===0 ? "/welcome" : "/"} />} />



         </Routes>
         {logged && Object.keys(logged).length!==0 &&<PlaysongBar />}
      </BrowserRouter >

   )

}

export default App;
