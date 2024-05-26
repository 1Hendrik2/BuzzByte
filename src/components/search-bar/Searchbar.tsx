import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchbarProps {
    onSearch: (value: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {

    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className="pt-3 relative mx-auto text-gray-600">
            <input className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" value={searchValue}
                onChange={handleInputChange} onKeyDown={handleKeyDown} />
                <button onClick={handleSearchClick} type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                    <Search />
                </button>
        </div>
    );
}

export default Searchbar;