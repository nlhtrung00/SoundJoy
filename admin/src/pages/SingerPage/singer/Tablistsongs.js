import React, { useEffect, useState } from 'react';
import { Table, Box, Avatar, TableBody,  Typography, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncSingers, getListSingers } from '../../../Redux/Slice/SingerSlice';
import { fetchAsyncGenres, getListGenres } from '../../../Redux/Slice/GenreSlice';
import * as moment from "moment"
import { Link,useNavigate } from 'react-router-dom'


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
    const navigate = useNavigate()
    const singers = useSelector(getListSingers);
    const genres = useSelector(getListGenres);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncGenres());
        }
        action();
        setLoading(false)

    }, [])
    
    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        {listSongs.length > 0 ?
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
                                        {listSongs.map((song, index) => {
                                            return (
                                                <StyledTableRow key={song._id} onClick={() => navigate(`/songs/${song._id}`)}>
                                                    <StyledTableCell>
                                                        {index + 1}
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
                                                    <StyledTableCell sx={{ width: '250px' }}>
                                                        {
                                                            (singers && singers.length> 0) ? song.singer.map((item,index) => (
                                                                singers.find(singer => singer._id === item) ? 
                                                                ((index < song.singer.length - 1) ?
                                                                singers.find(singer => singer._id === item).name +", " : singers.find(singer => singer._id === item).name )
                                                                
                                                                : "none"
                                                            )) : "none"
                                                            // console.log(singers)
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {song.listens}
                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{ width: '200px' }}>
                                                        {
                                                            song.genre.map(item => (
                                                                genres.find(genre => genre._id === item).name + ", "
                                                            ))
                                                            // console.log(genres)
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {song.rating >= 0 ? song.rating + "/5" : "0/5"}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {moment(song.debuted_date).format("DD/MM/YYYY")}
                                                    </StyledTableCell>

                                                </StyledTableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                                <Typography sx={{ fontWeight: 500, fontSize: 20, color: '#5f5f5f' }}>
                                    No Results Found
                                </Typography>
                            </Box>

                        }
                    </>
            }

        </>

    );
};

export default Tablistsong;