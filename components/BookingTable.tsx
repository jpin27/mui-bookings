import React, { useState, useEffect } from "react";
import Booking from './Booking';
import CreateBooking from "./CreateBooking";

import {
  Box,
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

import { firestore } from '../firebase/initializeFirebase';
import { collection, getDocs, query } from "@firebase/firestore";


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

function EnhancedTableToolbar({bookings, refreshBookings}) {
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
      <CreateBooking
        bookingsCollection = { bookings } 
        refreshBookings    = { refreshBookings }
      />      
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
  // const bookings = Bookings();

  const [bookings, setBookings] = useState( [] );

  useEffect( () => {
    getBookings();
    setTimeout( () => { }, 1000);
  },[]);

  const bookingsCollection = collection(firestore, 'bookings');

  const getBookings = async () => {
    const bookingsQuery = query( bookingsCollection );
    const queryResult = await getDocs(bookingsQuery);
    const result = queryResult.docs.map((booking) => {
      return { ...booking.data(), document_id: booking.id }
    });
   
    setBookings(result);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          bookings        = { bookings }
          refreshBookings = { getBookings }
        />
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
                <Booking
                  allBookings   = { bookings }
                  booking_id    = { booking.booking_id }
                  document_id   = { booking.document_id }
                  seeker        = { booking.seeker }
                  giver         = { booking.giver }
                  date          = { booking.date.toDate().toDateString() }
                  amount        = { booking.amount}
                  deleteBooking = { setBookings }
                  getBookings   = { getBookings }
                />                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
