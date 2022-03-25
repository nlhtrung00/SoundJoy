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
function App() {
   return (
      <BrowserRouter>
         <ScrollToTop />
         <Container disableGutters maxWidth="xl" sx={{
            bgcolor: "#171334",
            padding: 2,

            minHeight: '100vh',
         }}>
            <Grid container>
               <Grid item lg={2.5}>
                  <LeftBar />
               </Grid>
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



            </Grid>

         </Container>


      </BrowserRouter>

   )

}

export default App;
