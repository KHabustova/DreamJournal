import { useState, useEffect } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";
import ReturnButton from "./ReturnButton";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";

/**
 * Facilitates updating an existing journal entry.
 * It fetches the entry data by ID, pre-fills the form, and handles the update process.
 * @component
 * @returns {JSX.Element} The rendered UpdateEntryPage component.
 */
function UpdateEntryPage() {
    // State to store the title of the entry
    const [title, setTitle] = useState("");

    // State to store the body content of the entry
    const [body, setBody] = useState("");

    // State to store the selected mood of the entry(defaults to Neutral in case Mood list fails to fetch)
    const [mood, setMood] = useState("NEUTRAL");

    // State to track whether the update was successful
    const [success, setSuccess] = useState(false);

    // State to track whether the update failed
    const [failure, setFailure] = useState(false);

    // State to track whether the entry is still loading
    const [loading, setLoading] = useState(true);

    // Extract the entry ID from the URL parameters
    const { id } = useParams();

    // Hook to navigate to other pages
    const navigate = useNavigate();

    /**
     * Fetches the journal entry by its ID.
     */
    useEffect(() => {
        async function fetchEntry() {
            try {
                const existingEntry = await APIRequestsHandler.fetchEntryByID(id);
                setTitle(existingEntry.title);
                setBody(existingEntry.body);
                setMood(existingEntry.mood);
            } catch (error) {
                console.error("Error fetching entry:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEntry();
    }, [id]);

    /**
     * Handles the form submission to update the journal entry.
     * Validates the input and sends the updated data to the backend.
     * 
     * @param {Event} e - The form submission event.
     */
    const updateEntry = (e) => {
        e.preventDefault();

        if (title.trim().length === 0 || body.trim().length === 0) return;

        const entryUpdated = { title: title.trim(), body: body, mood };

        APIRequestsHandler.updateEntry(id, entryUpdated)
            .then(() => {
                setSuccess(true);
                setFailure(false);
                setTimeout(() => navigate("/"), 2000);
            })
            .catch((error) => {
                console.error("Error updating the entry!", error);
                setFailure(true);
                setSuccess(false);
            });
    };

    // Render a loading message while the entry is being fetched
    if (loading) {
        return <h1 className="text-center text-xl font-bold">Loading...</h1>;
    }

    // Render the form to update the journal entry
    return (
        <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
            <h1 className="text-2xl text-violet-600 font-bold">Update Entry</h1>
            <hr />
            <form onSubmit={updateEntry} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="body" className="font-medium">Content</label>
                    <TextEditor body={body} setBody={setBody} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="mood" className="font-medium">Mood</label>
                    <MoodDropdown id="mood" selectedMood={mood} setSelectedMood={setMood} />
                </div>
                <hr />
                <input
                    type="submit"
                    value="Update"
                    disabled={!title.trim() || !body.trim()}
                    className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-lg cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                />
            </form>
            <ReturnButton className="mt-4" />
            {success && <h2 className="text-green-600">Updated Successfully!</h2>}
            {failure && <h2 className="text-red-600">Failed to update. Please try again.</h2>}
        </div>
    );
}

export default UpdateEntryPage;