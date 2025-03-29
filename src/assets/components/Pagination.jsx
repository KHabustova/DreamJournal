export default function Pagination({ pageAmount, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(pageAmount + 1).keys()].slice(1);

    function goToPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goToNextPage() {
        if (currentPage < pageAmount) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <nav className="flex justify-center mt-4">
                <ul className="flex list-none space-x-2">
                    <li>
                        <button
                            className={`px-4 py-2 border rounded-md ${
                                currentPage === 1
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-violet-500 hover:bg-violet-100 cursor-pointe"
                            }`}
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>

                    {pageNumbers.map((pgNumber) => (
                        <li key={pgNumber}>
                            <button
                                onClick={() => setCurrentPage(pgNumber)}
                                className={`px-4 py-2 border rounded-md ${
                                    currentPage === pgNumber
                                        ? "bg-violet-500 text-white"
                                        : "bg-white text-violet-500 hover:bg-violet-100 cursor-pointer"
                                }`}
                            >
                                {pgNumber}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            className={`px-4 py-2 border rounded-md ${
                                currentPage === pageAmount
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-violet-500 hover:bg-violet-100 cursor-pointer"
                            }`}
                            onClick={goToNextPage}
                            disabled={currentPage === pageAmount}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}