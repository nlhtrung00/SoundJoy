import { Container, Table, TableBody,Button, Typoraphy, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getListUsers } from "../../../Redux/Slice/UserSlice";

const StyledTableCell = styled(TableCell)(({theme})=>({
  [`&.${tableCellClasses.head}`]:{
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
  const handleDelete = (id) => {
    
  };
  console.log(data);
  

  return (
    <Container maxWidth='lg'>
      
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="table list user">
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Phone number</StyledTableCell>
              <StyledTableCell>Registration date</StyledTableCell>
              {/* <StyledTableCell>Role</StyledTableCell> */}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data&&data.map(user=>{
              return(
                <StyledTableRow key={user._id}>
                  <StyledTableCell>
                    {user.name}
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
                  <StyledTableCell>
                    <Button size='small'>
                      Detail
                    </Button>
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
