import React, { useEffect, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import NewEntryButton from "./NewEntryButton";

function EntryList(){
    const [entries, setEntries] = useState([]);



    useEffect (() => {
        async function loadEntries (){
            try {
                const fetchedEntries = await APIRequestsHandler.getEntries();
                setEntries(fetchedEntries);
            } catch (error) {
                console.error("Failed to fetch the entries!", error);
            }
        }
        loadEntries();
    }, []);

    if (!entries || entries.length === 0) {
        return <div>Loading...</div>; 
      }

    return (
        <div className="p-4 outline-2 rounded-xl w-full">
            <div>
                <h1 className="text-3xl font-bold mb-4">Dream Journal</h1>
            </div>
            <div>
                <NewEntryButton/>
            </div>
            <div>
                <h2  className=" mb-2 text-2xl">Entries</h2>
                <ul>
                        {entries.map((entry) => (
                            <li  className="cursor-pointer text-violet-500 hover:underline border rounded-sm outline-2" key={entry.id}>{entry.title}</li>
                        )

                        )}
                    </ul>
            </div>
        </div>
)

}

export default EntryList;