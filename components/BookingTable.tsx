import React, { useState, useEffect } from "react";

import Bookings from './Bookings';
import CreateBooking from "./CreateBooking";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { firestore } from '../firebase/initializeFirebase';
import { 
  collection, 
  deleteDoc, 
  doc, 
  DocumentData, 
  getDocs, 
  limit, 
  query, 
  QueryDocumentSnapshot, 
  updateDoc, 
  where 
} from "@firebase/firestore";
import UpdateBooking from "./UpdateBooking";

const dbInstance = collection(firestore, 'bookings');

// style params for the create modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EnhancedTableToolbar() {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Bookings
      </Typography>     
      <CreateBooking />      
    </Toolbar>
  );
}

const header = ['ID', 'Seeker', 'Giver', 'Date', 'Total Amount', 'Actions',]
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function BookingTable() {
  const bookings = Bookings();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{header[0]}</StyledTableCell>
                <StyledTableCell>{header[1]}</StyledTableCell>
                <StyledTableCell>{header[2]}</StyledTableCell>
                <StyledTableCell>{header[3]}</StyledTableCell>
                <StyledTableCell>{header[4]}</StyledTableCell>
                <StyledTableCell>{header[5]}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.booking_id}>
                  <TableCell component="th" scope="row">
                    {booking.booking_id}
                  </TableCell>
                  <TableCell align="right">{booking.seeker}</TableCell>
                  <TableCell align="right">{booking.giver}</TableCell>
                  <TableCell align="right">
                    {booking.date.toDate().toDateString()}
                  </TableCell>
                  <TableCell align="right">{booking.amount}</TableCell>
                  <TableCell align="center">
                    <UpdateBooking document_id={booking.document_id} />
                    <IconButton >
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
