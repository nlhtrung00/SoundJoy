import { Avatar, Container, Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinger } from "../../../Redux/Slice/SingerSlice";
import { fetchAsyncSingerById } from "../../../Redux/Slice/SingerSlice";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import background from "../../../assets/images/background_sing.jpg"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
const useStyle = makeStyles({

})
export default function SingerDetail() {
   const [valueTab, setValueTab] = useState('1');
   const handleChangeTab = (e, value) => {
      setValueTab(value);
   }
   const [loading, setLoading] = useState(true);
   const { singerId } = useParams();
   const data = useSelector(getSinger);
   const dispatch = useDispatch();
   const classes = useStyle();
   useEffect(() => {
      const action = async () => {
         setLoading(true);
         await dispatch(fetchAsyncSingerById(singerId));
      }
      setLoading(false)
   }, [singerId, dispatch])

   return (

      <Container maxWidth='xl' component={Paper} sx={{ height: '100%' }}>
         {loading ?
            <Box sx={{ display: 'flex' }}>
               <CircularProgress />
            </Box>
            :
            <>
               <Box className={classes.info}>
                  <Box>
                     <Box sx={{ display: 'flex', alignItems: 'flex-end', py: 1 }}>
                        <Avatar alt="avatar singer" src={data.image} sx={{
                           width: '150px',
                           height: '150px'
                        }} />
                        <Box sx={{ ml: 2, }}>
                           <Typography sx={{
                              fontWeight: 600,
                              fontSize: '70px',
                              letterSpacing: '8px',
                              my: 0
                           }}>
                              {data.name}
                           </Typography>
                           <Button variant="contained" size="small" sx={{ ml: 1, cursor: 'default' }}>
                              Follows: {data.followers}
                           </Button>
                        </Box>
                     </Box>

                  </Box>
                  <Box className="introduction" sx={{ mb: 1 }}>
                     <Typography variant="h6">
                        Introduction
                     </Typography>
                     <Typography>
                        {data.information}
                     </Typography>
                  </Box>

                  <Box className="achievement">
                     <Typography variant="h6">
                        Achievement
                     </Typography>
                     <Box sx={{
                        borderBottom: 1, borderColor: 'divider'
                     }}>
                        <TabContext value={valueTab}>
                           <TabList onChange={handleChangeTab} aria-label="tab for login">
                              <Tab label="Songs" value="1" />
                              <Tab label="Albums" value="2" />
                           </TabList>
                           <TabPanel value="1" sx={{
                              p: 0
                           }}>
                              Songs
                           </TabPanel>
                           <TabPanel value="2" sx={{
                              p: 0
                           }}>
                              Album
                           </TabPanel>
                        </TabContext>

                     </Box>
                  </Box>

               </Box>
               <Box className="edit_info" sx={{
                  position: 'fixed',
                  bottom: 30,
                  right: 30
               }}>
                  <Link to={`edit/${data._id}`}>
                     <Button variant='contained'>
                        Edit
                        <EditIcon sx={{ fontSize: '16px', ml: 0.5 }} />
                     </Button>
                  </Link>


               </Box>
            </>
         }
      </Container>

   );
}
