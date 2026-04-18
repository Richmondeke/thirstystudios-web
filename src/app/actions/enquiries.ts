"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function submitEnquiry(formData: { email: string; message: string }) {
    try {
        await addDoc(collection(db, "enquiries"), {
            ...formData,
            status: "pending",
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error submitting enquiry:", error);
        return { success: false, error: "Failed to submit enquiry. Please try again." };
    }
}
