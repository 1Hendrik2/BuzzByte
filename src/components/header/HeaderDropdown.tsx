import { useState } from "react";

interface DropdownProps {
    title: string;
    buttons: Languages[],
    onChange: (value: string) => void;
}

interface Languages {
    name: string,
    language: string
}

const HeaderDropdown: React.FC<DropdownProps> = ({ title, buttons, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
        setIsOpen(false);
        onChange(itemName);
        window.location.reload();
    };
    
    return (
        <div className="relative mx-4 flex items-center w-full rounded-lg">
            <button onClick={() => {setIsOpen(prev => !prev)}} className="bg-indigo-950 hover:bg-indigo-800 h-8 w-full flex items-center justify-center font-semibold text-white text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
                {title}
            </button>

            {isOpen && (
                <div className="bg-indigo-700 absolute border-gray-800 border-2 top-10 flex flex-col items-start rounded-lg p-2 w-full">
                    {buttons.map((item, i) => (
                        <div onClick={() => handleItemClick(item.language)} className={`flex w-full text-white justify-between cursor-pointer rounded-l-lg border-l-transparent border-l-4 ${
                            selectedItem === item.language ? 'bg-indigo-900 border-l-white' : 'hover:bg-indigo-900 hover:border-l-white'
                        }`} key={i}>
                            <h4>{item.name}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default HeaderDropdown;