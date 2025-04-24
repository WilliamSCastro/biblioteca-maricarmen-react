import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null; // No mostrar el paginador si solo hay una página

    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;