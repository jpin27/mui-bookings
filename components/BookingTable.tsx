import React from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
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
import { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";

export default function BookingTable() {

  const [bookings, setBookings] = useState( [] );
  const [loading, setLoading] = useState<boolean>( true );

  useEffect( () => {
    getBookings();
    setTimeout( () => {
      setLoading(false);
    }, 2000)
  },[]);

  const bookingsCollection = collection(firestore, 'bookings');

  const getBookings = async () => {
    const bookingsQuery = query(
      bookingsCollection,  
      limit(10)
    );

    const queryResult = await getDocs(bookingsQuery);
    const result = queryResult.docs.map((booking) => {
      return { ...booking.data(), document_id: booking.id }
    });
   
    setBookings(result);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Seeker</TableCell>
            <TableCell align="right">Giver</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Total&nbsp;Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
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
              <TableCell align="right">dateu</TableCell>
              <TableCell align="right">{booking.amount}</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
