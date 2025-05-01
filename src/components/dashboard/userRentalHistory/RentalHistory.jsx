import React, { useEffect, useState } from 'react';
import { fetchRentalHistory } from '../../../services/api';
import { useUserContext } from '../../../store/UserProvider';
import RentalTable from './RentalTable';
import Pagination from '../../utils/Pagination';
import Modal from '../../utils/Modal'; // Importar el componente Modal

const RentalHistory = () => {
    const { user, isLoadingUserData } = useUserContext(); // Obtener el usuario desde el contexto
    const [rentals, setRentals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
    const itemsPerPage = 8;

    // Obtener el token desde localStorage
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (!user || !user.id) return; // Esperar a que el usuario esté disponible

        const fetchData = async () => {
            setIsLoading(true); // Mostrar el modal de carga
            const result = await fetchRentalHistory(user.id, token);
            if (result.success) {
                setRentals(result.data);
            } else {
                console.error("Error fetching rental history:", result.error);
            }
            setIsLoading(false); // Ocultar el modal de carga
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

    // Renderizar el contenido según el estado
    let content;

    if (isLoading || isLoadingUserData) {
        content = (
            <Modal isOpen={isLoading || isLoadingUserData}>
                <p>Carregant dades...</p> {/* Mensaje dentro del modal */}
            </Modal>
        );
    } else if (!rentals || rentals.length === 0) {
        content = (
            <div id="welcome-dashboard">
                <h2>Historial de Préstecs</h2>
                <p>No hi ha préstecs disponibles.</p>
            </div>
        );
    } else {
        content = (
            <>
                <div id="title-box">
                    <h2>Historial de Préstecs</h2>
                </div>
                <RentalTable rentals={currentRentals} />
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    }

    return <section id="user-profile">{content}</section>;
};

export default RentalHistory;