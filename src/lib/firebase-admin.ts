import * as admin from "firebase-admin";

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: "thirstystudios-web-777",
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
            databaseURL: "https://thirstystudios-web-777.firebaseio.com"
        });
    } catch (error) {
        console.error("Firebase Admin initialization error:", error);
    }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
