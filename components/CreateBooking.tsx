import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { firestore } from '../firebase/initializeFirebase';
import {
  addDoc, 
  collection
} from "@firebase/firestore";

import AddIcon from "@mui/icons-material/Add";

const dbInstance = collection(firestore, 'bookings');

export default function CreateBooking({
  bookingsCollection,
  refreshBookings
}) {
    
  const [open, setOpen] = React.useState(false);

  const [seeker, setSeeker] = useState('');
  const [giver, setGiver] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addBooking();
    refreshBookings();
    handleClose();
  }

  /* Generate an ID for the new booking entry.
   * Take all existing IDs, sort them in descending order,
   * and increment the largest value by 1.
   */
  const bookingIdArray = bookingsCollection
                          .map(({ booking_id }) => booking_id)
                          .sort((a, b) => b - a);
  const newBookingId = bookingIdArray[0] + 1;

  const addBooking = async () => {

    // structure the booking data
    const bookingData = {
      booking_id: newBookingId,  
      seeker: seeker,
      giver: giver,
      date:  new Date(date),
      amount: parseFloat(amount)
    };

    try {
      // insert record in collection
      await addDoc(dbInstance, bookingData);
      console.log("Booking added successfully");
    } catch (error) {
      console.log("An error occurred while adding the booking");
    }
    
  };

  return (
    <div>
      <Button 
        size = "small" 
        startIcon = {<AddIcon />}
        onClick={handleClickOpen}
      >
        Create
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a booking, please enter the information needed below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="seeker"
            label="Seeker's Name"
            type="text"
            fullWidth
            variant="filled"
            onChange = {e => {
              setSeeker(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="giver"
            label="Giver's Name"
            type="text"
            fullWidth
            variant="filled"
            onChange = {e => {
              setGiver(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            variant="filled"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange = {e => {
              setDate(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Total Amount"
            type="text"
            fullWidth
            variant="filled"
            onChange = {e => {
              setAmount(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}