import React, { useState } from "react";
import {AppBar, Button, Container, MenuItem, Toolbar, Typography} from '@mui/material'

const options = ['Login','Signup'];
const Header=({setOption})=>{
    return(
        <AppBar 
            position="static"
            sx={{ bgcolor: "#171334" }}
        >
            <Container>
                <Toolbar>
                    <Typography
                        variant="h5"
                        noWrap
                        fontWeight="600"
                        sx={{ flexGrow: 1 }}
                    >    
                        SoundJoy
                    </Typography>
                    {options.map((option)=>
                        (
                            <Button 
                            color="inherit"
                            key={option}
                            size="large"
                            value={option}
                            onClick={(e)=>setOption(e.target.value)}
                            >
                                {option}
                            </Button>
                        )
                    )}
                   
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header;