import { Grid } from '@mui/material';
import React from 'react';
import LeftBar from './Components/LeftBar/LeftBar';
import PlaysongBar from './Components/PlaysongBar/PlaysongBar';
const Layout = (props) => {
    return (
        <>
        <Grid container sx={{
            bgcolor:'#171334',
            
        }}>
               <Grid item lg={2.5}>
                  <LeftBar />
               </Grid>
               <Grid item lg={9.5} sx={{p:1}}>
                    {<props.page />}
               </Grid>
        </Grid>
        
        </>
    );
};

export default Layout;