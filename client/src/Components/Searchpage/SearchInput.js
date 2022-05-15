import { InputBase, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types'
const useStyle = makeStyles({
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
        width:'70%',
        
    }
});

const SearchInput = ({onSubmit}) => {
    const classes = useStyle();
    const [searchTerm,setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null)
    const handleSearchTermChange=(e)=>{
        const value = e.target.value
        setSearchTerm(value)
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        };
        typingTimeoutRef.current = setTimeout(()=>{
            onSubmit(value)
        },500)
        
    }
    return (
        <div className={classes.searchbar}>
            <Typography sx={{ my: 1 }} variant="h6">
                Search for things - Enjoy your time
            </Typography>
            <div className={classes.searchinput}>
                <SearchIcon />
                <InputBase sx={{color:'white',p:0.5,width:'100%'}} value={searchTerm} onChange={handleSearchTermChange}/>
            </div>
        </div>
    );
};
SearchInput.propTypes = {
    onSubmit: PropTypes.func
};
SearchInput.defaultProps ={
    onSubmit: null,
}
export default SearchInput;