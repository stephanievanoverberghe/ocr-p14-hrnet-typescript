'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Dropdown from 'components/Dropdown/Dropdown';
import EmployeeCards from 'components/EmployeeCards/EmployeeCards';
import Pagination from 'components/Pagination/Pagination';
import Table from 'components/Table/Table';
import type { EmployeeFormData } from 'types/employee';

interface EmployeeListProps {
    initialEmployees: EmployeeFormData[];
}

type SearchForm = { searchTerm: string };

export default function EmployeeList({ initialEmployees }: EmployeeListProps) {
    const [mergedEmployees, setMergedEmployees] = useState<EmployeeFormData[]>(initialEmployees ?? []);
    const [employeesPerPage, setEmployeesPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { control, setValue, watch } = useForm<SearchForm>({
        defaultValues: { searchTerm: '' },
    });

    const searchTerm = watch('searchTerm');

    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            const parsed: EmployeeFormData[] = JSON.parse(storedEmployees);
            setMergedEmployees([...parsed, ...initialEmployees]);
        }
    }, [initialEmployees]);

    const filteredEmployees =
        searchTerm.length >= 2
            ? mergedEmployees.filter((employee) => Object.values(employee).some((value) => typeof value === 'string' && value.toLowerCase().startsWith(searchTerm.toLowerCase())))
            : mergedEmployees;

    const indexOfLast = currentPage * employeesPerPage;
    const indexOfFirst = indexOfLast - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
    const totalEmployees = filteredEmployees.length;

    return (
        <div className="lg:max-w-7xl mx-auto mt-6 p-4 w-full">
            <h1 className="text-2xl font-bold text-center text-[#5a6f07] mb-4">Liste des employés</h1>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                <Dropdown
                    name="employeesPerPage"
                    label="Afficher par"
                    options={[
                        { value: 10, label: '10' },
                        { value: 25, label: '25' },
                        { value: 50, label: '50' },
                        { value: 100, label: '100' },
                    ]}
                    control={control}
                    error={null}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setEmployeesPerPage(value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-auto"
                    isEmployeeListPage
                />
                <Controller
                    name="searchTerm"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Rechercher un employé..."
                            className="md:w-1/3 p-2 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                            onChange={(e) => setValue('searchTerm', e.target.value)}
                        />
                    )}
                />
            </div>

            <div className="mt-4 text-center text-sm text-gray-500" aria-live="polite">
                {totalEmployees > 0 ? `Affichage de ${indexOfFirst + 1} à ${Math.min(indexOfLast, totalEmployees)} sur ${totalEmployees} employés` : 'Aucun employé trouvé'}
            </div>

            <EmployeeCards employees={currentEmployees} />
            <div className="mt-6 lg:block overflow-x-auto text-sm">
                <Table data={currentEmployees} />
            </div>
            <Pagination totalEmployees={totalEmployees} employeesPerPage={employeesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
