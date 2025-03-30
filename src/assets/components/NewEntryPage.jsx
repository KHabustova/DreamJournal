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
        const entry = { title: title.trim(), body: body, mood };

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
        <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
            {success && <h2 className="text-green-600">Entry Created Successfully!</h2>}
            {failure && <h2 className="text-red-600">Failed to create entry. Please try again.</h2>}
    
            <h1 className="text-2xl text-violet-600 font-bold">New Entry</h1>
            <hr />
            <form onSubmit={saveEntry} className="space-y-6">
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
                    value="Create"
                    disabled={!title.trim() || !body.trim()}
                    className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-lg cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                />
            </form>
            <ReturnButton className="mt-4" />
        </div>
    );
}

export default NewEntryPage;