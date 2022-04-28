import React, { useEffect } from 'react';
import { Table,Box,Avatar, TableBody, ButtonGroup, Typography, Button, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncSingers, getListSingers } from '../../../Redux/Slice/SingerSlice';
import { fetchAsyncGenres, getListGenres } from '../../../Redux/Slice/GenreSlice';
import * as moment from "moment"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }))
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const Tablistsong = ({ listSongs }) => {
    const dispatch = useDispatch();
    const singers = useSelector(getListSingers);
    const genres = useSelector(getListGenres);
    useEffect(()=>{
        dispatch(fetchAsyncSingers());
        dispatch(fetchAsyncGenres());
    },[])
    return (
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="table list user">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Song</StyledTableCell>
                        <StyledTableCell>Singer</StyledTableCell>
                        <StyledTableCell>Listens</StyledTableCell>
                        <StyledTableCell>Genres</StyledTableCell>
                        <StyledTableCell>Rating</StyledTableCell>
                        <StyledTableCell>Debuted date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listSongs && listSongs.map((song,index) => {
                        return (
                            <StyledTableRow key={song._id}>
                                <StyledTableCell>
                                    {index+1}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={song.image} />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography sx={{
                                                fontWeight: 500, width: '120px', display: 'box',
                                                lineClamp: 1,
                                                boxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}>
                                                {song.name}
                                            </Typography>
                                        </Box>


                                    </Box>

                                </StyledTableCell>
                                <StyledTableCell sx={{width:'250px'}}>
                                    {
                                    song.singer.map(item => (
                                        singers.find(singer => singer._id === item).name + ", "
                                    ))
                                    }
                                </StyledTableCell>
                                <StyledTableCell>
                                    {song.listens}
                                </StyledTableCell>
                                <StyledTableCell sx={{width:'200px'}}>
                                    {
                                    song.genre.map(item => (
                                        genres.find(genre => genre._id === item).name + ", "
                                    ))
                                    }
                                </StyledTableCell>
                                <StyledTableCell>
                                    6.7/10
                                </StyledTableCell>
                                <StyledTableCell>
                                    {moment(song.debuted_date).format("DD/MM/YYYY")}
                                </StyledTableCell>
                                
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Tablistsong;