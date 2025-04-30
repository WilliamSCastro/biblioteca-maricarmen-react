import React from 'react';
import TimeAgo from '../utils/Timeago'; // Asegúrate de importar correctamente

const RentalTable = ({ rentals }) => {

    const getStatus = (deliveryDate) => {
        const today = new Date();
        const delivery = new Date(deliveryDate);
        return delivery < today ? 'Finalitzat' : 'En procés';
    };

    return (
        <table className='catalogTable'>
            <thead>
                <tr>
                    <th>Títol</th>
                    <th>Data Préstec</th>
                    <th>Data Entrega</th>
                    <th>Estat</th>
                </tr>
            </thead>
            <tbody>
                {rentals.map((rental, index) => {
                    const status = getStatus(rental.data_retorn);
                    return (
                        <tr key={index} className={status === 'En procés' ? 'in-progress' : ''}>
                            <td>{rental.cataleg_titol}</td>
                            <td>
                                {new Date(rental.data_prestec).toLocaleDateString()}{' '}
                                <TimeAgo timestamp={rental.data_prestec} />
                            </td>
                            <td>
                                {rental.data_retorn
                                    ? <>
                                        {new Date(rental.data_retorn).toLocaleDateString()}{' '}
                                        <TimeAgo timestamp={rental.data_retorn} />
                                      </>
                                    : 'No retornat'}
                            </td>
                            <td>{status}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default RentalTable;