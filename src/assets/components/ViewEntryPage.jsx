import { useEffect, useRef, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import ReturnButton from "./ReturnButton";

function ViewEntryPage({id}){
    let [load, isLoading] = useState(true);
    let [failed, isFailed] = useState(false);
    const entryRef=useRef(null);

    useEffect(() => async function LoadEntry(){
        try {
            const data = await APIRequestsHandler.fetchEntryByID(id);
            entryRef.current = data;
            isLoading(false);}
        catch(error){
            console.log("Error fetching entry!", error);
            isLoading(false);
            isFailed(true);
        
        }

    }, [])

    if (load) {
        return (
            <div>
                <h1>Loading Entry!</h1>
            </div>
        )
    }

    if(failed) {
        return (
            <div>
            <h1>The entry failed to load!</h1>
            <ReturnButton/>
            </div>
        )
    }

    return (
        <div>
            <h1>{entryRef.title}</h1>
            <h3>Created : {entryRef.creationDate}</h3>
            <p>{entryRef.body}</p>

        </div>
    )
}

export default ViewEntryPage;

