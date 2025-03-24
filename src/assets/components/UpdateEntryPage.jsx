import { useState, useEffect } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import MoodDropdown from "./MoodDropdown";
import ReturnButton from "./ReturnButton";
import { useParams } from "react-router";

function UpdateEntryPage(){
    let [title, setTitle] = useState("");
    let [body, setBody] = useState("");
    let [mood, setMood] = useState("NEUTRAL");
    let [originalEntry, setOriginalEntry] = useState(null);
    let [success, setSuccess] = useState(false);
    let [failure, setFailure] = useState(false);
    let [loading, setLoading] = useState(true);
    const {id} = useParams()

    

    useEffect(() => {
        async function fetchEntry() {
            try {
                const existingEntry = await APIRequestsHandler.fetchEntryByID(id);
                setTitle(existingEntry.title);
                setBody(existingEntry.body);
                setMood(existingEntry.mood);
                setOriginalEntry(existingEntry);
            } catch (error) {
                console.error("Error fetching entry:", error);
            }finally {
                setLoading(false);
            }
        }
        fetchEntry();
    }, [id]);  

    const updateEntry = (e) => {
        e.preventDefault();
        const entryUpdated = {title, body, mood};
        APIRequestsHandler.updateEntry(id, entryUpdated).then(() => {
            setSuccess(true);
            console.log(entryUpdated);
        }).catch((error) => {
            console.log("Error updating the entry!", error);
            console.log(entryUpdated);
            setFailure(true);
        })

    }

    if (loading) {
        return (
            <div>
                <h1>
                    Loading!
                </h1>
            </div>
        )
    }

    return (
        <div>
            <ReturnButton className="m-4"/>
            <h1>New Entry</h1>

            <form  onSubmit={updateEntry}>
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
                <input type="submit" value="Update"/>
            </form>
            <div>
        {success ? (
            <div>
                <h2>Updated Successfully!</h2>
            </div>
        ) : failure ? (
            <div>
                <h2>Failed to update. Please try again.</h2>
            </div>
        ) : null}
    </div>

        </div>
    )
}


export default UpdateEntryPage;

