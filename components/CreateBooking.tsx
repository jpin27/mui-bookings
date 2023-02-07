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
import Bookings from './Bookings';
import { firestore } from '../firebase/initializeFirebase';
import { setDoc } from 'firebase/firestore';
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


import AddIcon from "@mui/icons-material/Add";

export default function CreateBooking() {
  const bookings = Bookings();
  const [open, setOpen] = React.useState(false);

  const [seeker, setSeeker] = useState('');
  const [giver, setGiver] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const booking_id = bookings.length + 1;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // api.call(seeker, giver); // or whatever you want
    console.log(seeker);
    console.log(giver);
    console.log(date);
    console.log(amount);
    // const booking_date = firebase.firestore.Timestamp.fromDate(date);
    addBooking();
    handleClose();
  }

  const addBooking = async () => {
    // get the current timestamp
    const timestamp: string = Date.now().toString();
    // create a pointer to our Document
    const _booking = doc(firestore, `bookings/${timestamp}`);
    // structure the todo data
    const bookingData = {
      booking_id: booking_id,  
      seeker: seeker,
      giver: giver,
      date:  new Date(date),
      amount: parseFloat(amount)
    };
    try {
      //add the Document
      await setDoc(_booking, bookingData);
    //   //show a success message
      console.log("Booking added successfully");
    //   //reset fields
    //   setTitle("");
    //   setDescription("");
    } catch (error) {
      //show an error message
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