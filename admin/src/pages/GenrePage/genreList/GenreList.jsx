import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardGenre from "./CardGenre";
import { fetchAsyncGenres, getGenre, getListGenres, refreshGenre } from "../../../Redux/Slice/GenreSlice";
import { useSelector, useDispatch } from "react-redux";

export default function GenreList() {
   const [loading,setLoading] = useState(true);
   const genres = useSelector(getListGenres);
   const dispatch = useDispatch();

   // const genre = useSelector(getGenre);
   // console.log(genre)
   useEffect(() => {
      const action = async()=>{
         setLoading(true);
         // await dispatch(refreshGenre());
         await dispatch(fetchAsyncGenres());
      }
      action();
      setLoading(false)
   }, [])
   return (
      <Container maxWidth='lg' component={Paper}>
         {
            loading ?
               <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
               :
               <>
                  <Typography variant="h6" sx={{}}>
                     List Genres
                  </Typography>
                  <Link to='/genres/add'>
                     <Button variant="contained" size="small" sx={{ mt: 0.5, mb: 1.5 }}>
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
               </>
         }

      </Container>
   );
}
