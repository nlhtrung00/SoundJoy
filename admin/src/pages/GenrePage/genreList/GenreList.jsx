import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardGenre from "./CardGenre";
import { fetchAsyncGenres, getGenre, getListGenres, refreshGenre } from "../../../Redux/Slice/GenreSlice";
import { useSelector, useDispatch } from "react-redux";
export default function GenreList() {
  const genres = useSelector(getListGenres);
  const dispatch = useDispatch();
  console.log(genres)
  const genre = useSelector(getGenre);
  console.log(genre)
  useEffect(()=>{
    dispatch(refreshGenre());
    dispatch(fetchAsyncGenres());
  },[])
  return (
    <Container maxWidth='lg' component={Paper}>
      <Typography variant="h6" sx={{ }}>
        List Genres
      </Typography>
      <Link to='/genres/add'>
        <Button variant="contained" size="small" sx={{ mt: 0.5, mb:1.5 }}>
          Create new
          <AddIcon />
        </Button>
      </Link>
      <Grid container spacing={2}>
        {genres && genres.map((genre) => {
          return (
            <Grid item lg={2} md={3} xs={6} key={genre._id}>
              <CardGenre genre={genre} />
            </Grid>
          )
        })}

      </Grid>
    </Container>
  );
}
