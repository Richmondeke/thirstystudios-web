import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    Timestamp,
    doc,
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

export interface BookingData {
    studioId: string;
    studioName: string;
    bookingDate: Date; // The selected day
    startTime: string; // e.g., "14:00"
    hours: number;     // Duration in hours
    equipmentList: string;
    userDetails: {
        name: string;
        email: string;
        phone: string;
    };
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
    needsEngineer?: boolean;
    wantsMixingMastering?: boolean;
}

export const createBooking = async (data: BookingData) => {
    try {
        if (!data.bookingDate || isNaN(data.bookingDate.getTime())) {
            throw new Error("Invalid booking date provided to createBooking.");
        }

        const docRef = await addDoc(collection(db, "bookings"), {
            ...data,
            bookingDate: Timestamp.fromDate(data.bookingDate),
            createdAt: serverTimestamp(),
            status: 'pending'
        });
        return docRef.id;
    } catch (error) {
        throw error;
    }
};

export const updateBookingStatus = async (bookingId: string, status: BookingData['status']) => {
    try {
        const bookingRef = doc(db, "bookings", bookingId);
        await updateDoc(bookingRef, {
            status,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating booking status: ", error);
        throw error;
    }
};

export const checkAvailability = async (studioId: string, date: Date) => {
    // Simple mock availability check
    // In a real app, this would query bookings for the same date/time
    return true;
};
