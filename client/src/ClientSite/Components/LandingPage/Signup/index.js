import {Typography, TextField, FormControl, Button, Grid, Paper, Avatar,Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { createTheme, spacing } from '@mui/system';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import LockIcon from '@mui/icons-material/Lock';
import React from "react";
const theme = createTheme({
    spacing: [0, 4, 8, 10, 12, 16, 32],
});
const useStyles = makeStyles({
    box: {
        margin: '0 auto'
    },
    textField: {
        width: '100%'
    },
    formcontrol: {
        width: '100%'
    },
    center:{
        alignItems:'center'
    },
    popup:{
        position:'fixed',
        top:'8%',
    }

})
const Signup = () => {
    const classes = useStyles();
    return (
        <Grid container
            justifyContent="center"
            alignContent="center"
            className={classes.popup}

        >
            <Grid item
                xs={11}
                sm={11}
                md={4}
                lg={3}
                maxHeight="70vh"
                align="center"
            >


                <Paper elevation={5}
                    sx={{
                        p: 2,
                        margin: "auto",
                        maxWidth: '100%'
                    }}

                >
                    <FormControl
                        sx={{
                            bgcolor: "white",

                        }}
                        margin='dense'
                        className={classes.formcontrol}
                    >
                        <Typography
                            variant='h4'


                            fontWeight={600}
                            paddingBottom='20px'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}
                        >
                            <GraphicEqIcon
                                size='30px'
                                sx={{

                                    color: 'blue',
                                    padding: theme.spacing(2)
                                }}

                            />
                            SoundJoy
                        </Typography>
                        <Box className={classes.center}>
                            <Avatar>
                                <LockIcon />
                            </Avatar>
                        </Box>
                        
                        <Typography
                            variant='h5'
                            fontWeight='600'
                        >
                            Sign up
                        </Typography>
                        <TextField className={classes.textField} id="username" label="Username" variant="outlined" margin="dense" />
                        <TextField id="password" label="Password" variant="outlined" margin="dense" />
                        <TextField id="repassword" label="verify Password" variant="outlined" margin="dense" />
                        <TextField id="fullname" label="Your Fullname" variant="outlined" margin="dense" />
                        <TextField id="phonenumber" label="Your phonenumber" variant="outlined" margin="dense" />
                        <TextField id="address" label="Address" variant="outlined" margin="dense" />
                        <Button
                            variant="contained"
                            sx={{
                                ml: 'auto',
                                my: 1,

                            }}
                        >
                            Signup now
                        </Button>
                    </FormControl>
                </Paper>
            </Grid>
        </Grid>



    )
}
export default Signup;