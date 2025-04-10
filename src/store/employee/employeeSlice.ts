import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EmployeeFormData } from 'types/employee';

interface EmployeeState {
    employees: EmployeeFormData[];
}

const initialState: EmployeeState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<EmployeeFormData>) => {
            state.employees.push(action.payload);
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
