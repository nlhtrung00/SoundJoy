import { Container, Grid, Typography,InputBase,Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';
import React from 'react';
import LeftBar from '../LeftBar/LeftBar';
import Recent from './Recent';
const useStyle = makeStyles((theme) => ({
    home_container: {
        backgroundColor: 'white',
        minHeight: '100vh',
        borderRadius: '20px',
        padding: '15px 20px',
    },
    searchbar:{   
        display:'flex' ,
        flexDirection:'column',
        alignItems:'center',
    },
    searchinput:{
        display:'flex',
        alignItems:'center',
        boder:'1px solid black',
        backgroundColor:'black',
        color:'white',
        padding:'2px 8px',
        borderRadius:'20px',
        width:'80%',
        
    }
}));
const Search = () => {
    const classes = useStyle();
    return (
                <Container disableGutters maxWidth="xl" className={classes.home_container}>
                    <div className={classes.searchbar}>
                        <Typography sx={{my:1}} variant="h6">
                            Search for things - Enjoy your time
                        </Typography>
                        <div className={classes.searchinput}>
                            <SearchIcon />
                            <InputBase color="white"/>
                        </div>
                    </div>
                    <div className={classes.listresults}>
                        <Box>
                            <Typography variant="h6">
                                Recent Searching
                            </Typography>
                            <Grid container>
                                <Grid item xl={2}>
                                    <Recent />
                                </Grid>
                            </Grid>
                            
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                Recent Searching
                            </Typography>
                            <Grid container>
                                <Grid item xl={2}>
                                    <Recent />
                                </Grid>
                            </Grid>
                            
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                Recent Searching
                            </Typography>
                            <Grid container>
                                <Grid item xl={2}>
                                    <Recent />
                                </Grid>
                            </Grid>
                            
                        </Box>
                    </div>
                </Container>
    );
};

export default Search;