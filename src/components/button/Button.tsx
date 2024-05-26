import React from "react";

interface ButtonProps {
    title: string;
    onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {

    const handleClick = () => {
        onClick(title);
    };

    return (
        <div className="pt-3">
            <button onClick={handleClick} className="bg-indigo-950 hover:bg-indigo-800 p-4 h-10 w-full flex items-center justify-center font-semibold text-white text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
                {title}
            </button>
        </div>
    );
}

export default Button;