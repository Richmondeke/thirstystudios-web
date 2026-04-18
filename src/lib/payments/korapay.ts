import {
    PaymentInitializationRequest,
    PaymentInitializationResponse,
} from "./types";

export class KorapayProvider {
    name = "korapay";
    private readonly baseUrl = "https://api.korapay.com/merchant/api/v1";
    private readonly secretKey: string;

    constructor(secretKey: string) {
        if (!secretKey) {
            throw new Error("Korapay initialization failed: secretKey is required.");
        }
        this.secretKey = secretKey;
    }

    async initialize(request: PaymentInitializationRequest): Promise<PaymentInitializationResponse> {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
            const bookingId = request.metadata?.bookingId || 'unknown';
            const redirectUrl = `${baseUrl}/booking/success?reference=${request.reference}&bookingId=${bookingId}`;

            const payload = {
                amount: request.amount,
                currency: request.currency,
                reference: request.reference,
                customer: request.customer,
                notification_url: `${baseUrl}/api/payments/webhook`,
                redirect_url: redirectUrl,
                metadata: request.metadata
            };

            const response = await fetch(`${this.baseUrl}/charges/initialize`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.secretKey}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.status) {
                return {
                    status: false,
                    message: result.message || "Korapay initialization failed",
                    data: { checkout_url: "", reference: request.reference, provider: this.name }
                };
            }

            return {
                status: true,
                message: "Success",
                data: {
                    checkout_url: result.data.checkout_url,
                    reference: result.data.reference,
                    provider: this.name
                }
            };
        } catch (error) {
            console.error("Korapay Error:", error);
            return {
                status: false,
                message: "Network error during Korapay initialization",
                data: { checkout_url: "", reference: request.reference, provider: this.name }
            };
        }
    }
}
