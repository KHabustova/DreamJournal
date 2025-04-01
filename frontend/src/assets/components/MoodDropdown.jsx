import React, { useState, useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import APIRequestsHandler from "../services/APIRequestsHandler";

/**
 * A dropdown component for selecting a mood. It fetches available moods from the backend
 * and displays them in a dropdown menu. Uses HeadlessUI library.
 * @component
 * @param {string} selectedMood - The currently selected mood.
 * @param {Function} setSelectedMood - Function to update the selected mood.
 * @returns {JSX.Element} The rendered MoodDropdown component.
 */
function MoodDropdown({ selectedMood, setSelectedMood }) {
    // State to store the list of all available moods
    const [allMoods, setAllMoods] = useState([]);

    // State to track whether the moods are still loading
    const [isLoading, setIsLoading] = useState(true);

    // State to track whether there was an error fetching moods
    const [hasError, setHasError] = useState(false);

    /**
     * Fetches the list of moods from the backend.
     * Updates the `allMoods` state on success or sets the `hasError` state on failure.
     */
    useEffect(() => {
        async function loadMoods() {
            try {
                const fetchedMoods = await APIRequestsHandler.getMoods();
                setAllMoods(fetchedMoods);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch moods!", error);
                setIsLoading(false);
                setHasError(true);
            }
        }
        loadMoods();
    }, []);

    // Render a disabled dropdown if moods are still loading or an error occurred
    if (isLoading || hasError) {
        return (
            <Listbox value="NEUTRAL" onChange={setSelectedMood} disabled={true}>
                <ListboxButton className="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg">
                    NEUTRAL
                </ListboxButton>
            </Listbox>
        );
    }

    // Render the dropdown with the list of moods
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