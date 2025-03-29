import React, { useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";
import ReturnButton from "./ReturnButton";
import { useNavigate } from 'react-router-dom';
import TextEditor from "./TextEditor";

function NewEntryPage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState("NEUTRAL");
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const navigate = useNavigate();

    const saveEntry = (e) => {
        e.preventDefault();
        const entry = { title: title.trim(), body: body.trim(), mood };

        APIRequestsHandler.createEntry(entry)
            .then(() => {
                setSuccess(true);
                setFailure(false);
                setTimeout(() => navigate("/"), 1000);
            })
            .catch((error) => {
                console.error("Error creating entry:", error);
                setFailure(true);
                setSuccess(false);
            });
    };

    return (
        <div>
            <ReturnButton className="m-4" />
            <h1>New Entry</h1>

            <form onSubmit={saveEntry}>
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
                <input type="submit" value="Create" disabled={!title.trim() || !body.trim()} />
            </form>

            {success && <h2>Entry Created Successfully!</h2>}
            {failure && <h2>Failed to create entry. Please try again.</h2>}
        </div>
    );
}

export default NewEntryPage;