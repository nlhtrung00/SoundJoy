import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardSinger from './CardSinger';
import { useSelector } from 'react-redux';
import { getSingers } from '../../Redux/Slices/SingerSlice';
const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100%',
        borderRadius: '20px',
        padding: '15px 20px',
    },
}));

const Singer = () => {
    const classes = useStyle();
    const singers = useSelector(getSingers);
    console.log(singers);
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <Typography variant="h6" sx={{
                mb: 1
            }}>
                All Singers
            </Typography>
            <Grid container spacing={2}>
                {singers && singers.map((singer) => {
                    return (
                        <Grid item lg={2} md={3} xs={6}>
                            <CardSinger singer={singer} />
                        </Grid>
                    )
                })}

            </Grid>
        </Container>
    );
};

export default Singer;