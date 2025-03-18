import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Link } from "react-router-dom";

function NewEntryButton(){
    return (
        <div>
            <Link to="/new" className="cursor-pointer hover:bg-violet-200 bg-violet-400 rounded-lg no-underline p-1 text-white"> New </Link>
        </div>
    )
}

export default NewEntryButton;