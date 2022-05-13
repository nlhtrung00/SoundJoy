import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncAlbums, getListAlbums } from "../../../Redux/Slice/AlbumSlice";
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CardAlbum from "./CardAlbum";
import { useEffect, useState } from "react";


export default function AlbumList() {
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   const albums = useSelector(getListAlbums);
   useEffect(() => {
      const action = async () => {
         setLoading(true)
         await dispatch(fetchAsyncAlbums());

      }
      action();
      setLoading(false);
   }, [])
   return (
      <Container maxWidth='xl' component={Paper} sx={{ height: '100%' }} >
         {
            loading ?
               <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
               :
               <>
                  <Typography variant="h6" sx={{}}>
                     List Albums
                  </Typography>
                  <Link to='/albums/add'>
                     <Button variant="contained" size="small" sx={{ mt: 0.5, mb: 1.5 }}>
                        Create new
                        <AddIcon />
                     </Button>
                  </Link>
                  <Grid container spacing={2}>
                     {albums && albums.map((album) => {
                        return (
                           <Grid item lg={2} md={3} xs={6} key={album._id}>
                              <CardAlbum album={album} />
                           </Grid>
                        )
                     })}

                  </Grid>
               </>
         }

      </Container>
   );
}
