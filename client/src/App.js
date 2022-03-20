import LandingPage from "./ClientSite/Components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"
import Home from "./ClientSite/Components/Home/Home";
import "./index.css"
import { Container, Grid } from "@mui/material";
import Search from "./ClientSite/Components/Searchpage/Search";
function App() {
   return (
      <BrowserRouter>
         <ScrollToTop />
         <Container disableGutters maxWidth="xl" sx={{
            bgcolor: "#171334",
            padding: 2,

            minHeight: '100vh',
         }}>
            <Routes>

               <Route exact path="/" element={<Home />} />
               <Route exact path="/search" element={<Search />} />
               <Route path="/welcome" element={<LandingPage />} />
            </Routes>


         </Container>


      </BrowserRouter>

   )

}

export default App;
