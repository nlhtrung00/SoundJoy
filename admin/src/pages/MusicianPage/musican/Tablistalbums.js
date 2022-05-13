import React, { useEffect, useState } from 'react';
import { Table, Box, Avatar, TableBody, ButtonGroup, Typography, Button, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import * as moment from "moment"

import { Link, useHistory } from 'react-router-dom';
import { fetchAsyncSingers, getListSingers } from '../../../Redux/Slice/SingerSlice';
import { fetchAsyncGenres, getListGenres } from '../../../Redux/Slice/GenreSlice';
import { fetchAsyncMusicians, getListMusicians } from '../../../Redux/Slice/MusicianSlice';


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
const Tablistalbum = ({ listAlbums }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const singers = useSelector(getListSingers);
    const genres = useSelector(getListGenres);
    const musicians = useSelector(getListMusicians);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const action = async () => {
            setLoading(true)
            await dispatch(fetchAsyncMusicians());
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncGenres());
        }
        action()
        setLoading(false);
    }, [])
    console.log(listAlbums)
    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        {listAlbums.length > 0 ?
                            <TableContainer component={Paper}>
                                <Table sx={{}} aria-label="table list albums">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>#</StyledTableCell>
                                            <StyledTableCell>NAME</StyledTableCell>
                                            <StyledTableCell>SINGER</StyledTableCell>
                                            <StyledTableCell>MUSICIAN</StyledTableCell>
                                            <StyledTableCell>GENRES</StyledTableCell>
                                            <StyledTableCell>RATING</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listAlbums.map((album, index) => {
                                            return (

                                                <TableRow key={album._id} onClick={() => history.push(`/albums/${album._id}`)} sx={{ cursor: 'pointer' }}>

                                                    <StyledTableCell>
                                                        {index + 1}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src={album.image} />
                                                            <Box sx={{ ml: 1 }}>
                                                                <Typography sx={{
                                                                    fontWeight: 500, width: '120px', display: 'box',
                                                                    lineClamp: 1,
                                                                    boxOrient: 'vertical',
                                                                    overflow: 'hidden',
                                                                }}>
                                                                    {album.name}
                                                                </Typography>
                                                            </Box>


                                                        </Box>

                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{ width: '200px' }}>
                                                        {
                                                            album.singer ?
                                                                <>
                                                                    {album.singer.map((item, index) => {
                                                                        if (index < 1)
                                                                            return (
                                                                                <Typography key={item}>
                                                                                    {singers.find(singer => singer._id === item) ? singers.find(singer => singer._id === item).name : "none"}
                                                                                </Typography>

                                                                            )

                                                                    }
                                                                    )}
                                                                    {album.singer.length > 1 && <span style={{ fontSize: 14, fontWeight: 600 }}>And more...</span>}
                                                                </>
                                                                : "none"
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{ width: '200px' }}>
                                                        {
                                                            album.musician.length > 0 ?
                                                                <>
                                                                    <Typography>
                                                                        {
                                                                        album.musician.map((item,index) => {
                                                                            if(index===0)
                                                                            return musicians.find(musician => musician._id === item) ? musicians.find(musician => musician._id === item).name :"none"
                                                                        })


                                                                        }
                                                                        {album.musician.length > 1 && <span style={{ fontSize: 14, fontWeight: 600 }}>And more...</span>}
                                                                    </Typography>
                                                                </>
                                                                : "none"
                                                        }
                                                    </StyledTableCell>
                                                    {/* <StyledTableCell>
                                                        {song.listens}
                                                    </StyledTableCell> */}
                                                    <StyledTableCell sx={{ width: '200px' }}>
                                                        {
                                                            album.genre.map((item, index) => (
                                                                genres.find(genre => genre._id === item) ?
                                                                    (
                                                                        (index < album.genre.length - 1) ?
                                                                            genres.find(genre => genre._id === item).name + ", " : genres.find(genre => genre._id === item).name
                                                                    )
                                                                    : "none"

                                                            ))
                                                        }
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {album.rating >= 0 ? album.rating + "/5" : "0/5"}
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

export default Tablistalbum;