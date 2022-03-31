import React, { useState } from "react";
import {AppBar, Button, Container, MenuItem, Toolbar, Typography} from '@mui/material'

const options = ['Login','Signup'];
const Header=()=>{
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