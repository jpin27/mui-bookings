import { useState, useEffect } from "react";
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

/**
 * The Bookings() function connects to the Firebase collection and
 * returns an array containing all the bookings stored.
 * 
 * @returns an array of bookings stored in the Firebase collection
 */
export default function Bookings() {

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

  function updateBooking() {
    console.log('update');
  }

  function deleteBooking() {
    console.log('delete');
  }

  return bookings;

}
