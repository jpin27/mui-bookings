import React from "react";
import {
  TableCell,
  TableRow
} from "@mui/material";
import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";

// Destructuring props in the function arguments.
const Booking = ({ 
  allBookings, 
  booking_id, 
  document_id, 
  seeker, 
  giver, 
  date, 
  amount, 
  deleteBooking,
  getBookings 
}) => {
  
  const handleDelete = () => {
    const filteredBookings = allBookings.filter((booking) => booking.name !== name);
    deleteBooking(filteredBookings);
  };

  const handleUpdate = () => {
    const filteredPlayers = allBookings.filter((booking) => booking.name !== name);
    deleteBooking(filteredPlayers);
  };
  
  return (
    <TableRow key = {booking_id}>
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
        <UpdateBooking 
          document_id   = { document_id } 
          updateBooking = { getBookings }
        />
        <DeleteBooking 
          document_id     = { document_id }
          refreshBookings = { getBookings } 
        />
      </TableCell>
    </TableRow>
  );
};

export default Booking;