import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search quotes..." 
          className="pl-10"
        />
      </div>
      <Button type="submit">
        Search
      </Button>
    </div>
  );
};

export default Search;
