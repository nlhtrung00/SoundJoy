import {
   Container, Avatar, Box, Table, TableBody, ButtonGroup, Typography, Button,
   TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getListSongs } from "../../../Redux/Slice/SongSlice";
import { useSelector, useDispatch } from "react-redux";
import * as moment from 'moment';
import { fetchAsyncAlbumById, fetchAsyncAlbums, getAlbum, getListAlbums } from "../../../Redux/Slice/AlbumSlice";
import { fetchAsyncGenreById, fetchAsyncGenres, getGenre, getListGenres } from "../../../Redux/Slice/GenreSlice"
import { getListSingers } from "../../../Redux/Slice/SingerSlice";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
   },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:hover': {
      backgroundColor: theme.palette.action.hover,
   },

}));
export default function ListSong() {
   const dispatch = useDispatch();
   const data = useSelector(getListSongs);
   const genres = useSelector(getListGenres);
   const albums = useSelector(getListAlbums);
   const singers = useSelector(getListSingers);
   console.log(singers);
   const filterSinger = (singerid) => {
      singers.map(item => {
         if (item._id === singerid) {
            return item.name
         }
      })

   }

   return (
      <Container maxWidth='lg' component={Paper}>
         <Typography variant="h6" sx={{}}>
            List Songs
         </Typography>
         <Link to='/songs/add'>
            <Button variant="contained" size="small" sx={{ mt: 0.5, mb: 1.5 }}>
               Create new
               <AddIcon />
            </Button>
         </Link>
         <TableContainer component={Paper} elevation={0}>
            <Table sx={{}} aria-label="table list musician">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#</StyledTableCell>
                     <StyledTableCell>SONG</StyledTableCell>
                     <StyledTableCell>LISTENS</StyledTableCell>
                     <StyledTableCell>SINGER</StyledTableCell>
                     <StyledTableCell>GENRE</StyledTableCell>
                     <StyledTableCell>ALBUM</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data && data.map((song, index) => {
                     return (
                        <StyledTableRow key={song._id}>
                           <StyledTableCell>
                              <Typography>
                                 {index + 1}
                              </Typography>
                           </StyledTableCell>
                           <StyledTableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                 <Avatar src={song.image} />
                                 <Box sx={{ ml: 1 }}>
                                    <Typography sx={{
                                       fontWeight: 500, width: '150px', display: 'box',
                                       lineClamp: 2,
                                       boxOrient: 'vertical',
                                       overflow: 'hidden',
                                    }}>
                                       {song.name}
                                    </Typography>
                                 </Box>


                              </Box>

                           </StyledTableCell>
                           <StyledTableCell>
                              <Typography>
                                 {song.listens}
                              </Typography>
                           </StyledTableCell>
                           <StyledTableCell>
                              {
                                 song.singer.map(item => (
                                    <Typography key={item}>
                                      {
                                         singers.map(data => {
                                          if (data._id === item) {
                                             return data.name
                                          }
                                       })
                                      }
                                      
                                    </Typography>

                                 ))
                              }


                           </StyledTableCell>
                           <StyledTableCell>

                              {genres.map((genre) => {
                                 if (genre._id === song.genre) {
                                    return (
                                       <Typography key={genre._id}>
                                          {genre.name}
                                       </Typography>

                                    )
                                 }
                              })}

                           </StyledTableCell>
                           <StyledTableCell>
                              {albums.map((album) => {
                                 if (album._id === song.album) {
                                    return (
                                       <Typography key={album._id}>
                                          {album.name}
                                       </Typography>

                                    )
                                 }
                              })}
                           </StyledTableCell>
                           <StyledTableCell>
                              <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                 <Link to={`songs/${song._id}`}>
                                    <Button variant='text' size='small' title='View detail' sx={{ borderRadius: 0 }}>
                                       View
                                    </Button>
                                 </Link>
                                 <Button variant='text' size='small' title="Delete Song" >
                                    Delete
                                 </Button>
                              </ButtonGroup>
                           </StyledTableCell>
                        </StyledTableRow>
                     )
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </Container>
   );
}
