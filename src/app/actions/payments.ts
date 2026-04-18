"use server";

import { KorapayProvider } from "@/lib/payments/korapay";
import { PaymentInitializationRequest } from "@/lib/payments/types";

export async function initializePaymentAction(request: {
    amount: number;
    email: string;
    name: string;
    reference: string;
    metadata: any;
}) {
    const secretKey = process.env.KORAPAY_SECRET_KEY;
    if (!secretKey) {
        throw new Error("KORAPAY_SECRET_KEY is not configured");
    }

    const provider = new KorapayProvider(secretKey);

    const initRequest: PaymentInitializationRequest = {
        amount: request.amount,
        currency: "NGN",
        reference: request.reference,
        customer: {
            name: request.name,
            email: request.email
        },
        metadata: request.metadata
    };

    return await provider.initialize(initRequest);
}
