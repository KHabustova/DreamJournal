import { useEffect, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import ReturnButton from "./ReturnButton";
import { useParams } from "react-router";

function ViewEntryPage(){
    const [load, isLoading] = useState(true);
    const [failed, isFailed] = useState(false);
    const [entry, setEntry]=useState(null);
    const {id} = useParams()

    useEffect(() => async function LoadEntry(){
        try {
            const data = await APIRequestsHandler.fetchEntryByID(id);
            setEntry(data);
            isLoading(false);}
        catch(error){
            console.log("Error fetching entry!", error);
            isLoading(false);
            isFailed(true);
        }
        

    }, [id])

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
            <h1>{entry.title}</h1>
            <h3>Created : {entry.creationDate}</h3>
            <p>{entry.body}</p>
            <ReturnButton/>
        </div>
    )
}

export default ViewEntryPage;

