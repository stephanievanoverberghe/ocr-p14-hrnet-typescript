import fs from 'fs/promises';
import path from 'path';
import EmployeeList from 'components/EmployeeList/EmployeeList';
import type { EmployeeFormData } from 'types/employee';

export default async function ListPage() {
    const filePath = path.join(process.cwd(), 'public/data/employees.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonEmployees = JSON.parse(fileContent) as EmployeeFormData[];

    return <EmployeeList initialEmployees={jsonEmployees} />;
}
