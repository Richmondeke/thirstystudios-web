"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getBookingAction(bookingId: string) {
    try {
        const bookingDoc = await adminDb.collection("bookings").doc(bookingId).get();
        if (!bookingDoc.exists) {
            return { success: false, message: "Booking not found" };
        }
        const data = bookingDoc.data();
        return {
            success: true,
            data: {
                id: bookingDoc.id,
                email: data?.userDetails?.email,
                name: data?.userDetails?.name,
                studioName: data?.studioName,
                status: data?.status
            }
        };
    } catch (error: any) {
        console.error("Error fetching booking:", error);
        return { success: false, message: error.message };
    }
}

export async function getStudioBookingsAction(studioId: string) {
    try {
        const bookingsSnapshot = await adminDb.collection("bookings")
            .where("studioId", "==", studioId)
            .where("status", "in", ["confirmed", "paid"])
            .get();

        return {
            success: true,
            data: bookingsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    bookingDate: data.bookingDate.toDate().toISOString(),
                    startTime: data.startTime,
                    hours: data.hours
                };
            })
        };
    } catch (error: any) {
        console.error("Error fetching studio bookings:", error);
        return { success: false, message: error.message };
    }
}
