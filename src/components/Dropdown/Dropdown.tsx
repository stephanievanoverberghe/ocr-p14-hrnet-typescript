'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

interface Option {
    value: string | number;
    label: string;
}

interface DropdownProps<T extends FieldValues> {
    name: FieldPath<T>;
    label: string;
    options: Option[];
    control: Control<T>;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isEmployeeListPage: boolean;
    className?: string;
}

function Dropdown<T extends FieldValues>({ name, label, options, control, error, onChange, isEmployeeListPage, className = '' }: DropdownProps<T>) {
    return (
        <div className={`w-full ${isEmployeeListPage ? 'md:w-48' : ''} ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        id={name}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e);
                        }}
                    >
                        {options.map((option) => (
                            <option key={option.value.toString()} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default Dropdown;
