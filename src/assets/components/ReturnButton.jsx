import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from 'react-router';

/**
 * Renders button that returns user back to the EntryList.
 * @component
 * @returns {JSX.Element} The rendered ReturnButton component.
 */
function ReturnButton(){
    return (
        <div className="flex justify-center">
            <Link to="/" className="inline-flex items-center space-x-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg cursor-pointer">
                <IoArrowBackCircleOutline className="text-xl"/>
                <span className='text-bold'>Return</span>
            </Link>
        </div>    
    )
}
export default ReturnButton;