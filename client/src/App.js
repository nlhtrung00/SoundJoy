import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { getIsLogedin } from './Redux/Slices/AccountSlice';
import { fetchAsyncUserByAccount, getUser } from "./Redux/Slices/UserSlice";


function App() {
   const {isloged,accountId} = useSelector(getIsLogedin);
   const dispatch = useDispatch();
   console.log(accountId);
   useEffect(()=>{
      if(accountId)
      dispatch(fetchAsyncUserByAccount(accountId));
   },[accountId]);
      
   return (
      <BrowserRouter>
         <ScrollToTop />
            <Grid container>
               {isloged && 
               <Grid item lg={2.5}>
                  <LeftBar />
               </Grid>
               }
               {isloged &&
               <Grid item lg={9.5}>
                  <Routes>
                     <Route exact path="/" element={<Home />} />
                     <Route exact path="/search" element={<Search />} />
                     <Route exact path="/genres" element={<Genres />} />
                     <Route exact path="/singers" element={<Singer />} />
                     <Route exact path="/musicians" element={<Musicians />} />
                     <Route path="/welcome" element={<LandingPage />} />
                  </Routes>
               </Grid>
               }
               {!isloged&&
               <Grid item xs={12}>
                  <Routes>
                     <Route path="/" element={<LandingPage />} />
                  </Routes>
               </Grid>
               }


            </Grid>
      </BrowserRouter>

   )

}

export default App;
