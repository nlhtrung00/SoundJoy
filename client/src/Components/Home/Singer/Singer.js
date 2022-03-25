import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


import singerImg from "../../../Images/binz.jpeg";
import singerImg2 from "../../../Images/denvau.jpg"
const useStyle= makeStyles((theme)=>({
    card:{
        backgroundColor:"#272727",
    },
    cardimg:{
        objectFit:'cover',
        objectPosition:'center',
        height:'150px',
        
        
    },
    cardcontent:{
        backgroundColor: '#272727',
        '&:hover':{
            backgroundColor:'#434343'
        }
    },
    namegenre:{
        color:'white',
        fontWeight:500,
        fontSize:"16px",
        textAlign:'center',
        
    },
}));

const Singers = () => {
    const classes = useStyle();
    return (
        <Grid container spacing={3}>
            <Grid item xl={2} xs={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Binz
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                
            </Grid>
            <Grid item xl={2} xs={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Binz
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                
            </Grid>
            <Grid item xl={2} xs={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg2}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Den Vau
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                
            </Grid>
            <Grid item xl={2} xs={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Binz
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                
            </Grid>
            <Grid item xl={2} xs={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg2}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Den Vau
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                
            </Grid>
            <Grid item xl={2} xs={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.cardimg}
                            image={singerImg2}
                            alt="genre image"
                            sx={{
                                mx:"auto"
                            }}
                        />
                        <CardContent className={classes.cardcontent}>
                            <Typography className={classes.namegenre}>
                                Den Vau
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                
            </Grid>
           
        </Grid>
    );
};

export default Singers;