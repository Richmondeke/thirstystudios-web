"use server";

import { sendBookingConfirmationEmail } from "@/lib/email-service";

export async function sendBookingConfirmationAction(email: string, bookingDetails: any) {
    try {
        const result = await sendBookingConfirmationEmail(email, bookingDetails);
        return result;
    } catch (error: any) {
        console.error("Error sending booking email:", error);
        return { success: false, error: error.message };
    }
}
