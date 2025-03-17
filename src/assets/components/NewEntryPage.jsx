import React from "react";
import { useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";

function NewEntryPage(){
    let [title, setTitle] = useState("");
    let [body, setBody] = useState("");
    let [mood, setMood] = useState("NEUTRAL");
    let [creationDate, setCreationDate] = useState();


    

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Username"/>
                </div>
                <div>
                    <label htmlFor="body">Content</label>
                    <input id="body" type="text" placeholder="Enter text"/>
                </div>
                    <label htmlFor="mood">Mood</label>
                    <MoodDropdown id="mood" selectedMood={mood} setSelectedMood={setMood}/>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Username"/>
                </div>
                <input type="submit" value="Submit">Create</input>
            </form>
        </div>
    )
}

export default MoodDropdown;