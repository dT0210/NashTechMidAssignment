import { useEffect, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const SearchableDropdown = (props) => {
  const { label, options, selected, onOptionClick, searchable = true } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropDownOpen(false);
    onOptionClick(option);
  };

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  const filteredOptions = options?.filter((option) =>
    option?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="relative h-[60px] bg-slate-200 p-2 hover:cursor-pointer"
      ref={useClickOutside(() => {
        setIsDropDownOpen(false);
      })}
    >
      <div className="text-sm">{label || "Select"}</div>
      <div
        className="flex w-full justify-between"
        onClick={() => {
          setIsDropDownOpen(!isDropDownOpen);
        }}
      >
        <span className="w-full">{selectedOption?.name || `Select ...`}</span>
        <span>&#9660;</span>
      </div>
      {isDropDownOpen && (
        <div className="absolute left-0 top-[60px] z-20 w-full bg-white shadow-md">
          {searchable && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full p-2 focus:outline-none"
            />
          )}
          <ul className="max-h-[120px] overflow-y-scroll">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="p-2 transition-all hover:bg-gray-100"
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
