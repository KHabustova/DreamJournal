import { useState, useEffect } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";
import ReturnButton from "./ReturnButton";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import TextEditor from "./TextEditor";

function UpdateEntryPage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState("NEUTRAL");
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();


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

    const updateEntry = (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedBody = body.trim();

        if (!trimmedTitle || !trimmedBody) return;

        const entryUpdated = { title: trimmedTitle, body: trimmedBody, mood };

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

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <ReturnButton className="m-4" />
            <h1>Update Entry</h1>

            <form onSubmit={updateEntry}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Content</label>
                    <TextEditor body={body} setBody={setBody} />
                </div>
                <div className="form-group">
                    <label htmlFor="mood">Mood</label>
                    <MoodDropdown id="mood" selectedMood={mood} setSelectedMood={setMood} />
                </div>
                <hr />
                <input type="submit" value="Update" disabled={!title.trim() || !body.trim()} />
            </form>

            {success && <h2>Updated Successfully!</h2>}
            {failure && <h2>Failed to update. Please try again.</h2>}
        </div>
    );
}

export default UpdateEntryPage;