import React, { ChangeEvent } from 'react';

interface InputProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = 'text', placeholder = '', value, onChange }) => {
    return (
        <input
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;