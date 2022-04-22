import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardMusician from './CardMusician';
import { getMusicians } from '../../Redux/Slices/MusicianSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}));

const Musicians = () => {
    const classes = useStyle();
    const musicians = useSelector(getMusicians);
    console.log(musicians)
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <Typography variant="h6" sx={{
                mb: 1
            }}>
                All Musicians
            </Typography>
            <Grid container spacing={2}>
                {musicians && musicians.map((musician) => {
                    return (
                        <Grid item lg={2} md={3} xs={6} key={musician._id}>
                            <Link to={`/musician/${musician._id}`}>
                                <CardMusician musician={musician}/>
                            </Link>
                        </Grid>
                    )
                })}


            </Grid>
        </Container>
    );
};

export default Musicians;