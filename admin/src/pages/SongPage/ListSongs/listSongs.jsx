import {
   Container, Avatar, Box, Table, TableBody, ButtonGroup, Typography, Button,
   TableContainer, TableHead, TableRow, Paper,CircularProgress
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAsyncSongs, getListSongs } from "../../../Redux/Slice/SongSlice";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { getListAlbums } from "../../../Redux/Slice/AlbumSlice";
import { getListGenres } from "../../../Redux/Slice/GenreSlice"
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

const useStyle = makeStyles({
   break_line: {
      display: 'box',
      lineClamp: 2,
      boxOrient: 'vertical',
      overflow: 'hidden',
   },
})
export default function ListSong() {
   const dispatch = useDispatch();
   const data = useSelector(getListSongs);
   const genres = useSelector(getListGenres);
   const albums = useSelector(getListAlbums);
   const singers = useSelector(getListSingers);
   const classes = useStyle();
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
      const action = async () => {
         setLoading(true)
         await dispatch(fetchAsyncSongs());
      }
      action();
      setLoading(false)
   }, [])
   
   return (
      <Container maxWidth='xl' component={Paper} sx={{ height: '100%' }}>
         {
            loading ?
               <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
               </Box>
               :
               <>
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
                              <StyledTableCell>ACTION</StyledTableCell>
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
                                    <StyledTableCell sx={{ p: 1.5 }}>
                                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Avatar src={song.image} sx={{ height: 50, width: 50 }} />
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
                                    <StyledTableCell >
                                       {
                                          singers.map(data => {
                                             if (data._id === song.singer[0]) {
                                                return (
                                                   <Typography key={data._id}>
                                                      {data.name}
                                                   </Typography>
                                                )
                                             }
                                          })
                                       }
                                       {
                                          song.singer.length > 1
                                          &&
                                          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                                             And more...
                                          </Typography>
                                       }

                                    </StyledTableCell>
                                    <StyledTableCell>
                                       <Typography>
                                          {
                                             genres.map((item) => {

                                                if (item._id === song.genre[0]) {
                                                   return item.name
                                                }
                                             })

                                          }
                                       </Typography>
                                       {
                                          song.genre.length > 1
                                          &&
                                          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                                             And more...
                                          </Typography>
                                       }

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
                                         
                                       </ButtonGroup>
                                    </StyledTableCell>
                                 </StyledTableRow>
                              )
                           })}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  
               </>
         }

      </Container>
   );
}
