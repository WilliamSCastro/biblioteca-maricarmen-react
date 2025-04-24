import React, { useEffect, useState } from 'react';
import { fetchRentalHistory } from '../../services/api';
import { useUserContext } from '../../store/UserProvider';
import RentalTable from './RentalTable';
import Pagination from '../utils/Pagination';

const RentalHistory = () => {
    const { user, isLoadingUserData } = useUserContext(); // Obtener el usuario desde el contexto
    const [rentals, setRentals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Obtener el token desde localStorage
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (!user || !user.id) return; // Esperar a que el usuario esté disponible

        const fetchData = async () => {
            const result = await fetchRentalHistory(user.id, token);
            if (result.success) {
                setRentals(result.data);
            } else {
                console.error("Error fetching rental history:", result.error);
            }
        };

        fetchData();
    }, [user, token]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRentals = rentals.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(rentals.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoadingUserData) {
        return <p>Carregant informació de l'usuari...</p>;
    }

    if (!user) {
        return <p>No s'ha pogut carregar la informació de l'usuari.</p>;
    }

    return (
        <div>
            <h2>Historial de Préstecs</h2>
            <RentalTable rentals={currentRentals} />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default RentalHistory;