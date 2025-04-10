'use client';

import { Controller, Control, FieldValues, ControllerRenderProps } from 'react-hook-form';

interface Option {
    value: string | number;
    label: string;
}

interface DropdownProps {
    name: string;
    label: string;
    options: Option[];
    control: Control<FieldValues>;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isEmployeeListPage: boolean;
}

const Dropdown = ({ name, label, options, control, error, onChange, isEmployeeListPage }: DropdownProps) => {
    return (
        <div className={`w-full ${isEmployeeListPage ? 'md:w-48' : ''}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
                    <select
                        {...field}
                        id={name}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) onChange(e);
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
};

export default Dropdown;
