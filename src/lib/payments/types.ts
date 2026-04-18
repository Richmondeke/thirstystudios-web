export interface PaymentInitializationRequest {
    amount: number;
    currency: string;
    reference: string;
    customer: {
        name: string;
        email: string;
    };
    metadata?: Record<string, any>;
}

export interface PaymentInitializationResponse {
    status: boolean;
    message: string;
    data: {
        checkout_url: string;
        reference: string;
        provider: string;
    };
}
