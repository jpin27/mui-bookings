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
  addDoc, 
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


const dbInstance = collection(firestore, 'bookings');

export default function UpdateBooking(props) {
    
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
    console.log(seeker);
    console.log(giver);
    console.log(date);
    console.log(amount);
    updateBooking();
    handleClose();
  }

  const updateBooking = async () => {

    console.log("You clicked the button");
    // // structure the booking data
    // const bookingData = {
    //   booking_id: booking_id,  
    //   seeker: seeker,
    //   giver: giver,
    //   date:  new Date(date),
    //   amount: parseFloat(amount)
    // };
    // try {
    //   // insert record in collection
    //   await addDoc(dbInstance, bookingData);
    //   // show a success message
    //   console.log("Booking added successfully");
    //     //reset fields
    // //  setSeeker("");
    // //  setGiver("");
    // } catch (error) {
    //   // show an error message
    //   console.log("An error occurred while adding the booking");
    // }
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
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}