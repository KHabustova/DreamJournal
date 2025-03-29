import React from "react";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

function NewEntryButton(){
    return (
            <Link to="/new" className="flex items-center space-x-2 bg-violet-400 hover:bg-violet-500 text-white p-2 rounded-lg cursor-pointer ">
                <CiCirclePlus className="text-xl"/>
                <span>Add</span>
             </Link>
    )
}

export default NewEntryButton;