import { useEffect, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import ReturnButton from "./ReturnButton";
import { useParams } from "react-router";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

/**
 * Fetches and displays the details of a specific journal entry.
 * Handles loading, error states, and sanitizes the entry's body content for safe rendering.
 * @component
 * @returns {JSX.Element} The rendered ViewEntryPage component.
 */
function ViewEntryPage() {
    // Tracks whether the entry is still loading
    const [load, isLoading] = useState(true);

    // Tracks whether the entry failed to load
    const [failed, isFailed] = useState(false);

    // Stores the fetched entry data
    const [entry, setEntry] = useState(null);

    // Extracts the entry ID from the URL parameters
    const { id } = useParams();

    /**
     * Fetches the journal entry by its ID.
     * Updates the `entry` state on success or sets the `failed` state on error.
     */
    useEffect(() => {
        async function LoadEntry() {
            try {
                const data = await APIRequestsHandler.fetchEntryByID(id);
                setEntry(data);
                isLoading(false);
            } catch (error) {
                console.error("Error fetching entry!", error);
                isLoading(false);
                isFailed(true);
            }
        }
        LoadEntry();
    }, [id]);

    // Render loading state
    if (load) {
        return (
            <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
                <h1 className="text-center text-xl font-bold">Loading Entry...</h1>
            </div>
        );
    }

    // Render error state
    if (failed) {
        return (
            <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
                <h1 className="text-center text-xl font-bold text-red-600">The entry failed to load!</h1>
                <ReturnButton className="mt-4" />
            </div>
        );
    }

    // Render the entry details
    return (
        <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
            <h2 className="text-violet-400"> - {entry.mood} - </h2>
            <h1 className="text-2xl text-violet-600 font-bold">{entry.title}</h1>
            <div className="max-w-none">{parse(DOMPurify.sanitize(entry.body))}</div>
            <ReturnButton className="mt-4" />
            <h3 className="text-gray-500 text-sm self-end">Created: {entry.creationDate}</h3>
        </div>
    );
}

export default ViewEntryPage;

