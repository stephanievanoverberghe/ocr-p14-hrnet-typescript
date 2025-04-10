'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EmployeeFormData } from 'types/employee';

interface EmployeeState {
    employees: EmployeeFormData[];
}

const getStoredEmployees = (): EmployeeFormData[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : [];
};

const saveEmployees = (employees: EmployeeFormData[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('employees', JSON.stringify(employees));
    }
};

const initialState: EmployeeState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<EmployeeFormData>) => {
            state.employees.unshift(action.payload);
            const updatedEmployees = [action.payload, ...getStoredEmployees()];
            saveEmployees(updatedEmployees);
        },
        loadInitialEmployees: (state, action: PayloadAction<EmployeeFormData[]>) => {
            state.employees = action.payload;
        },
    },
});

export const { addEmployee, loadInitialEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
