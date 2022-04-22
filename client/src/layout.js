import { Grid } from '@mui/material';
import React from 'react';
import LeftBar from './Components/LeftBar/LeftBar';
const Layout = (props) => {
    return (
        <>
        <Grid container>
               <Grid item lg={2.5}>
                  <LeftBar />
               </Grid>
               <Grid item lg={9.5}>
                    {<props.page />}
               </Grid>
        </Grid>
        </>
    );
};

export default Layout;