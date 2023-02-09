import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { firestore } from '../firebase/initializeFirebase';
import {
  collection, 
  doc, 
  updateDoc
} from "@firebase/firestore";

const dbInstance = collection(firestore, 'bookings');

export default function UpdateBooking({
  bookings,
  document_id, 
  refreshBookings
}) {
    
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateBooking();
    refreshBookings();
    handleClose();
  } 
  
  // create a pointer to the Document id
  const docRef = doc(firestore,`bookings/${document_id}`);
  const booking = bookings.find(obj => obj.document_id === document_id);

  const [seeker, setSeeker] = useState('');
  const [giver, setGiver] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const updateBooking = async () => {
    // structure the booking data
    const bookingData = {  
      seeker: seeker,
      giver: giver,
      date:  new Date(date),
      amount: parseFloat(amount)
    };
    try {
      // insert record in collection
      await updateDoc(docRef, bookingData);
      // show a success message
    } catch (error) {
      // show an error message
      console.log("An error occurred while adding the booking");
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update a Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the fields below with the new information.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="seeker"
            label="Seeker's Name"
            type="text"
            defaultValue={booking.seeker}
            fullWidth
            variant="filled"
            onChange={e => {
              setSeeker(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="giver"
            label="Giver's Name"
            type="text"
            defaultValue={booking.giver}
            fullWidth
            variant="filled"
            onChange={e => {
              setGiver(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            defaultValue={booking.date.toDate()}
            variant="filled"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => {
              setDate(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Total Amount"
            type="text"
            defaultValue={booking.amount}
            fullWidth
            variant="filled"
            onChange={e => {
              setAmount(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}