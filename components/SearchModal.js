"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Target, Brain, Network } from "lucide-react";

const SearchModal = ({ isOpen, onClose }) => {
  const { search, searchResults, clearSearch, isSearching } = useSearch();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      search(query);
    } else {
      clearSearch();
    }
  }, [query, search, clearSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "note":
        return <FileText size={16} className="text-blue-500" />;
      case "goal":
        return <Target size={16} className="text-green-500" />;
      case "insight":
        return <Brain size={16} className="text-purple-500" />;
      case "graph":
        return <Network size={16} className="text-orange-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "note":
        return "Note";
      case "goal":
        return "Goal";
      case "insight":
        return "AI Insight";
      case "graph":
        return "Memory Graph";
      default:
        return "Item";
    }
  };

  const handleResultClick = (result) => {
    const { type, originalId } = result;
    let path = "";

    switch (type) {
      case "note":
        path = "/dashboard/notes";
        break;
      case "goal":
        path = "/dashboard/goals-tasks";
        break;
      case "insight":
        path = "/dashboard/ai-insights";
        break;
      case "graph":
        path = "/dashboard/memory-graph";
        break;
      default:
        return;
    }

    router.push(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-4">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
        {/* Search Header */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here to search globally..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none font-medium text-lg cursor-pointer"
          />
          <button
            onClick={onClose}
            className="ml-3 p-1 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X size={20} className="text-red-500 border-2 w-6 h-6 border-red-500 rounded-lg" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-3"
                >
                  {getIcon(result.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {result.title || "Untitled"}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    {result.content && (
                      <p className="text-sm text-gray-600 truncate">
                        {result.content.substring(0, 150)}
                        {result.content.length > 150 && "..."}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              Start typing to search globally across everything...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
