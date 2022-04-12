import { Container,Avatar, Box, Table, TableBody, ButtonGroup, Typography, Button, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { getListMusicians } from "../../../Redux/Slice/MusicianSlice";
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
export default function MusicianList() {
  const data = useSelector(getListMusicians);
  return (
    <Container maxWidth='lg' component={Paper}>
      <Typography variant="h6">
        List Musicians
      </Typography>
      <Link to='/musicians/add'>
        <Button variant="contained" size="small" sx={{ mt: 0.5, mb:1.5 }}>
          Create new
          <AddIcon />
        </Button>
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="table list musician">
          <TableHead>
            <TableRow>
              <StyledTableCell>Musician</StyledTableCell>
              <StyledTableCell>Short Information</StyledTableCell>
              <StyledTableCell>Followers</StyledTableCell>

              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map(musician => {
              return (
                <StyledTableRow key={musician._id}>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={musician.image} />
                      <Box sx={{ ml: 1 }}>
                        <Typography sx={{
                          fontWeight: 500, width: '150px', height: '50px', display: 'box',
                          lineClamp: 2,
                          boxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {musician.name}
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
                      {musician.information}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>
                      {musician.followers}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                      <Link to={`musicians/${musician._id}`}>
                        <Button size='small' title='View detail' sx={{ borderRadius: 0 }}>
                          <InfoIcon />
                        </Button>
                      </Link>
                      <Button size='small' title="Delete musician" sx={{ borderRadius: 0, bgcolor: '#f7532a', '&:hover': { bgcolor: '#e43e1d' } }}>
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
}
