import React from "react";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

/**
 * Renders button that links user to the NewEntryPage component. 
 * @component
 * @returns {JSX.Element} The rendered NewEntryButton component.
 */
function NewEntryButton() {
    return (
        <div className="flex justify-start">
            <Link
                to="/new"
                className="flex items-center justify-center space-x-2 bg-violet-400 hover:bg-violet-500 text-white px-6 py-2 rounded-lg cursor-pointer w-full"
            >
                <CiCirclePlus className="text-xl" />
                <span className="font-bold">Add</span>
            </Link>
        </div>
    );
}

export default NewEntryButton;