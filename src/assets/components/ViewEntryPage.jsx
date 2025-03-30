import { useEffect, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import ReturnButton from "./ReturnButton";
import { useParams } from "react-router";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

function ViewEntryPage() {
    const [load, isLoading] = useState(true);
    const [failed, isFailed] = useState(false);
    const [entry, setEntry] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function LoadEntry() {
            try {
                const data = await APIRequestsHandler.fetchEntryByID(id);
                setEntry(data);
                isLoading(false);
            } catch (error) {
                console.log("Error fetching entry!", error);
                isLoading(false);
                isFailed(true);
            }
        }
        LoadEntry();
    }, [id]);

    if (load) {
        return (
            <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
                <h1 className="text-center text-xl font-bold">Loading Entry...</h1>
            </div>
        );
    }

    if (failed) {
        return (
            <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
                <h1 className="text-center text-xl font-bold text-red-600">The entry failed to load!</h1>
                <ReturnButton className="mt-4" />
            </div>
        );
    }

    return (
        <div className="py-12 flex flex-col gap-6 border border-gray-200 rounded-2xl max-w-4xl mx-auto bg-white shadow-md px-36">
            <h2 className="text-violet-400"> - {entry.mood} - </h2>
            <h1 className="text-2xl text-violet-600 font-bold">{entry.title}</h1>
            <div className="max-w-none">{parse(DOMPurify.sanitize(entry.body))}</div>
            <ReturnButton className="mt-4" />
            <h3 className="text-gray-500 text-sm self-end" >Created: {entry.creationDate}</h3>
        </div>
    );
}

export default ViewEntryPage;

