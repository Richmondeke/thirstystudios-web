"use server";

import { adminAuth } from "@/lib/firebase-admin";

export async function setupUserAccountAction(email: string, password: string, name: string) {
    try {
        console.log(`DEBUG: Setting up account for ${email} with name ${name}`);

        // Check if user already exists
        let user;
        try {
            user = await adminAuth.getUserByEmail(email);
            // If user exists, we might want to update their password if it's a first-time setup
            // For now, let's just update the password
            await adminAuth.updateUser(user.uid, {
                password: password,
                displayName: name
            });
        } catch (e: any) {
            // User doesn't exist, create them
            user = await adminAuth.createUser({
                email: email,
                password: password,
                displayName: name,
                emailVerified: true
            });
        }

        return { success: true, message: "Account setup complete!" };
    } catch (error: any) {
        console.error("Auth helper error:", error);
        return { success: false, message: error.message };
    }
}
