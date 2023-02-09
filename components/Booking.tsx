import React from "react";
import {
  Stack,
  TableCell,
  TableRow
} from "@mui/material";
import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";

// Destructuring props in the function arguments.
const Booking = ({
  bookings, 
  booking_id, 
  document_id, 
  seeker, 
  giver, 
  date, 
  amount, 
  getBookings 
}) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {booking_id}
      </TableCell>
      <TableCell align="right">{seeker}</TableCell>
      <TableCell align="right">{giver}</TableCell>
      <TableCell align="right">
        {date}
      </TableCell>
      <TableCell align="right">{amount}</TableCell>
      <TableCell align="center">
        <Stack direction="row">
          <UpdateBooking 
            bookings        = { bookings }
            document_id     = { document_id } 
            refreshBookings = { getBookings }
          />
          <DeleteBooking 
            document_id     = { document_id }
            refreshBookings = { getBookings } 
          />
        </Stack>
        
      </TableCell>
    </TableRow>
  );
};

export default Booking;