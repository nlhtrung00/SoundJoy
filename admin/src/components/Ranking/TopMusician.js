import { Grid } from '@mui/material';
import CardMusician from '../Card/CardMusician';

const TopMusician = ({topMusicians}) => {
    
    return (
        <Grid container spacing={3}>
            {topMusicians && topMusicians.map((musician) => {
                return (
                    <Grid item md={2.4} key={musician._id}>
                        <CardMusician musician={musician}/>
                    </Grid>
                )
            })}
            
        </Grid>
    );
};

export default TopMusician;