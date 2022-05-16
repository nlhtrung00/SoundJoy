import { Avatar, Container, Box, Typography, IconButton, CircularProgress } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { getUser } from "../../Redux/Slices/UserSlice";
import { fetchAsyncLikeListById, getLikelist } from "../../Redux/Slices/LikelistSlice";
import moment from 'moment';
import { fetchAsyncSongs, getListSongs, setPlaylist } from "../../Redux/Slices/SongSlice";
import { fetchAsyncSingers, getSingers } from "../../Redux/Slices/SingerSlice";
import { fetchAsyncAlbums, getListAlbums } from "../../Redux/Slices/AlbumSlice";
import { fetchAsyncMusicians, getMusicians } from "../../Redux/Slices/MusicianSlice";
import { CloseBar, getOpenBar, OpenBar } from "../../Redux/Slices/SongBarSlice";


const useStyle = makeStyles({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
    },
    activeRow: {
        backgroundColor: '#5341A9',
        transition: 'ease-in-out',
        transitionDuration: '0.2s'
    },
    activeCell: {
        color: 'white'
    }
})

const columns = [
    { id: 'index', label: '#', minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 160 },
    {
        id: 'singer',
        label: 'Singer',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'musician',
        label: 'Musician',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'album',
        label: 'Album',
        minWidth: 130,
        align: 'left',
    },
];

