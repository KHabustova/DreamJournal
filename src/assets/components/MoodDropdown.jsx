import React, {useState, useEffect} from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import APIRequestsHandler from "../services/APIRequestsHandler";


function MoodDropdown({selectedMood, setSelectedMood}){
    let [allMoods, setAllMoods] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function loadMoods() {
            try {
                const fetchedMoods = await APIRequestsHandler.getMoods();
                setAllMoods(fetchedMoods); 
                setIsLoading(false);
            } catch(error) {
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
                <ListboxButton className="bg-gray-300 text-gray-500 cursor-not-allowed">
                    NEUTRAL
                </ListboxButton>
            </Listbox>
        );
    }


    return (
        <div>
            <Listbox value={selectedMood} onChange={setSelectedMood}>
                <ListboxButton>{selectedMood || "Select a mood"} </ListboxButton>
                <ListboxOptions> {
                        allMoods.map((mood, index) => (
                            <ListboxOption
                            key={index}
                            value={mood}
                            name="Mood"
                            >
                                {mood}
                            </ListboxOption>
                        ))
                    }
                </ListboxOptions>

            </Listbox>
        </div>
    )
}

export default MoodDropdown;