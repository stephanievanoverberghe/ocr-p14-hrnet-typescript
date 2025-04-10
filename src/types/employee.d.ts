export interface EmployeeFormData {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    startDate: Date | null;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    department: string;
}
