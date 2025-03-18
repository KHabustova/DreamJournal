import React from "react";
import { useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";
import ReturnButton from "./ReturnButton";
import { Listbox } from '@headlessui/react'

function NewEntryPage(){
    let [title, setTitle] = useState("");
    let [body, setBody] = useState("");
    let [mood, setMood] = useState("NEUTRAL");
    let [creationDate, setCreationDate] = useState();


    const saveEntry = (e) => {
        e.preventDefault();
        const entry = {title, body, mood};
        
        }
    };

    return (
        <div>
            <h1>New Entry</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Enter title"   value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Content</label>
                    <input id="body" type="text" placeholder="Enter text" value={body} onChange={(e) => setBody(e.currentTarget.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="mood">Mood</label>
                    <MoodDropdown id="mood" selectedMood={mood} setSelectedMood={setMood} value={mood}/>
                </div>
                <input type="submit" value="Create"/>
            </form>
            <ReturnButton/>
        </div>
    )
}

export default NewEntryPage;