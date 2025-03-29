import { Listbox } from '@headlessui/react';
import { Link } from 'react-router';

function ReturnButton(){
    return (
        <div>
            <Link to="/" className="outline p-2">Back
            </Link>
        </div>
    )
}
export default ReturnButton;