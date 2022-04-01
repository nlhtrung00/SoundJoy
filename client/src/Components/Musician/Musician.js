import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardMusician from './CardMusician';


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
    return (
        <Container disableGutters maxWidth="xl" className={classes.home_container}>
            <Typography variant="h6" sx={{
                mb:1
            }}>
                All Musicians
            </Typography>
            <Grid container spacing={2}>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                <Grid item lg={2} md={3}>
                    <CardMusician />
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default Musicians;