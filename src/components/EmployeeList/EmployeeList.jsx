'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table/Table';
import EmployeeCards from '@/components/EmployeeCards/EmployeeCards';
import Pagination from '@/components/Pagination/Pagination';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useForm, Controller } from 'react-hook-form';

export default function EmployeeList({ initialEmployees }) {
    const [mergedEmployees, setMergedEmployees] = useState(initialEmployees || []);
    const [employeesPerPage, setEmployeesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { control, setValue, watch } = useForm();
    const searchTerm = watch('searchTerm', '');

    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            const parsed = JSON.parse(storedEmployees);
            // Merge en mettant les nouveaux d'abord
            setMergedEmployees([...parsed, ...initialEmployees]);
        }
    }, [initialEmployees]);

    const filteredEmployees =
        searchTerm.length >= 2
            ? mergedEmployees.filter((employee) => {
                  const term = searchTerm.toLowerCase();
                  return Object.values(employee).some((value) => value.toLowerCase().startsWith(term));
              })
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
                    isEmployeeListPage={true}
                />
                <Controller
                    name="searchTerm"
                    control={control}
                    defaultValue=""
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
            <Pagination totalEmployees={filteredEmployees.length} employeesPerPage={employeesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
