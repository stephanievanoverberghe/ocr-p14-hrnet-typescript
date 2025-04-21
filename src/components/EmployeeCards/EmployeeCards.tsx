'use client';

import type { EmployeeFormData } from 'types/employeeFormData';

interface EmployeeCardsProps {
    employees: EmployeeFormData[];
}

const EmployeeCards = ({ employees }: EmployeeCardsProps) => {
    return (
        <div className="mt-4 lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.length > 0 ? (
                employees.map((employee, index) => {
                    const dateOfBirth = employee.dateOfBirth ? new Date(employee.dateOfBirth) : null;
                    const startDate = employee.startDate ? new Date(employee.startDate) : null;

                    return (
                        <div key={`${employee.firstName}-${employee.lastName}-${index}`} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <p className="font-bold text-[#5a6f07] text-lg">
                                {employee.firstName} {employee.lastName}
                            </p>
                            <p className="text-gray-600">📅 Naissance : {dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Non spécifiée'}</p>
                            <p className="text-gray-600">📆 Embauche : {startDate ? startDate.toLocaleDateString() : 'Non spécifiée'}</p>
                            <p className="text-gray-600">🏢 {employee.department}</p>
                            <p className="text-gray-600">
                                📍 {employee.city}, {employee.state} ({employee.zipCode})
                            </p>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500 mt-4">Aucun employé trouvé.</p>
            )}
        </div>
    );
};

export default EmployeeCards;
