import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

import { makeStyles } from '@mui/styles';
import { FormLabel } from '@mui/material';
const useStyles = makeStyles({
    // input: {
    //     marginTop: '15px'
    // },
    datetimepicker:{
        marginTop:'10px',
        marginLeft:'5px'
    }

})
const DatePickerr = (props) => {
    const classes = useStyles();
    const {field,form,type,lable, placeholder, disable} = props;
    const {name} = field;
    const {value} = field;
    const {setFieldValue} = form;
    //console.log(setFieldValue);
    return (
        <>
        <FormLabel>
            {props.label}
        </FormLabel>
        <DatePicker
            format="dd/MM/y"
            id={name}
            {...field}
            onChange={val=>setFieldValue(name,val)}
            className={classes.datetimepicker}
        />
        </>
        


    );
};
DatePickerr.propTypes ={
    field:PropTypes.object.isRequired,
    form:PropTypes.object.isRequired,
    label:PropTypes.string,
    placeholder:PropTypes.string,
}
DatePickerr.defaultProps ={
    label:'',
    placeholder:'',

}
export default DatePickerr;