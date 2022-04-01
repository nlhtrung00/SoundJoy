import { Typography, TextField, FormControl, Button, Paper, Grid, Avatar, Box, FormControlLabel, Checkbox, Link } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { createTheme, spacing } from '@mui/system';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DatePicker from 'react-date-picker';
import * as Yup from 'yup';
import { Formik, Form, FastField } from 'formik';
import React, { useEffect, useState } from "react";
import DatePickerr from "./DatePickerr";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { AsyncRegisterAccount, getIsSignedup, refreshSignup } from "../../../Redux/Slices/AccountSlice";
const theme = createTheme({
    spacing: [0, 4, 8, 10, 12, 16, 32],
});
const useStyles = makeStyles({
    // input: {
    //     marginTop: '15px'
    // },
    datetimepicker: {
        marginTop: '10px'
    },
    errormsg: {
        color: 'red',
        fontSize: '13px'
    }

})
const initialState = {
    username: '',
    password: '',
    verifypassword: '',
    fullname: '',
    phonenumber: '',
    address: '',
    birthday: '',
}
const Signup = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const signup = useSelector(getIsSignedup);
    // useEffect(() => {
    //     dispatch(refreshSignup());
    // }, [])
    
    const phoneregex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;
    
    const validationSchema = Yup.object().shape({

        username: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
        verifypassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password's not match")
            .required("Required!"),
        fullname: Yup.string().min(1, "Minimum 1 characters").required("Required!"),
        phonenumber: Yup.string().matches(phoneregex, 'Phone number is not valid').required("Required!"),
        address: Yup.string(),
        birthday: Yup.string().required("Required Birthday!"),

    })
    const onSubmit = (value, props) => {
        const data = {
            username: value.username,
            password: value.password,
            name: value.fullname,
            birthday: moment(value.birthday).format("MM/DD/YYYY"),
            address: value.address,
            phone_number: value.phonenumber,

        }
        dispatch(AsyncRegisterAccount(data));
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(true);
        }, 1000);
        if(signup) console.log(signup);
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
                                <FastField as={TextField} label="Username" name="username" placeholder="Enter username" fullWidth required className={classes.input} sx={{
                                    marginTop: 1
                                }} />
                                {props.errors.username && props.touched.username && (
                                    <p className={classes.errormsg}>{props.errors.username}</p>
                                )}

                                <FastField as={TextField} label="Password" name="password" placeholder="Enter password" type="password" fullWidth required className={classes.input} sx={{
                                    marginTop: 1
                                }} />
                                {props.errors.password && props.touched.password && (
                                    <p className={classes.errormsg}>{props.errors.password}</p>
                                )}

                                <FastField as={TextField} label="Verify Password" name="verifypassword" placeholder="Enter password again" type="password" fullWidth required className={classes.input} sx={{
                                    marginTop: 1
                                }} />
                                {props.errors.verifypassword && props.touched.verifypassword && (
                                    <p className={classes.errormsg}>{props.errors.verifypassword}</p>
                                )}

                                <FastField as={TextField} label="Your FullName" name="fullname" placeholder="Enter fullname" fullWidth required className={classes.input} sx={{
                                    marginTop: 1
                                }} />
                                {props.errors.fullname && props.touched.fullname && (
                                    <p className={classes.errormsg}>{props.errors.fullname}</p>
                                )}

                                <FastField as={TextField} label="Phonenumber" name="phonenumber" placeholder="Enter phonenumber" fullWidth required className={classes.input} sx={{
                                    marginTop: 1
                                }} />
                                {props.errors.phonenumber && props.touched.phonenumber && (
                                    <p className={classes.errormsg}>{props.errors.phonenumber}</p>
                                )}

                                <FastField as={TextField} label="Address" name="address" placeholder="Enter address" fullWidth required className={classes.input} sx={{
                                    marginTop: 1
                                }} />
                                {props.errors.address && props.touched.address && (
                                    <p className={classes.errormsg}>{props.errors.address}</p>
                                )}

                                <FastField component={DatePickerr} name="birthday" label="Birthday" />


                                <Button variant="contained" type="submit" color='primary' fullWidth sx={{
                                    marginTop: 1
                                }}>
                                    Signup
                                </Button>
                            </Form>
                        )
                    }
                </Formik>


            </Paper>
        </Grid>

    )
}
export default Signup;