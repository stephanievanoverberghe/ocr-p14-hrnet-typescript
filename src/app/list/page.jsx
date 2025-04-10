import fs from 'fs/promises';
import path from 'path';
import EmployeeList from '@/components/EmployeeList/EmployeeList';

export default async function ListPage() {
    const filePath = path.join(process.cwd(), 'public/data/employees.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonEmployees = JSON.parse(fileContent);

    let storedEmployees = [];
    if (typeof window === 'undefined') {
        storedEmployees = [];
    }

    const employees = [...jsonEmployees, ...storedEmployees];

    return <EmployeeList initialEmployees={employees} />;
}
