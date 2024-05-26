import React from "react";

interface DateInputProps {
    onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="pt-3 relative mx-auto text-gray-600">
            <input className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="date" onChange={handleChange} name="date" placeholder="Insert time" />
        </div>
    );
}
 
export default DateInput;