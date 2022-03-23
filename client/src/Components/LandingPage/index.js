import React, { useState } from 'react';
import Header from './Header'
import Login from './Login';
import bglandingpage from '../../../Images/bglandingpage.jpg'
import { Box } from '@mui/material';
import Signup from './Signup';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    relative:{
        position:'relative'
    }

})
const LandingPage=()=>{
    const [option, setOption] = useState('');
    const classes = useStyles();
    console.log(option);
    return(
        <div className={classes.relative}>
            <Header setOption={setOption} />
            <Box 
                component="img"
                sx={{
                    height: '100%',
                    width:'100%',
                    backgroundSize: 'contain',
                }}
                src={bglandingpage}
            />
            {option==='Login' && <Login />}
            {option==='Signup' && <Signup />}
            
            
        </div>
        
        
    )
}
export default LandingPage;