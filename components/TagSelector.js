"use client";
import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";

const TagSelector = ({ selectedTags, onChange, availableTags = [] }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = availableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedTags.includes(tag)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, availableTags, selectedTags]);

  const addTag = (tag) => {
    if (tag && !selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      selectedTags.length > 0
    ) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent min-h-[42px]">
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-pink-200 rounded-full p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? "Add tags..." : ""}
          className="flex-1 min-w-[120px] outline-none text-sm"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((tag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(tag)}
              className="w-full text-left px-3 py-2 hover:bg-pink-50 text-sm flex items-center gap-2 cursor-pointer"
            >
              <Plus size={14} className="text-pink-600" />
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
