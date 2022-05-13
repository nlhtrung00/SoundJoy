import { Container, Table, TableBody, Button, Typoraphy, TableContainer, TableHead, TableRow, Paper, Box, Avatar, Typography, CircularProgress } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUsers, getListUsers } from "../../../Redux/Slice/UserSlice";

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

export default function UserList() {
  const data = useSelector(getListUsers);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const handleDelete = (id) => {

  };
  useEffect(() => {
    const action = async () => {
      setLoading(true)
      await dispatch(fetchAsyncUsers());
    }
    action();
    setLoading(false)
  }, [])


  return (
    <Container maxWidth='xl' component={Paper} sx={{ height: '100%' }}>
      {
        loading ?
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          :
          <>
            <Typography variant="h6" sx={{ my: 1 }}>
              List Users
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="table list user">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>User</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Phone number</StyledTableCell>
                    <StyledTableCell>Registration date</StyledTableCell>
                    {/* <StyledTableCell>Role</StyledTableCell> */}
                    {/* <StyledTableCell>Actions</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.map(user => {
                    return (
                      <StyledTableRow key={user._id}>
                        <StyledTableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.image} alt='avatar user' />
                            <Box sx={{ ml: 1 }}>
                              <Typography sx={{
                                fontWeight: 500, maxWidth: '150px', display: 'box',
                                lineClamp: 1,
                                boxOrient: 'horizontal',
                                overflow: 'hidden',
                              }}>
                                {user.name}
                              </Typography>
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          {user.address}
                        </StyledTableCell>
                        <StyledTableCell>
                          {user.phone_number}
                        </StyledTableCell>
                        <StyledTableCell>
                          {user.registration_date}
                        </StyledTableCell>
                        {/* <StyledTableCell>
                    <Link to={`users/${user._id}`}>
                      <Button size='small'>
                        Detail
                      </Button>
                    </Link>
                    
                  </StyledTableCell> */}
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
      }

    </Container>
  );
}
