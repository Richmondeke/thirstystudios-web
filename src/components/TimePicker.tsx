'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimePickerProps {
    startTime: string; // "HH:mm"
    duration: number; // in hours
    onStartTimeChange: (time: string) => void;
    onDurationChange: (duration: number) => void;
    bookings?: any[];
    selectedDate?: Date | null;
    label?: string;
    className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    startTime,
    duration,
    onStartTimeChange,
    onDurationChange,
    bookings = [],
    selectedDate = null,
    label = "Select Time",
    className = ""
}) => {
    const times = [];
    for (let i = 8; i <= 22; i++) {
        const hour = i.toString().padStart(2, '0');
        times.push(`${hour}:00`);
        if (i < 22) times.push(`${hour}:30`);
    }

    const durations = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

    const isTimeOccupied = (time: string) => {
        if (!selectedDate) return false;
        const selectedDateStr = selectedDate.toISOString().split('T')[0];
        const [h, m] = time.split(':').map(Number);
        const totalMinutes = h * 60 + m;

        return bookings.some(booking => {
            const bookingDateStr = new Date(booking.bookingDate).toISOString().split('T')[0];
            if (bookingDateStr !== selectedDateStr) return false;

            const [bStartH, bStartM] = booking.startTime.split(':').map(Number);
            const bStartTotal = bStartH * 60 + bStartM;
            const bEndTotal = bStartTotal + booking.hours * 60;

            // Simple check: is this start time within an existing booking?
            return totalMinutes >= bStartTotal && totalMinutes < bEndTotal;
        });
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 ml-1">
                {label}
            </label>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-widest text-white/30 ml-1">Start Time</label>
                    <div className="relative">
                        <select
                            value={startTime}
                            onChange={(e) => onStartTimeChange(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm focus:border-accent-yellow outline-none transition-colors appearance-none"
                        >
                            {times.map(t => {
                                const occupied = isTimeOccupied(t);
                                return (
                                    <option key={t} value={t} className="bg-black" disabled={occupied}>
                                        {t} {occupied ? '(Booked)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-widest text-white/30 ml-1">Duration</label>
                    <select
                        value={duration}
                        onChange={(e) => onDurationChange(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent-yellow outline-none transition-colors appearance-none"
                    >
                        {durations.map(d => (
                            <option key={d} value={d} className="bg-black">{d} {d === 1 ? 'Hour' : 'Hours'}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="p-4 bg-accent-yellow/5 border border-accent-yellow/10 rounded">
                <p className="text-[10px] uppercase tracking-widest text-white/60">
                    Session: <span className="text-accent-yellow font-bold">{startTime}</span> — <span className="text-accent-yellow font-bold">{calculateEndTime(startTime, duration)}</span>
                </p>
            </div>
        </div>
    );
};

function calculateEndTime(start: string, duration: number): string {
    const [h, m] = start.split(':').map(Number);
    const totalMinutes = h * 60 + m + duration * 60;
    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
}
