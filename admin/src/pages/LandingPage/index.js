import React, { useState } from 'react';
import Header from './Header'
import Login from './Login';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const theme = createTheme();
const useStyles = makeStyles((theme) => ({
    relative: {
        position: 'relative'
    },
    container: {
        backgroundImage: `url(${'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        alignItems: 'center',


    },
    paper: {    
        minHeight: '78%',

    }


}))
const LandingPage = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const classes = useStyles(theme);
    return (
        <div className={classes.relative}>
            <Header />
            <Grid className={classes.container}>
                <Container component={Paper} maxWidth='xs' className={classes.paper} sx={{
                    // marginTop: theme.spacing(2),
                    [theme.breakpoints.down(400)]: {
                        width: '100%',
                        height: '100%',

                    },
                    [theme.breakpoints.up('md')]: {
                        position: 'absolute',
                        right: '60px',
                        top: '90px',
                        py:2
                    }
                }}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="tab for login signup">
                                    <Tab label="login" value="1" />
                                    {/* <Tab label="signup" value="2" /> */}
                                </TabList>
                            </Box>
                            <TabPanel value="1" sx={{
                                p: 0,
                            }}>
                                <Login />
                            </TabPanel>
                            {/* <TabPanel value="2" sx={{
                                p: 0,
                            }}>
                                <Signup />
                            </TabPanel> */}
                        </TabContext>
                    </Box>
                </Container>
            </Grid>



        </div>
    )
}
export default LandingPage;