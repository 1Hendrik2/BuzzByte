import React from "react";

interface PaginationProps {
    currentPage: number;
    articlesPerPage: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, articlesPerPage, totalResults, onPageChange }) => {

    const totalPages = Math.ceil(totalResults / articlesPerPage);

    const maxPagesToShow = 5;

    const getPageNumbersToShow = (): number[] => {
        if (totalPages <= maxPagesToShow) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            let startPage = Math.max(Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1), 1);
            return Array.from({ length: maxPagesToShow }, (_, index) => startPage + index);
        }
    };

    const pageNumbersToShow = getPageNumbersToShow();

    return (
        <nav>
            <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-white border hover:bg-indigo-700 bg-indigo-400 border-gray-700 rounded-l-lg"
                    >
                        Previous
                    </button>
                </li>
                {pageNumbersToShow.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight text-white border hover:bg-indigo-700 ${currentPage === pageNumber ? 'bg-blue-950' : 'bg-indigo-400'} border-gray-700`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-white border hover:bg-indigo-700 bg-indigo-400 border-gray-700 rounded-r-lg"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;