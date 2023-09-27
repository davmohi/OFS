//components/Autocomplete.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//Define types for the auto complete props
interface AutocompleteProps {
  inputValue: string;
  cursorPosition: number;
  onSuggestionSelected: (suggestion: string) => void;
  showSuggestions: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ inputValue, cursorPosition, onSuggestionSelected, showSuggestions }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Load keywords from the API on component mount
  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const response = await axios.get('/api/keywords');
        setSuggestions(response.data.keywords);
      } catch (error) {
        console.error("Error loading keywords", error);
      }
    };

    loadKeywords();
  }, []);

  // Extract the current word based on cursor position
  const currentWord = inputValue.substring(0, cursorPosition).split(/\s/).pop() || '';

  // Filter suggestions based on the current word
  const filteredSuggestions = currentWord.trim() === '' ? [] : suggestions.filter((suggestion) => suggestion.startsWith(currentWord));

  // Render the suggestions when needed
  const renderSuggestions = () => (
    showSuggestions && filteredSuggestions.length > 0 && (
      <div className="suggestions-container">
        {filteredSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="suggestion-button"
            onClick={() => onSuggestionSelected(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    )
  );

  return (
    <>
      {renderSuggestions()}
    </>
  );
};

export default Autocomplete;
