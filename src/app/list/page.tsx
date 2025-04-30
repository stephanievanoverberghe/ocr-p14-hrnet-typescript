/**
 * Page de liste des employés.
 *
 * Charge les données initiales depuis un fichier JSON local (public/data/employees.json),
 * puis les passe au composant EmployeeList pour affichage avec tri et pagination.
 */

import fs from 'fs/promises';
import path from 'path';
import EmployeeList from 'components/EmployeeList/EmployeeList';
import type { EmployeeFormData } from 'types/employeeFormData';

export default async function ListPage() {
    const filePath = path.join(process.cwd(), 'public/data/employees.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonEmployees = JSON.parse(fileContent) as EmployeeFormData[];

    return <EmployeeList initialEmployees={jsonEmployees} />;
}
