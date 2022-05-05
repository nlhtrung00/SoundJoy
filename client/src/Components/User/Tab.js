import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getUser } from '../../Redux/Slices/UserSlice';
import LikeList from './LikeList';
const useStyle = makeStyles({
    active_tab:{
        backgroundColor:'#C65656',
        color:'white !important',
    },
    

})
const TabOption = () => {
    const classes = useStyle();
    const user = useSelector(getUser);
    const [valueTab, setValueTab] = useState('1');
    const handleChangeTab = (e, value) => {
        setValueTab(value);
    }
    return (
        <Box sx={{ }}>
            <TabContext value={valueTab}>
                <Tabs
                    // orientation="vertical"
                    variant="scrollable"
                    value={valueTab}
                    onChange={handleChangeTab}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: '#3E44D7' }}
                    
                >
                    <Tab  label="Your Profile" className={valueTab==='1'? classes.active_tab :""} value="1" sx={{py:3,px:5,fontWeight:600,fontSize:16,color:'#2a2a2a',}}/>
                    <Tab label="Update Infor" className={valueTab==='2'? classes.active_tab :""} value="2" sx={{py:3,px:5,fontWeight:600,fontSize:16,color:'#2a2a2a'}} />
                    <Tab label="Your LikeList" className={valueTab==='3'? classes.active_tab :""} value="3"  sx={{py:3,px:5,fontWeight:600,fontSize:16,color:'#2a2a2a'}}/>

                </Tabs>
                <TabPanel value='1' index={0}>
                    1
                </TabPanel>
                <TabPanel value='2' index={1}>
                    2
                </TabPanel>
                <TabPanel value='3' index={2} sx={{}}>
                    <LikeList user={user} />
                </TabPanel>
            </TabContext>
        </Box>

    );
};

export default TabOption;