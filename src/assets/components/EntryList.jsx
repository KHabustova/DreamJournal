import React, { useEffect, useState } from "react";
import APIRequestsHandler from "../services/APIRequestsHandler";
import NewEntryButton from "./NewEntryButton";
import { Listbox } from '@headlessui/react';
import { Link } from "react-router-dom";

function EntryList(){
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        async function loadEntries (){
            try {
                const fetchedEntries = await APIRequestsHandler.getEntries();
                setEntries(fetchedEntries);
            } catch (error) {
                console.error("Failed to fetch the entries!", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadEntries();
    }, []);

    if (isLoading) {
        return <div>Is Loading...</div>; 
      }


      if (entries.length === 0) {
        return (
            <div className="no-entries-state">
                <p>No entries yet! Add your first one.</p>
                <NewEntryButton />
            </div>
        );
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