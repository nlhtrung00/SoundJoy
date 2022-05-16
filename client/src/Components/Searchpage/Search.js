import { Container, Grid, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import searchImg from '../../Images/search.png';
import searchNoFound from '../../Images/searchnot.JPG'
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar/LeftBar';
import Recent from './Recent';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import { asyncSeachingMusicians, getSearchingMusicians, refreshSearchMusician } from '../../Redux/Slices/MusicianSlice';
import { asyncSeachingSingers, getSearchingSingers, refreshSearchSinger } from '../../Redux/Slices/SingerSlice';
import { asyncSeachingSongs, getSearchingSongs, refreshSearchSong } from '../../Redux/Slices/SongSlice';
import SongResult from './SongResults';
import SingerResult from './SingerResults';
import MusicianResult from './MusicianResults';
const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100vh',
        borderRadius: '20px',
        padding: '15px 20px',
    },
    searchbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchinput: {
        display: 'flex',
        alignItems: 'center',
        boder: '1px solid black',
        backgroundColor: 'black',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '20px',
        width: '80%',

    }
}));
const Search = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [searching, setSearching] = useState(false);
    const searchMusicians = useSelector(getSearchingMusicians);
    const searchSingers = useSelector(getSearchingSingers);
    const searchSongs = useSelector(getSearchingSongs);
    console.log(searchMusicians)
    console.log(searchSingers)
    console.log(searchSongs)
    useEffect(() => {
        dispatch(refreshSearchMusician());
        dispatch(refreshSearchSinger());
        dispatch(refreshSearchSong());

    }, [])
    const handleSearchingResult = (searchTerm) => {
        if (searchTerm.length > 0) {
            console.log(searchTerm)
            setSearching(true);
            const startSearching = async () => {
                dispatch(asyncSeachingMusicians(searchTerm));
                dispatch(asyncSeachingSingers(searchTerm));
                dispatch(asyncSeachingSongs(searchTerm))
            }
            startSearching();
        }
        else {
            setSearching(false)
            dispatch(refreshSearchMusician());
            dispatch(refreshSearchSinger());
            dispatch(refreshSearchSong());
        }
    }
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <SearchInput onSubmit={handleSearchingResult} />
            {
                searching ?
                    <>
                        <div className={classes.listresults}>

                            {
                                searchSongs && searchSongs.length > 0 &&
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Songs searching result
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {
                                            searchSongs.length > 0 && searchSongs.map(song => (
                                                <Grid item xl={2} md={3} xs={12} key={song._id}>
                                                    <SongResult song={song} />
                                                </Grid>
                                            ))
                                        }

                                    </Grid>

                                </Box>
                            }

                            {
                                searchSingers && searchSingers.length > 0 &&
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Singers searching result
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {
                                            searchSingers.length > 0 && searchSingers.map(singer => (
                                                <Grid item xl={2} md={3} xs={12} key={singer._id}>
                                                    <SingerResult singer={singer} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>

                                </Box>
                            }
                            {
                                searchMusicians && searchMusicians.length > 0 &&
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Musicians searching result
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {
                                            searchMusicians.length > 0 && searchMusicians.map(musician => (
                                                <Grid item xl={2} md={3} xs={12} key={musician._id}>
                                                    <MusicianResult musician={musician} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>

                                </Box>
                            }
                            {
                                searchSongs.length === 0 && searchMusicians.length === 0 && searchSingers.length === 0 &&
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: 25, color: '#5f5f5f' }}>
                                            No Results Found
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                        <Box sx={{ width: '50%' }}>
                                            <img src={searchNoFound} style={{ width: '100%', objectFit: 'contain' }} />
                                        </Box>
                                    </Box>
                                </Box>




                            }

                        </div>
                    </>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Box sx={{ width: '60%' }}>
                            <img src={searchImg} style={{ width: '100%', objectFit: 'contain' }} />
                        </Box>
                    </Box>

            }

        </Container >
    );
};

export default Search;