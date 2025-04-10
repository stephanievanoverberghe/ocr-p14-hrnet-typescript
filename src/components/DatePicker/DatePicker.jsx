'use client';

import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

function CustomDatePicker({ name, label, control, error }) {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                className="w-full"
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        id={name}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="MM/dd/yyyy"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${name}Error` : undefined}
                        role="textbox"
                    />
                )}
            />
            {error && (
                <p id={`${name}Error`} className="text-red-500 text-sm" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

// Définition des PropTypes
CustomDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default CustomDatePicker;
