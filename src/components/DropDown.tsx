import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  setOptionHandler: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  setOptionHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setOptionHandler(option);
  };

  return (
    <div className="relative inline-block w-52">
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white border rounded-md shadow-lg max-h-60">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
