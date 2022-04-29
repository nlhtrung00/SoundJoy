import { Grid } from '@mui/material';
import CardSinger from '../Card/CardSinger';
const TopSinger = ({topSingers}) => {
    
    return (
        <Grid container spacing={3}>
            {topSingers && topSingers.map((singer) => {
                return (
                    <Grid item md={2.4} key={singer._id}>
                        <CardSinger singer={singer}/>
                    </Grid>
                )
            })}
                        
        </Grid>
    );
};

export default TopSinger;