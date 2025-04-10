'use client';

import { Controller, Control, FieldValues } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
    name: string;
    label: string;
    control: Control<FieldValues>;
    error?: string;
}

const CustomDatePicker = ({ name, label, control, error }: CustomDatePickerProps) => {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        id={name}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="MM/dd/yyyy"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={!!error}
                        aria-describedby={error ? `${name}Error` : undefined}
                    />
                )}
            />
            {error && (
                <p id={`${name}Error`} className="text-red-500 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default CustomDatePicker;
