import { Typography, TextField, FormControl, Button, Paper, Grid, Avatar, Box, FormControlLabel, Checkbox, Link } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { createTheme, spacing } from '@mui/system';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import LockIcon from '@mui/icons-material/Lock';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncAccount, getIsLogedin } from "../../../Redux/Slices/AccountSlice";
import React from "react";
const theme = createTheme({
    spacing: [0, 4, 8, 10, 12, 16, 32],
});
const useStyles = makeStyles({
    input: {
        marginTop: '15px'
    },
    errormsg: {
        color: 'red',
        fontSize: '13px'
    }

})
const initialState = {
    username: '',
    password: '',
    remember: false,
}
const Login = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
        // confirm_password: Yup.string()
        // .oneOf([Yup.ref("password")], "Password's not match")
        // .required("Required!")

    })
    const onSubmit = (value, props) => {
        // setTimeout(() => {
        //     props.resetForm();
        //     props.setSubmitting(true);
        // }, 1000)
        const data={
            username:value.username,
            password:value.password
        }
        dispatch(fetchAsyncAccount(data));
            

    }
    return (
        <Grid>
            <Paper elevation={0} sx={{
                marginTop: '20px'
            }}>
                <Grid align="center">
                    <Avatar sx={{ backgroundColor: '#4545ce' }}>
                        <GraphicEqIcon sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        SoundJoy
                    </Typography>
                </Grid>
                <Formik initialValues={initialState} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {

                        (props) => (

                            <Form>
                                {/* {console.log(props)} */}
                                <Field as={TextField} label="Username" name="username" placeholder="Enter username" fullWidth required className={classes.input} sx={{
                                    marginTop: 2
                                }} />
                                {props.errors.username && props.touched.username && (
                                    <p className={classes.errormsg}>{props.errors.username}</p>
                                )}
                                <Field as={TextField} label="Password" name="password" placeholder="Enter password" type="password" fullWidth required className={classes.input} sx={{
                                    marginTop: 2
                                }} />
                                {props.errors.password && props.touched.password && (
                                    <p className={classes.errormsg}>{props.errors.password}</p>
                                )}
                                <Field as={FormControlLabel}
                                    name='remember'
                                    control={
                                        <Checkbox color="primary" />
                                    }
                                    label="Remember me"
                                />
                                <Button variant="contained" type="submit" color='primary' fullWidth sx={{
                                    marginTop: 1
                                }}>
                                    Login
                                </Button>
                            </Form>
                        )
                    }

                </Formik>

                <Typography sx={{ marginTop: 1 }}>
                    <Link href="">
                        Forgot password ?
                    </Link>
                </Typography>

            </Paper>
        </Grid>

    )
}
export default Login;