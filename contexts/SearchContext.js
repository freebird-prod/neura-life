"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import MiniSearch from "minisearch";
import { useAuth } from "./AuthContext";
import { useNotes } from "./NotesContext";
import { useGoals } from "./GoalsContext";
import { useAIInsights } from "./AIInsightsContext";
import { useMemoryGraph } from "./MemoryGraphContext";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const { user } = useAuth();
  const { notes } = useNotes();
  const { goals } = useGoals();
  const { insights } = useAIInsights();
  const { graphData } = useMemoryGraph();

  const [miniSearch, setMiniSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const search = new MiniSearch({
      fields: ["title", "content", "description"],
      storeFields: ["title", "content", "description", "type", "id"],
      searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    });
    setMiniSearch(search);
  }, []);

  useEffect(() => {
    if (!miniSearch || !user) return;

    miniSearch.removeAll();

    notes.forEach((note) => {
      miniSearch.add({
        id: `note-${note.id}`,
        title: note.title || "",
        content: note.content || "",
        type: "note",
        originalId: note.id,
        createdAt: note.createdAt,
      });
    });

    goals.forEach((goal) => {
      miniSearch.add({
        id: `goal-${goal.id}`,
        title: goal.title || "",
        content: goal.description || "",
        description: goal.description || "",
        type: "goal",
        originalId: goal.id,
        createdAt: goal.createdAt,
      });
    });

    insights.forEach((insight) => {
      miniSearch.add({
        id: `insight-${insight.id}`,
        title: insight.title || "",
        content: insight.content || "",
        type: "insight",
        originalId: insight.id,
        createdAt: insight.createdAt,
      });
    });

    graphData.forEach((item) => {
      miniSearch.add({
        id: `graph-${item.id}`,
        title: item.title || "",
        content: item.content || "",
        type: "graph",
        originalId: item.id,
        createdAt: item.createdAt,
      });
    });
  }, [miniSearch, user, notes, goals, insights, graphData]);

  const search = useCallback(
    (query) => {
      if (!miniSearch || !query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = miniSearch.search(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
      setIsSearching(false);
    },
    [miniSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        search,
        searchResults,
        clearSearch,
        isSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
