import React from "react";
import { useState } from "react";

function NewEntryPage(){
    let [title, setTitle] = useState("");
    let [body, setBody] = useState("");
    let [mood, setMood] = useState(HAPPY);
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
                
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Username"/>
                </div>
                <input type="submit" value="Submit">Create</input>
            </form>
        </div>
    )
}

export default NewEntryPage;