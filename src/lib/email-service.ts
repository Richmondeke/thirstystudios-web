import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface EmailTemplateData {
    to: string;
    subject: string;
    body: string;
}

export const sendEmail = async (data: EmailTemplateData) => {
    if (!resend) {
        console.log("==========================================");
        console.log("MOCK EMAIL (Resend Key Missing)");
        console.log(`SENDING EMAIL TO: ${data.to}`);
        console.log(`SUBJECT: ${data.subject}`);
        console.log(`BODY: \n${data.body}`);
        console.log("==========================================");
        return { success: true, mock: true };
    }

    try {
        const result = await resend.emails.send({
            from: 'Thirsty Studios <bookings@thirstystudios.com>',
            to: data.to,
            subject: data.subject,
            text: data.body,
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Resend Error:", error);
        return { success: false, error };
    }
};

export const sendBookingConfirmationEmail = async (email: string, bookingDetails: any) => {
    const createPasswordUrl = `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?reference=${bookingDetails.id}`;

    const body = `
Hello ${bookingDetails.name},

Your booking for ${bookingDetails.studioName} has been received and processed.

Details:
- Date: ${new Date(bookingDetails.bookingDate).toLocaleDateString()}
- Duration: ${bookingDetails.hours} Hours
- Total Amount: ₦${bookingDetails.totalAmount.toLocaleString()}

To get your studio access code and manage your session, please create a password by clicking the link below:
${createPasswordUrl}

See you soon!
ThirstyStudios Lagos
    `;

    return await sendEmail({
        to: email,
        subject: `Booking Confirmed: ${bookingDetails.studioName}`,
        body: body
    });
};
