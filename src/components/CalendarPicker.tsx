'use client';

import React, { useState, useEffect } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    isBefore,
    startOfDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarPickerProps {
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    bookings?: Array<{ bookingDate: string }>;
    minDate?: Date;
    label?: string;
    className?: string;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
    selectedDate,
    onSelect,
    bookings = [],
    minDate = startOfDay(new Date()),
    label = "Select Date",
    className = ""
}) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
    const [isOpen, setIsOpen] = useState(false);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const onDateClick = (day: Date) => {
        onSelect(day);
        setIsOpen(false);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-white/10">
                <button
                    onClick={(e) => { e.preventDefault(); prevMonth(); }}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold uppercase tracking-widest text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button
                    onClick={(e) => { e.preventDefault(); nextMonth(); }}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 mb-2 border-b border-white/5 bg-black/50">
                {days.map((day) => (
                    <div key={day} className="py-2 text-[10px] font-bold text-center uppercase tracking-tighter text-white/40">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        const days = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className="grid grid-cols-7 gap-px bg-white/5 p-px">
                {days.map((day, idx) => {
                    const isDisabled = isBefore(day, minDate);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const hasBooking = bookings.some(b => isSameDay(new Date(b.bookingDate), day));

                    return (
                        <button
                            key={idx}
                            disabled={isDisabled}
                            onClick={(e) => { e.preventDefault(); if (!isDisabled) onDateClick(day); }}
                            className={`
                relative h-12 flex items-center justify-center text-xs transition-all duration-200
                ${!isCurrentMonth ? 'text-white/20' : 'text-white'}
                ${isDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-accent-yellow hover:text-black cursor-pointer'}
                ${isSelected ? 'bg-accent-yellow text-black font-bold' : 'bg-black'}
              `}
                        >
                            <span className="relative z-10">{format(day, 'd')}</span>
                            {hasBooking && !isSelected && (
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" title="Existing Bookings" />
                            )}
                            {isSameDay(day, new Date()) && !isSelected && (
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-yellow rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`relative ${className}`}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 ml-1">
                {label}
            </label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-accent-yellow/50 transition-colors group"
            >
                <span className={selectedDate ? 'text-white' : 'text-white/30'}>
                    {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                </span>
                <CalendarIcon className={`w-5 h-5 transition-colors ${isOpen ? 'text-accent-yellow' : 'text-white/30 group-hover:text-white/60'}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="absolute left-0 right-0 mt-2 z-50 bg-black border border-white/10 shadow-2xl overflow-hidden max-w-[320px] mx-auto md:mx-0"
                        >
                            {renderHeader()}
                            <div className="p-2">
                                {renderDays()}
                                {renderCells()}
                            </div>
                            <div className="p-4 bg-black/90 border-t border-white/10 flex justify-end">
                                <button
                                    onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                                    className="text-[10px] uppercase tracking-widest font-bold text-accent-yellow hover:text-white transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
