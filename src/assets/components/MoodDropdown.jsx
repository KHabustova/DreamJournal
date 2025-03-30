import React, { useState, useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import APIRequestsHandler from "../services/APIRequestsHandler";

function MoodDropdown({ selectedMood, setSelectedMood }) {
    const [allMoods, setAllMoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function loadMoods() {
            try {
                const fetchedMoods = await APIRequestsHandler.getMoods();
                setAllMoods(fetchedMoods);
                setIsLoading(false);
            } catch (error) {
                console.log("Failed to fetch moods!", error);
                setIsLoading(false);
                setHasError(true);
            }
        }
        loadMoods();
    }, []);

    if (isLoading || hasError) {
        return (
            <Listbox value="NEUTRAL" onChange={setSelectedMood} disabled={true}>
                <ListboxButton className="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg">
                    NEUTRAL
                </ListboxButton>
            </Listbox>
        );
    }

    return (
        <div className="relative w-full">
            <Listbox value={selectedMood} onChange={setSelectedMood}>
                <ListboxButton className="text-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500">
                    {selectedMood || "Select a mood"}
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                    {allMoods.map((mood, index) => (
                        <ListboxOption
                            key={index}
                            value={mood}
                            className={({ active, selected }) =>
                                `cursor-pointer select-none px-4 py-2 ${
                                    active ? "bg-violet-500 text-white" : "text-gray-900"
                                } ${selected ? "font-bold" : ""}`
                            }
                        >
                            {mood}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}

export default MoodDropdown;