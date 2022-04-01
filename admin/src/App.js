import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import SingerList from "./pages/singerList/SingerList";
import Singer from "./pages/singer/Singer";
import NewSinger from "./pages/newSinger/NewSinger";
import MusicanList from "./pages/musicanList/MusicanList";
import Musican from "./pages/musican/Musican";
import NewMusican from "./pages/newMusican/NewMusican";
import GenreList from "./pages/genreList/GenreList";
import Genre from "./pages/genre/Genre";
import NewGenre from "./pages/newGenre/NewGenre";
import AlbumList from "./pages/albumList/AlbumList";
import Album from "./pages/album/Album";
import NewAlbum from "./pages/newAlbum/NewAlbum";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newProduct">
            <NewProduct />
          </Route>
          <Route path="/genres">
            <GenreList />
          </Route>
          <Route path="/genre/:genreId">
            <Genre />
          </Route>
          <Route path="/newGenre">
            <NewGenre />
          </Route>
          <Route path="/albums">
            <AlbumList />
          </Route>
          <Route path="/album/:albumId">
            <Album />
          </Route>
          <Route path="/newAlbum">
            <NewAlbum />
          </Route>
          <Route path="/singers">
            <SingerList />
          </Route>
          <Route path="/singer/:singerId">
            <Singer />
          </Route>
          <Route path="/newSinger">
            <NewSinger />
          </Route>
          <Route path="/musicans">
            <MusicanList />
          </Route>
          <Route path="/musican/:musicanId">
            <Musican />
          </Route>
          <Route path="/newMusican">
            <NewMusican />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
