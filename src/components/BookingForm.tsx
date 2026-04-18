"use client";

import { useState, useEffect, useCallback } from "react";
import { createBooking, BookingData } from "@/lib/booking-service";
import { initializePaymentAction } from "@/app/actions/payments";
import { sendBookingConfirmationAction } from "@/app/actions/emails";
import { getStudioBookingsAction } from "@/app/actions/booking";
import { CalendarPicker } from "@/components/CalendarPicker";
import { TimePicker } from "@/components/TimePicker";

interface BookingFormProps {
    studioId?: string;
    studioName?: string;
}

export default function BookingForm({ studioId = "music-studio", studioName = "Music Studio" }: BookingFormProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [existingBookings, setExistingBookings] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        bookingDate: "",
        startTime: "10:00",
        hours: 2,
        needsEngineer: false,
        wantsMixingMastering: false,
        equipmentList: "",
        name: "",
        email: "",
        phone: ""
    });
    const [dateError, setDateError] = useState(false);
    const [overlapError, setOverlapError] = useState<string | null>(null);

    // Fetch existing bookings
    const fetchBookings = useCallback(async () => {
        const result = await getStudioBookingsAction(studioId);
        if (result.success && result.data) {
            setExistingBookings(result.data);
        }
    }, [studioId]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const checkOverlap = () => {
        if (!formData.bookingDate) return false;

        const selectedDateStr = new Date(formData.bookingDate).toISOString().split('T')[0];
        const [startH, startM] = formData.startTime.split(':').map(Number);
        const startTotalMinutes = startH * 60 + startM;
        const endTotalMinutes = startTotalMinutes + formData.hours * 60;

        const overlapping = existingBookings.some(booking => {
            const bookingDateStr = new Date(booking.bookingDate).toISOString().split('T')[0];
            if (bookingDateStr !== selectedDateStr) return false;

            const [bStartH, bStartM] = booking.startTime.split(':').map(Number);
            const bStartTotal = bStartH * 60 + bStartM;
            const bEndTotal = bStartTotal + booking.hours * 60;

            // Check if slots overlap: (StartA < EndB) and (EndA > StartB)
            return (startTotalMinutes < bEndTotal) && (endTotalMinutes > bStartTotal);
        });

        return overlapping;
    };

    const rates = {
        rental: 50000,
        engineer: 30000,
        mixingMastering: 200000
    };

    const calculateTotal = () => {
        let total = rates.rental * Number(formData.hours);
        if (formData.needsEngineer) {
            total += rates.engineer * Number(formData.hours);
        }
        if (formData.wantsMixingMastering) {
            total += rates.mixingMastering;
        }
        return total;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.bookingDate) {
                setDateError(true);
                return;
            }
            if (checkOverlap()) {
                setOverlapError("Selected slot overflows with an existing booking. Please try another time.");
                return;
            }
        }
        setDateError(false);
        setOverlapError(null);
        setStep(prev => prev + 1);
    };
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const reference = `TS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            const total = calculateTotal();

            // 1. Create booking in Firestore
            if (!formData.bookingDate) {
                throw new Error("Please select a valid booking date.");
            }

            const selectedDate = new Date(formData.bookingDate);
            if (isNaN(selectedDate.getTime())) {
                throw new Error("Invalid date selected. Please try again.");
            }

            const bookingData: BookingData = {
                studioId,
                studioName,
                bookingDate: selectedDate,
                startTime: formData.startTime,
                hours: Number(formData.hours),
                needsEngineer: formData.needsEngineer,
                wantsMixingMastering: formData.wantsMixingMastering,
                equipmentList: formData.equipmentList,
                userDetails: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                },
                totalAmount: total,
                status: 'pending'
            };

            const bookingId = await createBooking(bookingData);

            // 1.5 Send confirmation email (async)
            sendBookingConfirmationAction(formData.email, {
                id: bookingId,
                name: formData.name,
                studioName,
                bookingDate: selectedDate,
                hours: formData.hours,
                totalAmount: total
            }).catch(err => console.error("Auto-email failure:", err));

            // 2. Initialize Payment
            const paymentResponse = await initializePaymentAction({
                amount: total,
                email: formData.email,
                name: formData.name,
                reference: reference,
                metadata: {
                    bookingId,
                    studioId,
                    studioName
                }
            });

            if (paymentResponse.status && paymentResponse.data.checkout_url) {
                // 3. Redirect to Korapay
                window.location.href = paymentResponse.data.checkout_url;
            } else {
                throw new Error(paymentResponse.message || "Failed to initialize payment");
            }
        } catch (error: any) {
            alert(error.message || "Failed to process booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (step === 4) {
        return (
            <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">BOOKING REQUESTED</h2>
                <p className="opacity-60 mb-8">
                    We've received your request for {studioName}. <br />
                    Our team will contact you shortly to confirm and process payment of ₦{calculateTotal().toLocaleString()}.
                </p>
                <button
                    onClick={() => window.location.href = "/studios"}
                    className="px-8 py-3 bg-white text-black text-xs tracking-[0.3em] font-bold uppercase hover:bg-accent-yellow transition-colors"
                >
                    Return to Studios
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto glass-panel p-8 md:p-12 animate-slide-up">
            <div className="flex justify-between mb-12">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`flex items-center gap-2 ${step >= i ? 'opacity-100' : 'opacity-30'}`}>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${step === i ? 'bg-white text-black' : 'border-white/20'}`}>
                            {i}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest hidden md:block">
                            {i === 1 ? 'Details' : i === 2 ? 'Options' : 'Review'}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-bold uppercase tracking-tighter">Schedule your session</h3>
                        <div>
                            <CalendarPicker
                                selectedDate={formData.bookingDate ? new Date(formData.bookingDate) : null}
                                bookings={existingBookings}
                                onSelect={(date) => {
                                    setFormData(prev => ({ ...prev, bookingDate: date.toISOString() }));
                                    if (dateError) setDateError(false);
                                    setOverlapError(null);
                                }}
                                label="Session Date"
                            />
                            {dateError && <p className="text-[10px] text-accent uppercase tracking-widest mt-2">Required: please select a date</p>}
                        </div>
                        <div>
                            <TimePicker
                                startTime={formData.startTime}
                                duration={formData.hours}
                                bookings={existingBookings}
                                selectedDate={formData.bookingDate ? new Date(formData.bookingDate) : null}
                                onStartTimeChange={(startTime) => setFormData(prev => ({ ...prev, startTime }))}
                                onDurationChange={(hours) => setFormData(prev => ({ ...prev, hours }))}
                                label="Session Time & Duration"
                            />
                            {overlapError && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-2">{overlapError}</p>}
                        </div>
                        <div className="pt-4 border-t border-white/5 space-y-4">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="needsEngineer"
                                    checked={formData.needsEngineer}
                                    onChange={handleChange}
                                    className="w-5 h-5 border-white/10 bg-black/40 rounded checked:bg-accent-yellow"
                                />
                                <div>
                                    <span className="text-xs uppercase tracking-widest block font-bold group-hover:text-accent-yellow transition-colors">Need a Professional Engineer?</span>
                                    <span className="text-[10px] opacity-40 uppercase tracking-widest">Add ₦30,000 / hour</span>
                                </div>
                            </label>

                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="wantsMixingMastering"
                                    checked={formData.wantsMixingMastering}
                                    onChange={handleChange}
                                    className="w-5 h-5 border-white/10 bg-black/40 rounded checked:bg-accent-yellow"
                                />
                                <div>
                                    <span className="text-xs uppercase tracking-widest block font-bold group-hover:text-accent-yellow transition-colors">Mixing & Mastering Features</span>
                                    <span className="text-[10px] opacity-40 uppercase tracking-widest">Add ₦200,000 / track</span>
                                </div>
                            </label>
                            {formData.wantsMixingMastering && (
                                <div className="ml-9 p-4 bg-white/5 rounded border border-white/5 space-y-2 animate-fade-in">
                                    <p className="text-[10px] uppercase tracking-widest opacity-50">Timeline: 5-7 Working Days</p>
                                    <p className="text-[10px] uppercase tracking-widest opacity-50">Includes 2 Revisions Max</p>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={handleNext} className="w-full py-4 bg-white text-black text-xs tracking-[0.3em] uppercase font-bold hover:bg-accent-yellow transition-colors mt-8">
                            Continue
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-bold uppercase tracking-tighter">Your Information</h3>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Artist or Representative"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Equipment you're bringing</label>
                            <textarea
                                name="equipmentList"
                                rows={3}
                                placeholder="Instruments, specific gear, etc."
                                value={formData.equipmentList}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors resize-none"
                            />
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-xs tracking-[0.3em] uppercase hover:bg-white/5 transition-colors">
                                Back
                            </button>
                            <button type="button" onClick={handleNext} className="flex-[2] py-4 bg-white text-black text-xs tracking-[0.3em] uppercase font-bold hover:bg-accent-yellow transition-colors">
                                Review Booking
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8 animate-fade-in text-center">
                        <h3 className="text-2xl font-bold uppercase tracking-tighter">Review & Confirm</h3>
                        <div className="text-left bg-white/5 p-6 space-y-4 rounded border border-white/5">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] uppercase opacity-40">Studio</span>
                                <span className="text-sm font-bold uppercase tracking-widest">{studioName}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] uppercase opacity-40">Duration</span>
                                <span className="text-sm font-bold uppercase">{formData.hours} Hours @ ₦{rates.rental.toLocaleString()}</span>
                            </div>
                            {formData.needsEngineer && (
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-[10px] uppercase opacity-40">Engineer Service</span>
                                    <span className="text-sm font-bold">₦{(rates.engineer * Number(formData.hours)).toLocaleString()}</span>
                                </div>
                            )}
                            {formData.wantsMixingMastering && (
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-[10px] uppercase opacity-40">M&M Delivery</span>
                                    <span className="text-sm font-bold font-mono">₦{rates.mixingMastering.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-4">
                                <span className="text-[10px] uppercase opacity-40 text-accent-yellow font-black">Total Amount</span>
                                <span className="text-xl font-bold text-accent-yellow">₦{calculateTotal().toLocaleString()}.00</span>
                            </div>
                        </div>

                        <p className="text-[10px] uppercase tracking-widest opacity-30 leading-loose">
                            By clicking confirm, you agree to our studio terms. Payment will be processed after confirmation.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <button type="button" onClick={handleBack} className="flex-1 py-4 border border-white/10 text-xs tracking-[0.3em] uppercase hover:bg-white/5 transition-colors">
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] py-4 bg-accent-yellow text-white text-xs tracking-[0.3em] uppercase font-bold hover:bg-white hover:text-black transition-all disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Confirm Request'}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
