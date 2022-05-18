import { Container, Table, TableBody, ButtonGroup, Typography, AlertTitle, Button, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListSingers } from "../../../Redux/Slice/SingerSlice";
import { Avatar, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AsyncDeleteSinger, fetchAsyncSingers } from "../../../Redux/Slice/SingerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const SingerList = () => {
  const [errorDel, setErrorDel] = useState('');
  const [openToast, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const data = useSelector(getListSingers);
  const dispatch = useDispatch();
  const [actionDel, setActionDel] = useState(false);
  useEffect(() => {
    const action = async () => {
      setLoading(true)
      await dispatch(fetchAsyncSingers())
    }
    action();
    setLoading(false)
  }, [])
  const handleDeleteSinger = async (id) => {

    try {
      // delete singer after then, fetch list changed singer
      const actionResult = await dispatch(AsyncDeleteSinger(id));
      let result = unwrapResult(actionResult);
      // set state to display toast message
      setActionDel(true);
      setOpen(true);
      // fetch list again
      dispatch(fetchAsyncSingers());
    }
    catch (err) {
      // set state to display toast message if error
      setErrorDel(err.message)
      setActionDel(true);
      setOpen(true);
    }

  }
  // close toast after seconds of time
  const handleCloseToast = () => {
    setOpen(false);
  }
  return (
    <Container maxWidth='xl' component={Paper} sx={{ height: '100%' }}>
      {
        loading ?
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          :
          <>
            <Typography variant="h6">
              List Singers
            </Typography>
            <Link to='/singers/add'>
              <Button variant="contained" size="small" sx={{ mt: 0.5, mb: 1.5 }}>
                Create new
                <AddIcon />
              </Button>
            </Link>

            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="table list user">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>singer</StyledTableCell>
                    <StyledTableCell>Short Information</StyledTableCell>
                    <StyledTableCell>Followers</StyledTableCell>

                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.map(singer => {
                    return (
                      <StyledTableRow key={singer._id}>
                        <StyledTableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={singer.image} />
                            <Box sx={{ ml: 1 }}>
                              <Typography sx={{
                                fontWeight: 500, width: '150px', height: '50px', display: 'box',
                                lineClamp: 2,
                                boxOrient: 'vertical',
                                overflow: 'hidden',
                              }}>
                                {singer.name}
                              </Typography>
                            </Box>


                          </Box>

                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography sx={{
                            maxWidth: '350px',
                            height: '70px',
                            display: 'box',
                            lineClamp: 2,
                            boxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {singer.information}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography>
                            {singer.followers}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                            <Link to={`/singers/${singer._id}`}>
                              <Button size='small' title='View detail' sx={{ borderRadius: 0 }}>
                                <InfoIcon />
                              </Button>
                            </Link>


                            <Button onClick={(e) => handleDeleteSinger(singer._id)} id={singer._id} size='small' title="Delete singer" sx={{ borderRadius: 0, bgcolor: '#f7532a', '&:hover': { bgcolor: '#e43e1d' } }}>
                              <DeleteForeverIcon />
                            </Button>
                          </ButtonGroup>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {actionDel && !errorDel ?
              <Box>
                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  open={openToast}
                  autoHideDuration={4000}
                  onClose={handleCloseToast}
                >
                  <MuiAlert elevation={6} severity="success" variant="filled" >
                    <AlertTitle>Success</AlertTitle>
                    You removed singer successfully.Let's check !

                  </MuiAlert>
                </Snackbar>
              </Box> :
              <Box>
                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  open={openToast}
                  autoHideDuration={4000}
                  onClose={handleCloseToast}
                >
                  <MuiAlert elevation={6} severity="error" variant="filled" >
                    <AlertTitle>Error</AlertTitle>
                    {errorDel}
                  </MuiAlert>
                </Snackbar>
              </Box>}
          </>
      }

    </Container>
  );
};

export default SingerList;
