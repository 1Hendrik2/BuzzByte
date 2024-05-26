import { useState } from "react";

interface DropdownProps {
    title: string;
    buttons: string[],
    onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, buttons, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
        setIsOpen(false);
        onChange(itemName);
    };
    
    return (
        <div className="pt-3 relative flex items-center w-full rounded-lg">
            <button onClick={() => {setIsOpen(prev => !prev)}} className="bg-indigo-950 hover:bg-indigo-800 p-4 h-10 w-full flex items-center justify-center font-semibold text-white text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
                {title}
            </button>

            {isOpen && (
                <div className="bg-indigo-500 absolute top-14 flex flex-col items-start rounded-lg p-2 w-full">
                    {buttons.map((item, i) => (
                        <div onClick={() => handleItemClick(item)} className={`flex w-full text-white justify-between cursor-pointer rounded-l-lg border-l-transparent border-l-4 ${
                            selectedItem === item ? 'bg-indigo-900 border-l-white' : 'hover:bg-indigo-900 hover:border-l-white'
                        }`} key={i}>
                            <h4>{item}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default Dropdown;