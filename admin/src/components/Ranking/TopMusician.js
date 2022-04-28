import { Grid } from '@mui/material';
import CardMusician from '../Card/CardMusician';

const TopMusician = () => {
    
    return (
        <Grid container spacing={3}>
            {/* tương tự top song */}
            <Grid item md={2.4}>
                <CardMusician />
            </Grid>
            <Grid item md={2.4}>
                <CardMusician />
            </Grid>
            <Grid item md={2.4}>
                <CardMusician />
            </Grid>
            
            
        </Grid>
    );
};

export default TopMusician;