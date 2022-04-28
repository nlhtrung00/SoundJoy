import { Grid } from '@mui/material';
import CardSinger from '../Card/CardSinger';
const TopSinger = () => {
    
    return (
        <Grid container spacing={3}>
            {/* tương tự top song */}
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            <Grid item md={2.4}>
                <CardSinger />
            </Grid>
            
        </Grid>
    );
};

export default TopSinger;