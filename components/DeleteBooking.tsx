import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from '../firebase/initializeFirebase';
import {
  collection, 
  deleteDoc, 
  doc
} from "@firebase/firestore";

const dbInstance = collection(firestore, 'bookings');

export default function DeleteBooking({
  document_id,
  refreshBookings
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    deleteBooking(document_id);
    refreshBookings();
    handleClose();
  }

  const deleteBooking = async (documentId: string) => {
    try {

      // create a pointer to the Document id
      const docRef = doc(firestore,`bookings/${documentId}`);
      // delete the doc
      await deleteDoc(docRef);

      // show a success message
      console.log("Bookinginging deleted successfully");
      
      //reset fields
      //  setSeeker("");
      //  setGiver("");
    } catch (error) {
      // show an error message
      console.log("An error occurred while deleting the booking");
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Delete this booking?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The booking will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}