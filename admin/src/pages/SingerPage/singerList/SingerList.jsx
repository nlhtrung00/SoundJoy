import { Container, Table, TableBody, ButtonGroup, Typography, Button, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getListSingers } from "../../../Redux/Slice/SingerSlice";
import { Avatar, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
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
  const data = useSelector(getListSingers);
  return (
    <Container>
      <Typography variant="h6">
        List Singers
      </Typography>
      <Link to='/singers/add'>
        <Button variant="contained" size="small" sx={{ my: 1 }}>
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
                        <Typography sx={{ fontWeight: 500 }}>
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
                      <Link to={`singers/${singer._id}`}>
                        <Button size='small' title='View detail' sx={{borderRadius:0}}>
                          <InfoIcon />
                        </Button>
                      </Link>


                      <Button size='small' title="Delete singer" sx={{ borderRadius:0,bgcolor: '#f7532a', '&:hover': { bgcolor: '#e43e1d' } }}>
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
    </Container>
  );
};

export default SingerList;
