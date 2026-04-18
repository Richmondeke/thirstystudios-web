"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getUserBookingsAction(email: string) {
    try {
        const bookingsSnapshot = await adminDb.collection("bookings")
            .where("userDetails.email", "==", email)
            .orderBy("createdAt", "desc")
            .get();

        const bookings = bookingsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                studio: data.studioName,
                date: data.bookingDate ? new Date(data.bookingDate.toDate()).toLocaleDateString() : 'TBD',
                time: data.bookingDate ? new Date(data.bookingDate.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
                duration: `${data.hours} Hours`,
                status: data.status,
                accessCode: data.accessCode || "PENDING"
            };
        });

        return { success: true, bookings };
    } catch (error: any) {
        console.error("Dashboard Fetch Error:", error);
        return { success: false, message: error.message };
    }
}
