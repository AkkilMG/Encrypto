/**
 * @author: @AkkilMG
 * @description: DBMS Project - Cryptography Project
 */


import React, { useState } from 'react';


interface DropdownProps {
    options: string[];
    value: string;
    onSelect: (selectedOption: string) => void;
}
  
export const Dropdown: React.FC<DropdownProps> = ({ options, value, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
  
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      setSelectedOption(selectedValue);
      onSelect(selectedValue);
    };
  
    return (
      <select
        value={selectedOption? selectedOption : value}
        onChange={handleSelect}
        className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
};
  