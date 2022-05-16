import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncSongByGenre, fetchAsyncSongBySinger } from '../../Redux/Slices/SongSlice';

const Relevants = ({ song }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = async () => {
            setLoading(true);
            song.genre.length > 0 && await dispatch(fetchAsyncSongByGenre(song.genre[0]))
            song.singer.length > 0 && await dispatch(fetchAsyncSongBySinger(song.singer[0]))
        }
        action();
        setLoading(false)
    },[song])
    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Box>

                    </Box>
            }
        </>

    );
};

export default Relevants;