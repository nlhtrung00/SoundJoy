import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMusician, fetchAsyncMusicianById } from "../../../Redux/Slice/MusicianSlice";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import background from "../../../assets/images/background_sing.jpg"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Container, Box, Typography, Button } from "@mui/material";
const useStyle = makeStyles({
   background: {
      backgroundImage: `url(${background})`,
      height: '150px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '20px 20px 0 0'
   },
   avatar: {
      position: 'absolute',
      zIndex: 1000,
      top: '140px',
      paddingLeft: '15px'
   },

})
export default function MusicianDetail() {
   const [valueTab, setValueTab] = useState('1');
   const handleChangeTab = (e, value) => {
      setValueTab(value);
   }
   const { musicianId } = useParams();
   const data = useSelector(getMusician);
   console.log(data);
   const dispatch = useDispatch();
   const classes = useStyle();
   useEffect(() => {
      dispatch(fetchAsyncMusicianById(musicianId));
   }, [musicianId, dispatch])
   return (
      <Container>
         {Object.keys(data).length === 0 ? <div>Loading...</div>
            :
            <>
               <Box className={classes.info}>
                  <Box sx={{ height: '300px' }}>
                     <div className={classes.background}>

                     </div>
                     <Box className={classes.avatar} sx={{}}>
                        <Avatar alt="avatar singer" src={data.image} sx={{
                           width: '150px',
                           height: '150px'
                        }} />

                        <Box >
                           <Typography sx={{
                              fontWeight: 500,
                              fontSize: '28px',

                              my: 0
                           }}>
                              {data.name}
                           </Typography>

                           <Button variant="contained" size="small" sx={{ mb: 1 }}>
                              Follow: {data.followers}
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
