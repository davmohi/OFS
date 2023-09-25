import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AutocompleteProps {
  inputValue: string;
  cursorPosition: number;
  onSuggestionSelected: (suggestion: string) => void;
  showSuggestions: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ inputValue, cursorPosition, onSuggestionSelected, showSuggestions }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
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

   // Extraer la palabra actual basándose en la posición del cursor
   const currentWord = inputValue.substring(0, cursorPosition).split(/\s/).pop() || '';
   // Filtrar las sugerencias basándose en la palabra actual
   const filteredSuggestions = currentWord.trim() === '' ? [] : suggestions.filter((suggestion) => suggestion.startsWith(currentWord));

   return (
        showSuggestions && filteredSuggestions.length > 0 && (
        <div className="suggestions-container">
            {filteredSuggestions.map(suggestion => (
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
};

export default Autocomplete;
