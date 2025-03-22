import React from "react";
import { useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";
import ReturnButton from "./ReturnButton";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function NewEntryPage(){
    let [title, setTitle] = useState("");
    let [body, setBody] = useState("");
    let [mood, setMood] = useState("NEUTRAL");
    let [creationDate, setCreationDate] = useState();
    const navigate = useNavigate();

    const saveEntry = (e) => {
        e.preventDefault();
        let currentDate = format(new Date(), 'dd.MM.yyyy');
        setCreationDate(currentDate);
        const entry = {title, body, mood, creationDate};
        APIRequestsHandler.createEntry(entry).then(()=>{
            navigate("/");
        }).catch((error) => {
            console.error("Error creating entry:", error);
        });
        }


    return (
        <div>
            <ReturnButton className="m-4"/>
            <h1>New Entry</h1>

            <form  onSubmit={saveEntry}>
                <div className="form-group" >
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
                <hr/>
                <input type="submit" value="Create"/>
            </form>

        </div>
    )
}

export default NewEntryPage;