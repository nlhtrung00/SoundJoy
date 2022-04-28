import { Container, Grid } from '@mui/material';
import React from 'react';
import Leftbar from './components/Leftbar.js/Leftbar';
import Topbar from './components/Topbar.js/Topbar';
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
    fixed:{
        position:'fixed',
        top:0
    },
    stickybar:{
        position:'sticky',
        top:0,
    },
    scrolloverflow:{
        overflow:'auto',
    },
})
const Layout = (props) => {
    const classes = useStyle();
    return (
        <Container disableGutters maxWidth="xl" >
            <Grid container spacing={0}>
                <Grid item  md={2.5} className={classes.stickybar}>
                    <Leftbar/>
                </Grid>
                <Grid item md={9.5} sx={{maxHeight:'100vh',overflow:'auto'}}>
                    {<props.page />}
                </Grid>
            </Grid>
        </Container>

    );
};

export default Layout;