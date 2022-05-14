import React, { useEffect, useState } from 'react';
import { Table, Box, Avatar, TableBody, ButtonGroup, Typography, Button, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import * as moment from "moment"
import { fetchAsyncSingers, getSingers } from '../../Redux/Slices/SingerSlice';
import { fetchAsyncGenres, getGenres } from '../../Redux/Slices/GenreSlice';
import { fetchAsyncMusicians, getMusicians } from '../../Redux/Slices/MusicianSlice';
import { Link, useNavigate } from 'react-router-dom';


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
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const singers = useSelector(getSingers);
    const genres = useSelector(getGenres);
    const musicians = useSelector(getMusicians)
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncGenres());
            await dispatch(fetchAsyncMusicians())
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
                                            <StyledTableCell>SONG</StyledTableCell>
                                            <StyledTableCell>SINGER</StyledTableCell>
                                            <StyledTableCell>MUSICIAN</StyledTableCell>
                                            <StyledTableCell>LISTENS</StyledTableCell>
                                            <StyledTableCell>GENRES</StyledTableCell>
                                            <StyledTableCell>RATING</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listSongs.map((song, index) => {
                                            return (

                                                <TableRow key={song._id} onClick={() => navigate(`/song/${song._id}`)} sx={{ cursor: 'pointer' }}>

                                                    <StyledTableCell>
                                                        {index + 1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src={song.image} />
                                                            <Box sx={{ ml: 1 }}>
                                                                <Typography sx={{
                                                                    fontWeight: 500, width: '180px', display: 'box',
                                                                    lineClamp: 1,
                                                                    height:'auto',
                                                                    boxOrient: 'vertical',
                                                                    overflow: 'hidden',
                                                                }}>
                                                                    {song.name}
                                                                </Typography>
                                                            </Box>


                                                        </Box>

                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{ width: '200px' }}>
                                                        {
                                                            song.singer.length ?
                                                                <>
                                                                    {song.singer.map((item, index) => {
                                                                        if (index < 1)
                                                                            return (
                                                                                <Typography key={item}>
                                                                                    {singers.find(singer => singer._id === item) ? singers.find(singer => singer._id === item).name : "none"}
                                                                                </Typography>

                                                                            )

                                                                    }
                                                                    )}
                                                                    {song.singer.length > 1 && <span style={{ fontSize: 14, fontWeight: 600 }}>And more...</span>}
                                                                </>
                                                                : "none"
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{ width: '200px' }}>
                                                        {
                                                            song.musician.length > 0 ?
                                                                <>
                                                                    {song.musician.map((item, index) => {
                                                                        if (index < 1)
                                                                            return (
                                                                                <Typography key={item}>
                                                                                    {musicians.find(musician => musician._id === item).name}
                                                                                </Typography>

                                                                            )

                                                                    }
                                                                    )}
                                                                    {song.musician.length > 1 && <span style={{ fontSize: 14, fontWeight: 600 }}>And more...</span>}
                                                                </>
                                                                : "none"
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {song.listens}
                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{ width: '200px' }}>

                                                        {
                                                            (genres.length > 0 && song.genre.length > 0) ? song.genre.map((item, index) => (

                                                                (index < song.genre.length - 1) ?
                                                                    genres.find(genre => genre._id === item).name + ", " : genres.find(genre => genre._id === item).name

                                                            )) : "none"
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {song.rating >= 0 ? song.rating + "/5" : "0/5"}
                                                    </StyledTableCell>


                                                </TableRow>

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