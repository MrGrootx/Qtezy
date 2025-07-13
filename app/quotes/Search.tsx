import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface SearchProps {
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

const Search = ({ onSearch, defaultValue = "" }: SearchProps) => {
  const [query, setQuery] = useState(defaultValue);

  // Update local state when defaultValue changes (for clearing filters)
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  // Debounce search to avoid too many calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch?.(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search quotes by text or author..." 
          className="pl-10"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      
    </form>
  );
};

export default Search;
