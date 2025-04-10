'use client';

interface PaginationProps {
    totalEmployees: number;
    employeesPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

const Pagination = ({ totalEmployees, employeesPerPage, currentPage, setCurrentPage }: PaginationProps) => {
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);

    if (totalPages <= 1) return null;

    const maxVisiblePages = 3;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(currentPage + halfVisiblePages, totalPages);

    if (currentPage - halfVisiblePages < 1) {
        endPage = Math.min(maxVisiblePages, totalPages);
    } else if (currentPage + halfVisiblePages > totalPages) {
        startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
    }

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex justify-center mt-4 space-x-2" role="navigation" aria-label="Pagination">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                aria-label="Page précédente"
            >
                <i className="fa-solid fa-angles-left"></i>
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                <button
                    key={page}
                    onClick={() => handleClick(page)}
                    className={`px-3 py-1 border rounded transition ${currentPage === page ? 'bg-[#5a6f07] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                aria-label="Page suivante"
            >
                <i className="fa-solid fa-angles-right"></i>
            </button>
        </div>
    );
};

export default Pagination;
