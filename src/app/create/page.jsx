'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '@/store/employeeSlice';
import CustomDatePicker from '@/components/DatePicker/DatePicker';
import Dropdown from '@/components/Dropdown/Dropdown';
import Modal from '@/components/Modal/Modal';
import states from '@/data/states';
import departments from '@/data/departments';

const employeeSchema = yup.object().shape({
    firstName: yup.string().required('Le prénom est requis'),
    lastName: yup.string().required('Le nom est requis'),
    dateOfBirth: yup.date().nullable().typeError('Veuillez entrer une date valide').required('La date de naissance est requise'),
    startDate: yup.date().nullable().typeError('Veuillez entrer une date valide').required("La date d'embauche est requise"),
    street: yup.string().required("L'adresse est requise"),
    city: yup.string().required('La ville est requise'),
    state: yup.string().required("L'état est requis"),
    zipCode: yup
        .string()
        .matches(/^[0-9]{5}$/, 'Code postal invalide')
        .required('Le code postal est requis'),
    department: yup.string().required('Le département est requis'),
});

export default function CreateEmployeePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employeeSchema),
    });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            dateOfBirth: data.dateOfBirth?.toISOString().split('T')[0],
            startDate: data.startDate?.toISOString().split('T')[0],
        };
        dispatch(addEmployee(formattedData));
        setIsModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => router.push('/list'), 100);
    }, [router]);

    return (
        <div className="w-full mx-2 md:max-w-lg md:mx-auto lg:max-w-xl mt-6 p-4 md:p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-lg sm:text-2xl font-bold text-center text-[#5a6f07]">Créer un employé</h1>
            <form className="mt-4 space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Prénom
                    </label>
                    <input
                        id="firstName"
                        {...register('firstName')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'firstNameError' : undefined}
                    />
                    {errors.firstName && (
                        <p id="firstNameError" className="text-red-500 text-sm" role="alert">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nom
                    </label>
                    <input
                        id="lastName"
                        {...register('lastName')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? 'lastNameError' : undefined}
                    />
                    {errors.lastName && (
                        <p id="lastNameError" className="text-red-500 text-sm" role="alert">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>

                <CustomDatePicker name="dateOfBirth" label="Date de naissance" control={control} error={errors.dateOfBirth?.message} />

                <CustomDatePicker name="startDate" label="Date d'embauche" control={control} error={errors.startDate?.message} />

                <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                        Rue
                    </label>
                    <input
                        id="street"
                        {...register('street')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={!!errors.street}
                        aria-describedby={errors.street ? 'streetError' : undefined}
                    />
                    {errors.street && (
                        <p id="streetError" className="text-red-500 text-sm" role="alert">
                            {errors.street.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Ville
                    </label>
                    <input
                        id="city"
                        {...register('city')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'cityError' : undefined}
                    />
                    {errors.city && (
                        <p id="cityError" className="text-red-500 text-sm" role="alert">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                <Dropdown
                    name="state"
                    label="État"
                    options={[{ value: '', label: 'Choisir un État' }, ...states.map((state) => ({ value: state.abbreviation, label: state.name }))]}
                    control={control}
                    error={errors.state?.message}
                />

                <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        Code postal
                    </label>
                    <input
                        id="zipCode"
                        {...register('zipCode')}
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        aria-invalid={!!errors.zipCode}
                        aria-describedby={errors.zipCode ? 'zipCodeError' : undefined}
                    />
                    {errors.zipCode && (
                        <p id="zipCodeError" className="text-red-500 text-sm" role="alert">
                            {errors.zipCode.message}
                        </p>
                    )}
                </div>

                <Dropdown
                    name="department"
                    label="Département"
                    options={[{ value: '', label: 'Choisir un département' }, ...departments.map((dep) => ({ value: dep.name, label: dep.name }))]}
                    control={control}
                    error={errors.department?.message}
                />

                <button type="submit" className="w-full bg-[#5a6f07] text-white py-2 rounded hover:bg-[#4e5d06] lg:cursor-pointer transition duration-300 ease-in-out">
                    Sauvegarder
                </button>
            </form>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} message="Employé ajouté avec succès !" />
        </div>
    );
}
