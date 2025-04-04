import React, { useEffect, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import NewEntryButton from "./NewEntryButton";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

/**
 * This component displays a paginated list of journal entries.
 * It allows users to view, edit, or delete entries and provides a button to create new entries.
 * 
 * @component
 * @returns {JSX.Element} The rendered EntryList component.
 */
function EntryList() {
    // Number of entries displayed per page
    const ENTRIES_PER_PAGE = 30;

    // State to store all journal entries fetched from the backend
    const [entries, setEntries] = useState([]);

    // State to store the entries displayed on the current page
    const [currentEntries, setCurrentEntries] = useState([]);

    // State to track whether the entries are still loading
    const [isLoading, setIsLoading] = useState(true);

    // State to track whether an entry was successfully deleted
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    // State to track whether deleting an entry failed
    const [deleteFailure, setDeleteFailure] = useState(false);

    // State to track the currently active page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages based on the number of entries
    const pageAmount = Math.ceil(entries.length / ENTRIES_PER_PAGE);

    // Calculate the index of the last entry on the current page
    const endIndex = currentPage * ENTRIES_PER_PAGE;

    // Calculate the index of the first entry on the current page
    const firstRecordIndex = endIndex - ENTRIES_PER_PAGE;

    /**
     * Fetches all journal entries from the backend when the component mounts
     * or when the pagination indices change.
     */
    useEffect(() => {
        async function loadEntries() {
            try {
                const fetchedEntries = await APIRequestsHandler.getEntries();
                setEntries(fetchedEntries);
                setCurrentEntries(fetchedEntries.slice(firstRecordIndex, endIndex));
            } catch (error) {
                console.error("Failed to fetch the entries!", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadEntries();
    }, [firstRecordIndex, endIndex]);

    /**
     * Deletes a journal entry by its ID.
     * Updates the entries state on success or shows an error message on failure.
     * 
     * @param {string} entryID - The ID of the entry to delete.
     */
    const deleteEntry = async (entryID) => {
        try {
            await APIRequestsHandler.deleteEntry(entryID);
            setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== entryID));
            setDeleteSuccess(true);
            setDeleteFailure(false);
            setTimeout(() => setDeleteSuccess(false), 3000);
        } catch (error) {
            console.error("Error deleting entry", error);
            setDeleteFailure(true);
            setDeleteSuccess(false);
            setTimeout(() => setDeleteFailure(false), 3000);
        }
    };
    /**
     * Renders loading screen while waiting for the data.
     */
    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    /**
     * Renders page if no entry had been found.
     */
    if (entries.length === 0) {
        return (
            <div className="text-center py-4">
                <p>No entries yet! Add your first one.</p>
                <NewEntryButton />
            </div>
        );
    }

    return (
        <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl w-full max-w-4xl mx-auto bg-white shadow-md px-36">
            <div>
                <h1 className="font-bold text-4xl text-violet-600 mb-6">Dream Journal</h1>
            </div>

            <div>
                {deleteSuccess && (
                    <div className="text-green-600 text-lg mb-4">
                        Entry deleted successfully!
                    </div>
                )}
                {deleteFailure && (
                    <div className="text-red-600 text-lg mb-4">
                        Failed to delete entry. Please try again.
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <ul className="space-y-6">
                    {currentEntries.map((entry) => (
                        <div key={entry.id} className="flex justify-between border-b pb-4">
                            <Link
                                to={`/entry/${entry.id}`}
                                className="cursor-pointer text-violet-500 hover:text-violet-700 hover:underline font-semibold text-xl"
                            >
                                {entry.title}
                            </Link>
                            <div className="flex gap-4 mt-2">
                                <Link
                                    to={`/entry/${entry.id}/edit`}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </Link>
                                <span
                                    onClick={() => deleteEntry(entry.id)}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                >
                                    Delete
                                </span>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <NewEntryButton />
            </div>
            <Pagination pageAmount={pageAmount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default EntryList;