const DetailList = () => {
    const classes = useStyle();
    const { likelistId } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();
    const likelist = useSelector(getLikelist);
    const songs = useSelector(getListSongs);
    const singers = useSelector(getSingers);
    const musicians = useSelector(getMusicians);
    const albums = useSelector(getListAlbums);
    const openBarSong = useSelector(getOpenBar);
    const [time, setTime] = useState([])
    
    const [selectedSong, setSelectedSong] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            await dispatch(fetchAsyncLikeListById(likelistId));
            await dispatch(fetchAsyncSongs());
            await dispatch(fetchAsyncSingers());
            await dispatch(fetchAsyncMusicians());
            await dispatch(fetchAsyncAlbums());
            
        }
        action();
        setLoading(false)
    }, [dispatch, likelistId])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleLoadMetadata = (meta, songId) => {
        const { duration } = meta.target;
        const timee = moment.duration(duration, "seconds");
        let song = `${songId}`;
        let minutes = `${timee.minutes() + " min " + (timee.seconds() < 10 ? '0' + timee.seconds() : timee.seconds()) + " sec"}`
        console.log(song)
        setTime((prev) => (
            {
                ...prev,
                [song]: minutes
            }
        ))

    }
    const PlaySongInList = async (songId, index) => {
        setSelectedSong(index);
        const song = songs.find(item => item._id === songId)
        let playlist = [song]
        await dispatch(setPlaylist(playlist));
        await dispatch(OpenBar())
    }
    const PlayListSong = async () => {
        let playlist = [];
        setSelectedSong();
        likelist.songs.map((item) => {
            playlist = [...playlist, songs.find(song => song._id === item)]
        })
        await dispatch(setPlaylist(playlist));
        await dispatch(CloseBar())
        await dispatch(OpenBar())
    }





    return (
        <Container disableGutters className={classes.home_container}>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> :
                    <>
                        {
                            likelist !== undefined ?
                                <React.Fragment>
                                    <Box className={classes.info}>
                                        <Box sx={{
                                            background: 'linear-gradient(196deg, rgba(195,34,175,1) 0%, rgba(253,117,45,1) 100%)',
                                            p: 1,
                                            borderRadius: '20px',
                                        }}>
                                            <Box className={classes.avatar} sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                                <Avatar alt="avatar singer" src={likelist.image} sx={{
                                                    width: '200px',
                                                    height: '200px'
                                                }} />

                                                <Box sx={{ ml: 2, }}>
                                                    <Typography sx={{ fontWeight: 500, fontSize: 25, color: 'white' }}>
                                                        Your Likelist
                                                    </Typography>
                                                    <Typography variant='body2' sx={{
                                                        fontWeight: 700,
                                                        fontSize: '70px',
                                                        lineHeight: 1,
                                                        mb: 0,
                                                        my: 0,
                                                        color: 'white'
                                                    }}>
                                                        {likelist.name}
                                                    </Typography>

                                                    <IconButton
                                                        onClick={() => PlayListSong()}
                                                        sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <PlayCircleOutlineIcon
                                                            sx={{
                                                                mx: 1, fontSize: 30, color: 'white', '&:hover': {
                                                                    transform: 'scale(1.05)',
                                                                    transition: 'ease-in-out',
                                                                    transitionDuration: '0.4s'
                                                                }
                                                                , transitionDuration: '0.8s'
                                                            }} />
                                                        <Typography sx={{ color: 'white', fontWeight: 500, fontSize: 18 }}>Play</Typography>
                                                    </IconButton>
                                                </Box>

                                            </Box>

                                        </Box>

                                    </Box>

                                    <Box className='content'>
                                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                            <TableContainer sx={{ height: 440 }}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            {columns.map(column => {
                                                                return (
                                                                    <TableCell
                                                                        key={column.id}
                                                                        align={column.align}
                                                                        style={{ minWidth: column.minWidth }}
                                                                    >
                                                                        {column.label}

                                                                    </TableCell>
                                                                )
                                                            })}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            likelist.songs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((row, index) => {
                                                                    return (
                                                                        <TableRow
                                                                            className={selectedSong === index ? classes.activeRow : ""}
                                                                            key={row}
                                                                            onClick={() => PlaySongInList(row, index)}
                                                                            sx={{ cursor: 'pointer' }}>

                                                                            <TableCell className={selectedSong === index ? classes.activeCell : ""}>{index + 1}</TableCell>
                                                                            <TableCell sx={{ fontWeight: 500, fontSize: 15 }} className={selectedSong === index ? classes.activeCell : ""}>

                                                                                {songs.find(song => song._id === row).name}
                                                                            </TableCell>
                                                                            <TableCell sx={{ fontWeight: 500, fontSize: 15 }} className={selectedSong === index ? classes.activeCell : ""}>
                                                                                {
                                                                                    singers.find(singer => singer._id === songs.find(song => song._id === row).singer[0]) ?
                                                                                        singers.find(singer => singer._id === songs.find(song => song._id === row).singer[0]).name : "noname"
                                                                                }


                                                                            </TableCell>
                                                                            <TableCell sx={{ fontWeight: 500, fontSize: 15 }} className={selectedSong === index ? classes.activeCell : ""}>
                                                                                {
                                                                                    musicians.find(musician => musician._id === songs.find(song => song._id === row).musician[0]) ?
                                                                                        musicians.find(musician => musician._id === songs.find(song => song._id === row).musician[0]).name
                                                                                        : "noname"
                                                                                }
                                                                            </TableCell>
                                                                            <TableCell sx={{ fontWeight: 500, fontSize: 15 }} className={selectedSong === index ? classes.activeCell : ""}>

                                                                                <audio
                                                                                    controls
                                                                                    onLoadedMetadata={(e) => handleLoadMetadata(e, row)}
                                                                                    style={{ display: 'none' }}>
                                                                                    <source src={songs.find(song => song._id === row).link_mp3} type="audio/mpeg" />
                                                                                </audio>
                                                                                {time[row]}


                                                                            </TableCell>
                                                                            <TableCell sx={{ fontWeight: 500, fontSize: 15 }} className={selectedSong === index ? classes.activeCell : ""}>
                                                                                {
                                                                                    albums.find(album => album._id === songs.find(song => song._id === row).album) ?
                                                                                        albums.find(album => album._id === songs.find(song => song._id === row).album).name
                                                                                        : "no album"
                                                                                }
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={likelist.songs.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </Paper>
                                    </Box>


                                </React.Fragment>
                                :
                                <React.Fragment>

                                </React.Fragment>
                        }
                    </>

            }
        </Container>
    );
};

export default DetailList;