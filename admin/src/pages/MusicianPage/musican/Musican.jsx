import React, { useState, useEffect } from "react";
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
import { Avatar, Container, Box, Typography, Button, CircularProgress } from "@mui/material";
import { fetchAsyncSongByMusician, getSongsByMusician } from "../../../Redux/Slice/SongSlice";
import { fetchAsyncAlbumsByMusician, getListAlbumsByMusician } from "../../../Redux/Slice/AlbumSlice";
import Tablistalbum from "./Tablistalbums";
import Tablistsong from "./Tablistsongs"
const useStyle = makeStyles({
})
export default function MusicianDetail() {
   const [valueTab, setValueTab] = useState('1');
   const [loading, setLoading] = useState(true);
   const handleChangeTab = (e, value) => {
      setValueTab(value);
   }
   const { musicianId } = useParams();
   const data = useSelector(getMusician);
   const songsbymusician = useSelector(getSongsByMusician);
   const albumsbymusician = useSelector(getListAlbumsByMusician);
   const dispatch = useDispatch();
   const classes = useStyle();
   useEffect(() => {
      const action = async () => {
         setLoading(true);
         await dispatch(fetchAsyncMusicianById(musicianId));
         await dispatch(fetchAsyncSongByMusician(musicianId));
         await dispatch(fetchAsyncAlbumsByMusician(musicianId));
      }
      action();
      setLoading(false)
   }, [musicianId])
   return (
      <Container>
         {loading ?
            <Box sx={{ display: 'flex' }}>
               <CircularProgress />
            </Box>
            :
            <>
               <Box>
                  <Box>
                     <Box sx={{ display: 'flex', alignItems: 'flex-end', py: 1 }}>
                        <Avatar alt="avatar singer" src={data.image} sx={{
                           width: '150px',
                           height: '150px'
                        }} />

                        <Box sx={{ ml: 2, }} >
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
                              <Tablistsong listSongs={songsbymusician} />
                           </TabPanel>
                           <TabPanel value="2" sx={{
                              p: 0
                           }}>
                              <Tablistalbum listAlbums={albumsbymusician} />
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
                  <Link to={`/musicians/edit/${data._id}`}>
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
